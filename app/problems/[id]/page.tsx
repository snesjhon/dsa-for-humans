import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllProblems,
  getProblemById,
  readMarkdownFile,
} from '@/lib/content';
import { getSectionsForProblem } from '@/lib/journey';
import { extractHeadings } from '@/lib/headings';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContents from '@/components/TableOfContents';
import JourneyNav from '@/components/JourneyNav';

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return getAllProblems().map((p) => ({ id: p.id }));
}

export default function ProblemPage({ params }: Props) {
  const problem = getProblemById(params.id);
  if (!problem) notFound();

  const rawContent = problem.files.mentalModel
    ? readMarkdownFile(problem.files.mentalModel).content
    : null;

  // Strip the leading H1 from the markdown — the page already renders the problem title
  const mentalModelContent = rawContent
    ? rawContent.replace(/^#[^\n]*\n+/, '')
    : null;

  const headings = mentalModelContent
    ? extractHeadings(mentalModelContent)
    : [];
  const journeySections = getSectionsForProblem(params.id);
  const primarySection = journeySections[0];

  let prevProblem = null;
  let nextProblem = null;

  if (primarySection) {
    const allInSection = [
      ...primarySection.firstPass,
      ...primarySection.reinforce,
    ];
    const idx = allInSection.findIndex((p) => p.id === params.id);
    if (idx > 0)
      prevProblem =
        getAllProblems().find((p) => p.id === allInSection[idx - 1].id) || null;
    if (idx < allInSection.length - 1)
      nextProblem =
        getAllProblems().find((p) => p.id === allInSection[idx + 1].id) || null;
  }

  return (
    <div
      className="block lg:grid w-full items-start"
      style={{ gridTemplateColumns: '260px 1fr', columnGap: '6rem' }}
    >
      {/* Left: TOC */}
      <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
        <TableOfContents headings={headings} title="Content" />
      </aside>

      {/* Middle: Content */}
      <article className="min-w-0 space-y-8 py-2 pr-16">
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: 'var(--fg-gutter)' }}
        >
          <Link href="/" className="hover:opacity-70 transition-opacity">
            Path
          </Link>
          {primarySection && (
            <>
              <span>/</span>
              <span style={{ color: 'var(--fg-comment)' }}>
                {primarySection.label}
              </span>
            </>
          )}
          <span>/</span>
          <span style={{ color: 'var(--fg-alt)' }}>{problem.id}</span>
        </div>

        {/* Header */}
        <div>
          <p
            className="text-xs font-mono mb-2"
            style={{ color: 'var(--fg-gutter)' }}
          >
            #{problem.id}
          </p>
          <h1
            className="text-5xl font-bold leading-tight"
            style={{ color: 'var(--fg)' }}
          >
            {problem.title}
          </h1>
          {problem.hasSolution && (
            <div className="mt-4">
              <Link
                href={`/problems/${problem.id}/solution`}
                className="text-sm px-4 py-1.5 rounded-lg font-medium transition-opacity hover:opacity-90 text-white"
                style={{ background: 'var(--green)' }}
              >
                View Solution →
              </Link>
            </div>
          )}
        </div>

        {/* Mental Model — bare prose */}
        {mentalModelContent ? (
          <MarkdownRenderer
            content={mentalModelContent}
            problemSlug={problem.slug}
          />
        ) : (
          <p className="text-base" style={{ color: 'var(--fg-gutter)' }}>
            Mental model coming soon.
          </p>
        )}

        {/* Prev/Next */}
        <div
          className="flex items-center justify-between pt-6"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {prevProblem ? (
            <Link
              href={`/problems/${prevProblem.id}`}
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: 'var(--fg-comment)' }}
            >
              ← {prevProblem.id}. {prevProblem.title}
            </Link>
          ) : (
            <div />
          )}
          {nextProblem ? (
            <Link
              href={`/problems/${nextProblem.id}`}
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: 'var(--fg-comment)' }}
            >
              {nextProblem.id}. {nextProblem.title} →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>

    </div>
  );
}
