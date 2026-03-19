import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllProblems, getProblemById, readMarkdownFile } from '@/lib/content'
import MarkdownRenderer from '@/components/MarkdownRenderer'

interface Props {
  params: { id: string }
}

export function generateStaticParams() {
  return getAllProblems().filter(p => p.hasSolution).map(p => ({ id: p.id }))
}

export default function SolutionPage({ params }: Props) {
  const problem = getProblemById(params.id)
  if (!problem || !problem.hasSolution) notFound()

  const solutionContent = problem.files.solution
    ? readMarkdownFile(problem.files.solution).content
    : null
  const studyGuideContent = problem.files.studyGuide
    ? readMarkdownFile(problem.files.studyGuide).content
    : null

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--fg-gutter)' }}>
        <Link href="/" className="hover:opacity-70 transition-opacity">Path</Link>
        <span>/</span>
        <Link href={`/problems/${problem.id}`} className="hover:opacity-70 transition-opacity" style={{ color: 'var(--fg-comment)' }}>
          {problem.id}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--fg-alt)' }}>Solution</span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--fg)' }}>
            {problem.id}. {problem.title}
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--fg-comment)' }}>Solution & Study Guide</p>
        </div>
        <Link
          href={`/problems/${problem.id}`}
          className="gl-btn-ghost flex-shrink-0 text-sm px-4 py-2 rounded-lg font-medium"
        >
          ← Mental Model
        </Link>
      </div>

      {studyGuideContent && (
        <div className="rounded-xl p-6" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span>📖</span>
            <h2 className="text-sm font-semibold" style={{ color: 'var(--fg-comment)' }}>Study Guide</h2>
          </div>
          <MarkdownRenderer content={studyGuideContent} />
        </div>
      )}

      {solutionContent && (
        <div className="rounded-xl p-6" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span>✅</span>
            <h2 className="text-sm font-semibold" style={{ color: 'var(--fg-comment)' }}>Solution</h2>
          </div>
          <MarkdownRenderer content={solutionContent} />
        </div>
      )}
    </div>
  )
}
