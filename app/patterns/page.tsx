import Link from 'next/link'
import { getAllPatternGroups } from '@/lib/content'
import PatternGrid from '@/components/PatternGrid'

export default function PatternsPage() {
  const patterns = getAllPatternGroups()
  const totalProblems = new Set(patterns.flatMap(p => p.problems.map(pr => pr.id))).size

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link href="/" className="text-sm transition-colors hover:opacity-80 inline-block mb-4" style={{ color: 'var(--fg-comment)' }}>
          ← Learning Path
        </Link>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--fg)' }}>Patterns Reference</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--fg-comment)' }}>
          {patterns.length} patterns · {totalProblems} problems with mental models
        </p>
      </div>
      <PatternGrid patterns={patterns} />
    </div>
  )
}
