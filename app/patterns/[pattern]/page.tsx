import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPatternGroups, getConceptContent } from '@/lib/content'
import { PATTERN_META } from '@/lib/patterns'
import MarkdownRenderer from '@/components/MarkdownRenderer'

interface Props {
  params: { pattern: string }
}

export function generateStaticParams() {
  return getAllPatternGroups().map(g => ({ pattern: g.id }))
}

export default function PatternPage({ params }: Props) {
  const { pattern } = params
  const groups = getAllPatternGroups()
  const group = groups.find(g => g.id === pattern)
  if (!group) notFound()

  const conceptContent = getConceptContent(pattern)
  const meta = PATTERN_META[pattern]

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <Link href="/patterns" className="text-sm transition-opacity hover:opacity-70 mb-4 inline-block" style={{ color: 'var(--fg-comment)' }}>
          ← All Patterns
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{meta?.icon}</span>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--fg)' }}>{group.label}</h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--fg-comment)' }}>{group.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Problems list */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--fg-alt)' }}>
            Problems ({group.problems.length})
          </h2>
          <div className="space-y-1.5">
            {group.problems.map(problem => (
              <Link
                key={problem.id}
                href={`/problems/${problem.id}`}
                className="gl-card flex items-center justify-between p-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono flex-shrink-0" style={{ color: 'var(--fg-gutter)' }}>{problem.id}</span>
                  <span className="text-sm truncate" style={{ color: 'var(--fg-alt)' }}>{problem.title}</span>
                </div>
                <div className="flex gap-1 flex-shrink-0 ml-2">
                  {problem.hasMentalModel && (
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--purple-tint)', color: 'var(--purple)' }}>🧠</span>
                  )}
                  {problem.hasSolution && (
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--green-tint)', color: 'var(--green)' }}>✓</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Concept content */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          {conceptContent ? (
            <div className="rounded-xl p-6" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
              <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--fg-comment)' }}>Pattern Concept</h2>
              <MarkdownRenderer content={conceptContent} />
            </div>
          ) : (
            <div className="rounded-xl p-6 text-center" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)', color: 'var(--fg-gutter)' }}>
              <p>Select a problem to start reading its mental model.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
