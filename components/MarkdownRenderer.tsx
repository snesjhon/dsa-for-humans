'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-light.css';
import MermaidChart from './MermaidChart';
import WebContainerEmbed from './WebContainerEmbed';
import ArrayTrace from './ArrayTrace';
import type { TraceStep } from './ArrayTrace';
import TwoPointerTrace from './TwoPointerTrace';
import type { TwoPointerStep } from './TwoPointerTrace';
import PrefixSuffixTrace from './PrefixSuffixTrace';
import type { PrefixSuffixStep } from './PrefixSuffixTrace';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  problemSlug?: string;
  fundamentalsSlug?: string;
}

// Split markdown into alternating markdown/mermaid segments.
// This runs BEFORE react-markdown so rehype-highlight never sees mermaid blocks.
type Segment =
  | { type: 'markdown'; text: string }
  | { type: 'mermaid'; chart: string }
  | { type: 'trace'; steps: TraceStep[] }
  | { type: 'trace-lr'; steps: TwoPointerStep[] }
  | { type: 'trace-ps'; steps: PrefixSuffixStep[] }
  | {
      type: 'stackblitz';
      file: string;
      step: number;
      total: number;
      solution: string;
    }
  | {
      type: 'stackblitz-multi';
      step: number;
      total: number;
      exercises: string[];
      solutions: string[];
    };

function splitMermaid(content: string): Segment[] {
  const segments: Segment[] = [];
  const fence = /^```mermaid[ \t]*\r?\n([\s\S]*?)\n```[ \t]*$/gm;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = fence.exec(content)) !== null) {
    if (match.index > cursor) {
      segments.push({
        type: 'markdown',
        text: content.slice(cursor, match.index),
      });
    }
    segments.push({ type: 'mermaid', chart: match[1] });
    cursor = match.index + match[0].length;
  }

  if (cursor < content.length) {
    segments.push({ type: 'markdown', text: content.slice(cursor) });
  }

  return segments.filter((s) =>
    s.type === 'mermaid'
      ? s.chart.trim()
      : s.type === 'markdown' && s.text.trim(),
  );
}

// If the text ends with a ```typescript ... ``` block, extract it.
// Returns the code inside and the text with the block removed, or null if no trailing block.
function extractTrailingTsBlock(
  text: string,
): { before: string; code: string } | null {
  const marker = '```typescript\n';
  const lastIdx = text.lastIndexOf(marker);
  if (lastIdx === -1) return null;
  const after = text.slice(lastIdx + marker.length);
  const closeIdx = after.indexOf('\n```');
  if (closeIdx === -1) return null;
  const rest = after.slice(closeIdx + 4); // 4 = "\n```".length
  if (rest.replace(/\s/g, '') !== '') return null; // non-whitespace after closing fence
  return { before: text.slice(0, lastIdx), code: after.slice(0, closeIdx) };
}

function splitTrace(segments: Segment[]): Segment[] {
  const result: Segment[] = [];
  const configs: Array<{ fence: RegExp; type: 'trace' | 'trace-lr' | 'trace-ps' }> = [
    { fence: /^:::trace\r?\n([\s\S]*?)\r?\n:::[ \t]*$/gm, type: 'trace' },
    { fence: /^:::trace-lr\r?\n([\s\S]*?)\r?\n:::[ \t]*$/gm, type: 'trace-lr' },
    { fence: /^:::trace-ps\r?\n([\s\S]*?)\r?\n:::[ \t]*$/gm, type: 'trace-ps' },
  ];

  for (const seg of segments) {
    if (seg.type !== 'markdown') { result.push(seg); continue; }

    type RawMatch = { index: number; length: number; json: string; type: 'trace' | 'trace-lr' | 'trace-ps' };
    const matches: RawMatch[] = [];
    for (const { fence, type } of configs) {
      fence.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = fence.exec(seg.text)) !== null) {
        matches.push({ index: m.index, length: m[0].length, json: m[1], type });
      }
    }
    matches.sort((a, b) => a.index - b.index);

    let cursor = 0;
    for (const hit of matches) {
      if (hit.index > cursor) result.push({ type: 'markdown', text: seg.text.slice(cursor, hit.index) });
      try {
        const steps = JSON.parse(hit.json);
        result.push({ type: hit.type, steps } as Segment);
      } catch { result.push({ type: 'markdown', text: seg.text.slice(hit.index, hit.index + hit.length) }); }
      cursor = hit.index + hit.length;
    }
    if (cursor < seg.text.length) result.push({ type: 'markdown', text: seg.text.slice(cursor) });
  }
  return result.filter(s => s.type !== 'markdown' || s.text.trim().length > 0);
}

