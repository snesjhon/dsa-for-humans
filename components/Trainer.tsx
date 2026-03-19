'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import MarkdownRenderer from './MarkdownRenderer'
import { PATTERN_META } from '@/lib/patterns'
import type { Problem } from '@/lib/types'

interface TrainerProps {
  problems: Array<Problem & { mentalModelContent: string }>
  sessionId: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getWrongPatterns(correct: string[], allPatternIds: string[]): string[] {
  const pool = allPatternIds.filter(p => !correct.includes(p))
  return shuffle(pool).slice(0, 3)
}

const ALL_PATTERN_IDS = Object.keys(PATTERN_META)

export default function Trainer({ problems }: TrainerProps) {
  const shuffledProblems = useMemo(() => shuffle(problems), [problems])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const current = shuffledProblems[currentIdx]
  const choices = useMemo(() => {
    if (!current) return []
    const wrong = getWrongPatterns(current.patterns, ALL_PATTERN_IDS)
    return shuffle([...current.patterns.slice(0, 1), ...wrong])
  }, [currentIdx, current])

  if (!current || done) {
    const pct = score / shuffledProblems.length
    return (
      <div className="text-center py-16 space-y-6">
        <div className="text-5xl">🎯</div>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--fg)' }}>Session Complete!</h2>
        <p className="text-4xl font-bold" style={{ color: 'var(--blue)' }}>
          {score} / {shuffledProblems.length}
        </p>
        <p style={{ color: 'var(--fg-alt)' }}>
          {pct === 1
            ? 'Perfect score! Your pattern recognition is sharp.'
            : pct >= 0.7
            ? 'Great job! Keep practicing the ones you missed.'
            : 'Keep going — the mental models will stick with practice.'}
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => { setCurrentIdx(0); setSelected(null); setRevealed(false); setScore(0); setDone(false) }}
            className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--blue)' }}
          >
            Try Again
          </button>
          <Link
            href="/train"
            className="px-6 py-3 rounded-lg font-semibold transition-colors"
            style={{ border: '1px solid var(--border)', color: 'var(--fg-alt)' }}
          >
            Different Session
          </Link>
        </div>
      </div>
    )
  }

  const isCorrect = selected !== null && current.patterns.includes(selected)

  function handleSelect(choice: string) {
    if (selected !== null) return
    setSelected(choice)
    if (current.patterns.includes(choice)) setScore(s => s + 1)
    setTimeout(() => setRevealed(true), 350)
  }

  function handleNext() {
    if (currentIdx >= shuffledProblems.length - 1) setDone(true)
    else { setCurrentIdx(i => i + 1); setSelected(null); setRevealed(false) }
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm" style={{ color: 'var(--fg-comment)' }}>
        <span>Problem {currentIdx + 1} of {shuffledProblems.length}</span>
        <span>Score: <span className="font-semibold" style={{ color: 'var(--fg)' }}>{score}</span></span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-highlight)' }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${(currentIdx / shuffledProblems.length) * 100}%`, background: 'var(--blue)' }}
        />
      </div>

      {/* Problem */}
      <div className="rounded-xl p-5" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
        <p className="text-xs font-mono mb-1" style={{ color: 'var(--fg-gutter)' }}>Problem {current.id}</p>
        <h2 className="text-lg font-bold" style={{ color: 'var(--fg)' }}>{current.title}</h2>
      </div>

      {/* Choices */}
      <div>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--fg-alt)' }}>
          What pattern does this problem use?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {choices.map(choice => {
            const meta = PATTERN_META[choice]
            const isSelected = selected === choice
            const isCorrectChoice = current.patterns.includes(choice)

            let bg = 'var(--bg-alt)'
            let border = 'var(--border)'
            let color = 'var(--fg)'

            if (selected !== null) {
              if (isCorrectChoice) { bg = 'var(--green-tint)'; border = 'var(--green)'; color = 'var(--green)' }
              else if (isSelected) { bg = 'color-mix(in srgb, var(--red) 10%, white)'; border = 'var(--red)'; color = 'var(--red)' }
              else { color = 'var(--fg-gutter)' }
            }

            return (
              <button
                key={choice}
                onClick={() => handleSelect(choice)}
                disabled={selected !== null}
                className="p-4 rounded-xl text-left transition-all"
                style={{ background: bg, border: `1px solid ${border}`, cursor: selected !== null ? 'default' : 'pointer' }}
                onMouseEnter={e => { if (selected === null) e.currentTarget.style.borderColor = 'var(--purple)' }}
                onMouseLeave={e => { if (selected === null) e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <div className="flex items-center gap-2">
                  <span>{meta?.icon}</span>
                  <span className="font-medium text-sm" style={{ color }}>{meta?.label || choice}</span>
                  {selected !== null && isCorrectChoice && <span className="ml-auto" style={{ color: 'var(--green)' }}>✓</span>}
                  {isSelected && !isCorrectChoice && <span className="ml-auto" style={{ color: 'var(--red)' }}>✗</span>}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Feedback while loading */}
      {selected !== null && !revealed && (
        <p className="text-center text-sm font-medium" style={{ color: isCorrect ? 'var(--green)' : 'var(--red)' }}>
          {isCorrect ? '✓ Correct!' : `✗ Pattern: ${current.patterns.map(p => PATTERN_META[p]?.label || p).join(', ')}`}
          <span className="ml-2 font-normal" style={{ color: 'var(--fg-gutter)' }}>Loading mental model...</span>
        </p>
      )}

      {/* Mental model reveal */}
      {revealed && (
        <div className="rounded-xl p-5 space-y-4" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2">
            <span>🧠</span>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--fg-comment)' }}>Mental Model</h3>
            {isCorrect
              ? <span className="ml-auto text-sm font-semibold" style={{ color: 'var(--green)' }}>✓ Correct</span>
              : <span className="ml-auto text-sm font-semibold" style={{ color: 'var(--red)' }}>
                  Pattern: {current.patterns.map(p => PATTERN_META[p]?.label || p).join(', ')}
                </span>
            }
          </div>
          <MarkdownRenderer content={current.mentalModelContent} />
          <div className="pt-2 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
            <Link
              href={`/problems/${current.id}`}
              className="text-sm transition-opacity hover:opacity-80"
              style={{ color: 'var(--blue)' }}
            >
              Full problem page →
            </Link>
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--blue)' }}
            >
              {currentIdx >= shuffledProblems.length - 1 ? 'See Results' : 'Next Problem →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
