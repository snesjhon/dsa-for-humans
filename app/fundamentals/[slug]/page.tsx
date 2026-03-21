import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getFundamentalsGuide,
  getAllFundamentalsSlugs,
  getSectionForFundamentals,
  getPrecedingSection,
} from '@/lib/fundamentals';
import { extractHeadings } from '@/lib/headings';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContents from '@/components/TableOfContents';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllFundamentalsSlugs().map((slug) => ({ slug }));
}

export default function FundamentalsPage({ params }: Props) {
  const guide = getFundamentalsGuide(params.slug);
  if (!guide) notFound();

  const context = getSectionForFundamentals(params.slug);
  const section = context?.section;
  const phase = context?.phase;
  const prereq = getPrecedingSection(params.slug);

  // Strip the leading # h1 and the > Prerequisites blockquote from the markdown
  // so they don't duplicate what the page header already renders
  const strippedContent = guide.content
    .replace(/^#[^#].*\n+/, '') // remove h1
    .replace(/^>[\s\S]*?(?=\n---|\n##|\n#)/m, '') // remove leading blockquote
    .trimStart();

  const headings = extractHeadings(strippedContent);

  return (
    <div
      className="block lg:grid w-full items-start"
      style={{
        gridTemplateColumns: '350px minmax(250px, 0.8fr)',
        columnGap: '6rem',
      }}
    >
      <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
        <TableOfContents headings={headings} title="Contents" />
      </aside>

      <article className="min-w-0 space-y-8 py-2 pr-16">
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: 'var(--fg-gutter)' }}
        >
          <Link href="/" className="hover:opacity-70 transition-opacity">
            Path
          </Link>
          {phase && (
            <>
              <span>/</span>
              <span style={{ color: 'var(--fg-comment)' }}>
                Phase {phase.number}
              </span>
            </>
          )}
          {section && (
            <>
              <span>/</span>
              <span style={{ color: 'var(--fg-alt)' }}>{section.label}</span>
            </>
          )}
          <span>/</span>
          <span style={{ color: 'var(--purple)' }}>Fundamentals</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
              style={{
                background: 'var(--purple-tint)',
                color: 'var(--purple)',
              }}
            >
              Start Here
            </span>
            {phase && (
              <span className="text-xs" style={{ color: 'var(--fg-gutter)' }}>
                {phase.emoji} {phase.label}
              </span>
            )}
          </div>
          <h1
            className="text-5xl font-bold leading-tight"
            style={{ color: 'var(--fg)' }}
          >
            {section?.label ??
              guide.title.replace(/\s*[–-]\s*Fundamentals/i, '')}
          </h1>
          {section && (
            <p
              className="mt-3 text-lg italic leading-snug"
              style={{ color: 'var(--cyan)' }}
            >
              "{section.mentalModelHook}"
            </p>
          )}
        </div>
        <div
          className="rounded-xl p-5"
          style={{
            background: 'var(--bg-alt)',
            border: '1px solid var(--border)',
          }}
        >
          <p className="text-sm mb-1" style={{ color: 'var(--fg-alt)' }}>
            <span className="font-semibold" style={{ color: 'var(--fg)' }}>
              Prerequisites:
            </span>
          </p>
          {prereq ? (
            <Link
              href={
                prereq.fundamentalsSlug
                  ? `/fundamentals/${prereq.fundamentalsSlug}`
                  : '/'
              }
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 mt-2"
              style={{
                background: 'var(--purple-tint)',
                color: 'var(--purple)',
                border:
                  '1px solid color-mix(in srgb, var(--purple) 20%, transparent)',
              }}
            >
              {prereq.label} Fundamentals
            </Link>
          ) : (
            <p
              className="text-sm italic mt-1"
              style={{ color: 'var(--fg-comment)' }}
            >
              None — this is the starting point of the path.
            </p>
          )}
        </div>
        <MarkdownRenderer
          content={strippedContent}
          fundamentalsSlug={params.slug}
        />
        <div
          className="flex items-center justify-between pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <Link
            href="/"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'var(--fg-comment)' }}
          >
            ← Back to Learning Path
          </Link>
          {section && section.firstPass.length > 0 && (
            <Link
              href={`/problems/${section.firstPass[0].id}`}
              className="text-sm px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-90 text-white"
              style={{ background: 'var(--blue)' }}
            >
              Start First Problem →
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}