function splitStackBlitz(segments: Segment[]): Segment[] {
  const result: Segment[] = [];
  const singleFence =
    /^:::stackblitz\{file="([^"]+)" step=(\d+) total=(\d+) solution="([^"]+)"\}$/gm;
  const multiFence =
    /^:::stackblitz\{step=(\d+) total=(\d+) exercises="([^"]+)" solutions="([^"]+)"\}$/gm;

  for (const seg of segments) {
    if (seg.type !== 'markdown') {
      result.push(seg);
      continue;
    }

    // Build a combined list of all matches (single + multi) sorted by position
    type RawMatch = { index: number; length: number; seg: Segment };
    const matches: RawMatch[] = [];

    singleFence.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = singleFence.exec(seg.text)) !== null) {
      matches.push({
        index: m.index,
        length: m[0].length,
        seg: {
          type: 'stackblitz',
          file: m[1],
          step: parseInt(m[2], 10),
          total: parseInt(m[3], 10),
          solution: m[4],
        },
      });
    }

    multiFence.lastIndex = 0;
    while ((m = multiFence.exec(seg.text)) !== null) {
      matches.push({
        index: m.index,
        length: m[0].length,
        seg: {
          type: 'stackblitz-multi',
          step: parseInt(m[1], 10),
          total: parseInt(m[2], 10),
          exercises: m[3].split(','),
          solutions: m[4].split(','),
        },
      });
    }

    matches.sort((a, b) => a.index - b.index);

    let cursor = 0;
    for (const hit of matches) {
      if (hit.index > cursor) {
        const textBefore = seg.text.slice(cursor, hit.index);
        const extracted = extractTrailingTsBlock(textBefore);
        if (extracted) {
          if (extracted.before.trim())
            result.push({ type: 'markdown', text: extracted.before });
        } else {
          result.push({ type: 'markdown', text: textBefore });
        }
      }
      result.push(hit.seg);
      cursor = hit.index + hit.length;
    }
    if (cursor < seg.text.length) {
      result.push({ type: 'markdown', text: seg.text.slice(cursor) });
    }
  }

  return result.filter((s) => {
    if (s.type === 'mermaid') return s.chart.trim();
    if (s.type === 'stackblitz' || s.type === 'stackblitz-multi') return true;
    return s.type === 'markdown' && s.text.trim().length > 0;
  });
}

function headingId(children: React.ReactNode): string {
  return String(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const MD_COMPONENTS: React.ComponentProps<typeof ReactMarkdown>['components'] =
  {
    pre: ({ children }) => <pre className="dfh-pre">{children}</pre>,
    code: ({ className, children, ...props }) => {
      const isBlock = className?.includes('language-');
      if (isBlock)
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      return (
        <code className="dfh-code-inline" {...props}>
          {children}
        </code>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="dfh-blockquote">{children}</blockquote>
    ),
    h1: ({ children }) => (
      <h1 id={headingId(children)} className="dfh-h1 scroll-mt-24">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 id={headingId(children)} className="dfh-h2 scroll-mt-24">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={headingId(children)} className="dfh-h3 scroll-mt-24">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 id={headingId(children)} className="dfh-h4 scroll-mt-24">
        {children}
      </h4>
    ),
    p: ({ children }) => <p className="dfh-p">{children}</p>,
    ul: ({ children }) => <ul className="dfh-ul">{children}</ul>,
    ol: ({ children }) => <ol className="dfh-ol">{children}</ol>,
    li: ({ children }) => <li className="dfh-li">{children}</li>,
    table: ({ children }) => (
      <div className="dfh-table-wrap">
        <table className="dfh-table">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="dfh-thead">{children}</thead>,
    th: ({ children }) => <th className="dfh-th">{children}</th>,
    td: ({ children }) => <td className="dfh-td">{children}</td>,
    hr: () => <hr className="dfh-hr" />,
    strong: ({ children }) => (
      <strong className="dfh-strong">{children}</strong>
    ),
    em: ({ children }) => <em className="dfh-em">{children}</em>,
    a: ({ href, children }) => (
      <a href={href} className="dfh-a">
        {children}
      </a>
    ),
  };

export default function MarkdownRenderer({
  content,
  className = '',
  problemSlug,
  fundamentalsSlug,
}: MarkdownRendererProps) {
  const segments = splitTrace(splitStackBlitz(splitMermaid(content)));

  return (
    <div className={`dfh-prose ${className}`}>
      {segments.map((seg, i) => {
        if (seg.type === 'mermaid') {
          return <MermaidChart key={i} chart={seg.chart} />;
        }
        if (seg.type === 'trace') {
          return <ArrayTrace key={i} steps={seg.steps} />;
        }
        if (seg.type === 'trace-lr') {
          return <TwoPointerTrace key={i} steps={seg.steps} />;
        }
        if (seg.type === 'trace-ps') {
          return <PrefixSuffixTrace key={i} steps={seg.steps} />;
        }
        if (seg.type === 'stackblitz') {
          const slug = problemSlug ?? fundamentalsSlug;
          if (!slug) return null;
          return (
            <WebContainerEmbed
              key={i}
              tabs={[
                { label: 'Try It', file: seg.file },
                { label: 'Solution', file: seg.solution },
              ]}
              step={seg.step}
              total={seg.total}
              problemSlug={slug}
              base={fundamentalsSlug ? 'fundamentals' : undefined}
            />
          );
        }
        if (seg.type === 'stackblitz-multi') {
          const slug = problemSlug ?? fundamentalsSlug;
          if (!slug) return null;
          const tabs = seg.exercises.flatMap((ex, idx) => [
            { label: `Exercise ${idx + 1}`, file: ex },
            {
              label: `Solution ${idx + 1}`,
              file: seg.solutions[idx] ?? ex,
            },
          ]);
          return (
            <WebContainerEmbed
              key={i}
              tabs={tabs}
              step={seg.step}
              total={seg.total}
              problemSlug={slug}
              base={fundamentalsSlug ? 'fundamentals' : undefined}
            />
          );
        }
        return (
          <ReactMarkdown
            key={i}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={MD_COMPONENTS}
          >
            {seg.text}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}
