import { notFound } from 'next/navigation'
import { getAllProblems, getAllPatternGroups, readMarkdownFile } from '@/lib/content'
import { PATTERN_META } from '@/lib/patterns'
import Trainer from '@/components/Trainer'

interface Props {
  params: { session: string }
}

export function generateStaticParams() {
  const groups = getAllPatternGroups()
  const params = [{ session: 'all' }]
  groups.forEach(g => {
    if (g.problems.filter(p => p.hasMentalModel).length > 0) {
      params.push({ session: g.id })
    }
  })
  return params
}

export default function TrainSessionPage({ params }: Props) {
  const { session } = params
  const allProblems = getAllProblems()

  // Determine problem set
  let problems = allProblems.filter(p => p.hasMentalModel)

  if (session !== 'all') {
    if (!PATTERN_META[session]) notFound()
    problems = problems.filter(p => p.patterns.includes(session))
    if (problems.length === 0) notFound()
  }

  // Load mental model content for each problem
  const problemsWithContent = problems.map(problem => {
    const content = problem.files.mentalModel
      ? readMarkdownFile(problem.files.mentalModel).content
      : ''
    return { ...problem, mentalModelContent: content }
  })

  const sessionLabel = session === 'all'
    ? 'All Patterns'
    : PATTERN_META[session]?.label || session

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Training: {sessionLabel}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{problemsWithContent.length} problems</p>
        </div>
      </div>

      <Trainer problems={problemsWithContent} sessionId={session} />
    </div>
  )
}
