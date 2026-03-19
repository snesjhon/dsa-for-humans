import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getFundamentalsGuide, getAllFundamentalsSlugs, getSectionForFundamentals } from '@/lib/fundamentals'
import { extractHeadings } from '@/lib/headings'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import TableOfContents from '@/components/TableOfContents'
import JourneyNav from '@/components/JourneyNav'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllFundamentalsSlugs().map(slug => ({ slug }))
}

export default function FundamentalsPage({ params }: Props) {
  const guide = getFundamentalsGuide(params.slug)
  if (!guide) notFound()

  const context = getSectionForFundamentals(params.slug)
  const section = context?.section
  const phase = context?.phase
  const headings = extractHeadings(guide.content)

  return (
    <div className="block lg:grid w-full items-start" style={{ gridTemplateColumns: '260px 1fr 260px', columnGap: '6rem' }}>
      {/* Left: TOC — sticky */}
      <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
        <TableOfContents headings={headings} title="Contents" />
      </aside>

      {/* Middle: Content — readable width */}
      <article className="min-w-0 space-y-8 py-2">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--fg-gutter)' }}>
          <Link href="/" className="hover:opacity-70 transition-opacity">Path</Link>
          {phase && <><span>/</span><span style={{ color: 'var(--fg-comment)' }}>Phase {phase.number}</span></>}
          {section && <><span>/</span><span style={{ color: 'var(--fg-alt)' }}>{section.label}</span></>}
          <span>/</span>
          <span style={{ color: 'var(--purple)' }}>Fundamentals</span>
        </div>

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
              style={{ background: 'var(--purple-tint)', color: 'var(--purple)' }}>
              Start Here
            </span>
            {phase && <span className="text-xs" style={{ color: 'var(--fg-gutter)' }}>{phase.emoji} {phase.label}</span>}
          </div>
          <h1 className="text-5xl font-bold leading-tight" style={{ color: 'var(--fg)' }}>
            {guide.title.replace(' - Fundamentals', '')}
          </h1>
          {section && (
            <p className="mt-3 text-lg italic leading-snug" style={{ color: 'var(--cyan)' }}>
              "{section.mentalModelHook}"
            </p>
          )}
        </div>

        {/* Problems that follow this guide */}
        {section && (section.firstPass.length > 0 || section.reinforce.length > 0) && (
          <div className="rounded-xl p-5" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
            <p className="text-sm mb-3" style={{ color: 'var(--fg-alt)' }}>
              <span className="font-semibold" style={{ color: 'var(--fg)' }}>After reading:</span>{' '}
              these problems reinforce what you'll build here.
            </p>
            <div className="flex flex-wrap gap-2">
              {section.firstPass.map(({ id }) => (
                <Link key={id} href={`/problems/${id}`}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                  style={{ background: 'var(--green-tint)', color: 'var(--green)', border: '1px solid color-mix(in srgb, var(--green) 20%, transparent)' }}>
                  ▶ {id}
                </Link>
              ))}
              {section.reinforce.map(({ id }) => (
                <Link key={id} href={`/problems/${id}`}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                  style={{ background: 'var(--orange-tint)', color: 'var(--orange)', border: '1px solid color-mix(in srgb, var(--orange) 20%, transparent)' }}>
                  ↩ {id}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Guide content — bare prose */}
        <MarkdownRenderer content={guide.content} />

        {/* Footer nav */}
        <div className="flex items-center justify-between pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <Link href="/" className="text-sm transition-opacity hover:opacity-70" style={{ color: 'var(--fg-comment)' }}>
            ← Back to Learning Path
          </Link>
          {section && section.firstPass.length > 0 && (
            <Link href={`/problems/${section.firstPass[0].id}`}
              className="text-sm px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-90 text-white"
              style={{ background: 'var(--blue)' }}>
              Start First Problem →
            </Link>
          )}
        </div>
      </article>

      {/* Right: Journey position */}
      <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto">
        <JourneyNav activeFundamentalsSlug={params.slug} />
      </aside>
    </div>
  )
}
