import Link from 'next/link'
import { getAllPatternGroups, getAllProblems } from '@/lib/content'
import { PATTERN_META } from '@/lib/patterns'

export default function TrainPage() {
  const patterns = getAllPatternGroups()
  const allProblems = getAllProblems().filter(p => p.hasMentalModel)

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--fg)' }}>
          Pattern Recognition Trainer
        </h1>
        <p style={{ color: 'var(--fg-alt)' }}>
          See a problem. Identify the pattern. Reveal the mental model.
        </p>
      </div>

      {/* All problems */}
      <div className="rounded-xl p-6" style={{ background: 'var(--blue-tint)', border: '1px solid color-mix(in srgb, var(--blue) 30%, transparent)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>All Patterns</h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--fg-comment)' }}>
              {allProblems.length} problems, random order
            </p>
          </div>
          <Link
            href="/train/all"
            className="px-5 py-2.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--blue)' }}
          >
            Start →
          </Link>
        </div>
      </div>

      {/* Per-pattern */}
      <div>
        <h2 className="text-sm font-semibold mb-3" style={{ color: 'var(--fg-alt)' }}>Train by Pattern</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {patterns
            .filter(p => p.problems.filter(pr => pr.hasMentalModel).length > 0)
            .map(pattern => {
              const count = pattern.problems.filter(p => p.hasMentalModel).length
              const meta = PATTERN_META[pattern.id]
              return (
                <Link
                  key={pattern.id}
                  href={`/train/${pattern.id}`}
                  className="gl-card flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{meta?.icon}</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{pattern.label}</p>
                      <p className="text-xs" style={{ color: 'var(--fg-gutter)' }}>{count} problems</p>
                    </div>
                  </div>
                  <span style={{ color: 'var(--fg-gutter)' }}>→</span>
                </Link>
              )
            })}
        </div>
      </div>

      <p className="text-xs text-center" style={{ color: 'var(--fg-gutter)' }}>
        Each session shows problems one at a time. Pick the pattern, then the mental model is revealed.
      </p>
    </div>
  )
}
