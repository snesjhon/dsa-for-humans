import Link from 'next/link'
import type { PatternGroup } from '@/lib/types'

export default function PatternGrid({ patterns }: { patterns: PatternGroup[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {patterns.map(pattern => (
        <Link
          key={pattern.id}
          href={`/patterns/${pattern.id}`}
          className="gl-card block p-5"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{pattern.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold" style={{ color: 'var(--fg)' }}>
                  {pattern.label}
                </h3>
                <span
                  className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--sel-bg)', color: 'var(--purple)' }}
                >
                  {pattern.problems.length}
                </span>
              </div>
              <p className="mt-1 text-sm leading-snug" style={{ color: 'var(--fg-comment)' }}>
                {pattern.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {pattern.problems.slice(0, 4).map(p => (
                  <span key={p.id} className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-highlight)', color: 'var(--fg-gutter)' }}>
                    {p.id}
                  </span>
                ))}
                {pattern.problems.length > 4 && (
                  <span className="text-xs" style={{ color: 'var(--fg-gutter)' }}>+{pattern.problems.length - 4} more</span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
