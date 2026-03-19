import Link from 'next/link'
import { JOURNEY, type JourneySection, type Phase } from '@/lib/journey'
import { getAllProblems } from '@/lib/content'

type PMap = Record<string, { title: string; hasMentalModel: boolean }>

const PHASE_COLORS = ['var(--purple)', 'var(--blue)', 'var(--green)', 'var(--orange)', 'var(--cyan)']
const PHASE_TINTS  = ['var(--purple-tint)', 'var(--blue-tint)', 'var(--green-tint)', 'var(--orange-tint)', 'color-mix(in srgb, var(--cyan) 12%, var(--bg))']
const pColor = (n: number) => PHASE_COLORS[(n - 1) % PHASE_COLORS.length]
const pTint  = (n: number) => PHASE_TINTS[(n - 1) % PHASE_TINTS.length]

// Per-step accent colors — cycles independently of phase so adjacent steps vary
const STEP_COLORS = ['var(--purple)', 'var(--blue)', 'var(--green)', 'var(--orange)', 'var(--cyan)']
const sColor = (n: number) => STEP_COLORS[(n - 1) % STEP_COLORS.length]

type SectionEntry = {
  section: JourneySection
  phase: Phase
  revisitIds: string[]
  revisitFromLabel: string
  stepNum: number  // global step number across all phases
}

function buildCurriculum(): SectionEntry[] {
  const entries: SectionEntry[] = []
  let pendingIds: string[] = []
  let pendingFrom: string  = ''
  let stepNum = 0

  JOURNEY.forEach(phase => {
    phase.sections.forEach(section => {
      stepNum++
      entries.push({
        section,
        phase,
        revisitIds:       pendingIds,
        revisitFromLabel: pendingFrom,
        stepNum,
      })
      pendingIds  = section.reinforce.map(p => p.id)
      pendingFrom = section.label
    })
  })

  if (pendingIds.length > 0 && entries.length > 0) {
    const last = entries[entries.length - 1]
    entries[entries.length - 1] = {
      ...last,
      revisitIds:       [...last.revisitIds, ...pendingIds],
      revisitFromLabel: last.revisitFromLabel || pendingFrom,
    }
  }

  return entries
}

// Guide card: card is a plain div, only the button is the link
function StepGuideCard({ href, label, hook, stepNum, color }: {
  href: string
  label: string
  hook: string
  stepNum: string
  color: string
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      background: `color-mix(in srgb, ${color} 7%, var(--bg))`,
      border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
      borderRadius: '0.875rem',
      padding: '20px 22px',
      height: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: '0.58rem', fontWeight: 700,
          letterSpacing: '0.1em', color: 'var(--fg-gutter)',
          textTransform: 'uppercase',
        }}>
          Step {stepNum}
        </span>
        <span style={{ width: 1, height: 9, background: `color-mix(in srgb, ${color} 35%, transparent)`, display: 'inline-block' }} />
        <span style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: '0.58rem', fontWeight: 700,
          letterSpacing: '0.1em', color,
          textTransform: 'uppercase',
        }}>
          📖 Mental Model
        </span>
      </div>

      {/* Title */}
      <div style={{
        fontWeight: 800, fontSize: '1.1875rem',
        color: 'var(--fg)', lineHeight: 1.2,
        letterSpacing: '-0.02em', marginBottom: 12,
      }}>
        {label}
      </div>

      {/* Hook */}
      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: '0.9rem', lineHeight: 1.65,
        color: 'var(--fg-comment)', margin: '0 0 20px',
        flex: 1,
      }}>
        {hook}
      </p>

      {/* Only the button is a link */}
      <Link href={href} className="guide-btn" style={{
        alignSelf: 'flex-start',
        padding: '7px 16px', borderRadius: 6,
        background: color,
        color: 'white',
        fontSize: '0.8rem', fontWeight: 600,
        letterSpacing: '0.01em',
        textDecoration: 'none',
        display: 'inline-block',
      }}>
        Read the guide →
      </Link>
    </div>
  )
}

// Placeholder — same shape, muted treatment
function PlaceholderGuideCard({ label, hook, stepNum }: {
  label: string
  hook: string
  stepNum: string
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      background: 'var(--bg)',
      border: '1px dashed var(--border)',
      borderRadius: '0.875rem',
      padding: '20px 22px',
      height: '100%',
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: '0.58rem', fontWeight: 700,
          letterSpacing: '0.1em', color: 'var(--fg-gutter)',
          textTransform: 'uppercase',
        }}>
          Step {stepNum}
        </span>
        <span style={{ width: 1, height: 9, background: 'var(--border)', display: 'inline-block' }} />
        <span style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: '0.58rem', fontWeight: 700,
          letterSpacing: '0.1em', color: 'var(--fg-gutter)',
          textTransform: 'uppercase',
        }}>
          📖 Mental Model
        </span>
      </div>
      <div style={{
        fontWeight: 800, fontSize: '1.1875rem',
        color: 'var(--fg-alt)', lineHeight: 1.2,
        letterSpacing: '-0.02em', marginBottom: 12,
      }}>
        {label}
      </div>
      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: '0.9rem', lineHeight: 1.65,
        color: 'var(--fg-gutter)', margin: '0 0 20px',
        flex: 1,
      }}>
        {hook}
      </p>
      <div style={{
        alignSelf: 'flex-start',
        padding: '7px 16px', borderRadius: 6,
        background: 'var(--bg-highlight)',
        border: '1px solid var(--border)',
        color: 'var(--fg-gutter)',
        fontSize: '0.8rem', fontWeight: 600,
        userSelect: 'none',
      }}>
        Coming soon
      </div>
    </div>
  )
}

export default function HomePage() {
  const allProblems = getAllProblems()
  const problemMap: PMap = Object.fromEntries(allProblems.map(p => [p.id, p]))

  const totalProblems = allProblems.length
  const totalPhases   = JOURNEY.length
  const totalSections = JOURNEY.reduce((acc, p) => acc + p.sections.length, 0)

  const curriculum = buildCurriculum()
  let lastPhaseNum = -1

  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

      {/* ─────────────────────────────────────────── HERO */}
      <section style={{ paddingTop: 64, paddingBottom: 72 }}>

        <p style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: '0.68rem', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--fg-gutter)', marginBottom: 28,
        }}>
          A structured learning path
        </p>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(3.25rem, 7vw, 5.5rem)',
          lineHeight: 1.0, letterSpacing: '-0.03em',
          color: 'var(--fg)', marginBottom: 40,
          maxWidth: '860px',
        }}>
          Learn DSA the way<br />
          it should be taught.
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
          gap: '24px 48px',
          maxWidth: '820px',
          marginBottom: 48,
          paddingBottom: 48,
          borderBottom: '1px solid var(--border)',
        }}>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--fg-alt)', margin: 0 }}>
            Most DSA study is backwards — grinding problems until solutions
            stick by accident. This path builds{' '}
            <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>mental models first</strong>.
            Understand the <em>why</em> behind each pattern before writing a line of code.
          </p>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--fg-comment)', margin: 0 }}>
            The result: you recognize what kind of problem you&apos;re looking
            at — not because you memorized the solution, but because the
            intuition is actually yours.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 40 }}>
            {[
              { value: String(totalPhases),   label: 'phases'   },
              { value: String(totalSections), label: 'mental models' },
              { value: String(totalProblems), label: 'problems' },
            ].map(({ value, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic', fontWeight: 400,
                  fontSize: '3rem', lineHeight: 1,
                  color: 'var(--fg)', letterSpacing: '-0.04em',
                }}>
                  {value}
                </span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--fg-gutter)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginLeft: 'auto' }}>
            <a href="#path" style={{
              padding: '11px 28px', borderRadius: 7,
              fontWeight: 600, fontSize: '0.9375rem',
              color: 'white', background: 'var(--blue)',
              textDecoration: 'none',
            }}>
              Start the learning path ↓
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────── HOW IT WORKS */}
      <section style={{
        marginBottom: 80,
        borderTop: '2px solid var(--border)',
        borderBottom: '2px solid var(--border)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            {
              step: '01',
              heading: 'Read the mental model',
              body: 'Each step opens with a guide that builds the intuition for a pattern — the why, not just the how.',
              color: 'var(--purple)',
            },
            {
              step: '02',
              heading: 'Apply it immediately',
              body: "A focused set of problems to lock in what you just read, while it's still fresh. Doing before forgetting.",
              color: 'var(--blue)',
            },
            {
              step: '03',
              heading: 'Revisit as you advance',
              body: "Harder problems from previous models resurface in later steps — exactly when you're ready to handle them.",
              color: 'var(--green)',
            },
          ].map(({ step, heading, body, color }, i) => (
            <div key={step} style={{ padding: '36px 32px', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic', fontWeight: 400,
                fontSize: '3.25rem', lineHeight: 1,
                color: 'var(--bg-highlight)',
                letterSpacing: '-0.05em',
                marginBottom: 18,
                userSelect: 'none',
              }}>
                {step}
              </div>
              <div style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.25, color: 'var(--fg)', marginBottom: 10 }}>
                {heading}
              </div>
              <div style={{ width: 24, height: 2, background: color, marginBottom: 12 }} />
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--fg-alt)', margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────── THE PATH */}
      <section id="path" style={{ paddingBottom: 96 }}>

        <div style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 64, gap: 16,
        }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic', fontWeight: 400,
              fontSize: '2.5rem', letterSpacing: '-0.03em',
              color: 'var(--fg)', margin: 0, marginBottom: 6,
            }}>
              The Path
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--fg-gutter)', margin: 0 }}>
              {totalSections} mental models · {totalProblems} problems
            </p>
          </div>
        </div>

        {/* Curriculum — each entry is a mental model step */}
        {curriculum.map((entry, idx) => {
          const { section, phase, revisitIds, revisitFromLabel, stepNum } = entry
          const color = pColor(phase.number)
          const tint  = pTint(phase.number)  // used for phase banner only
          const isNewPhase = phase.number !== lastPhaseNum
          if (isNewPhase) lastPhaseNum = phase.number

          const hasNewProblems = section.firstPass.length > 0
          const hasRevisits    = revisitIds.length > 0
          const hasAnyProblems = hasNewProblems || hasRevisits
          const stepLabel      = String(stepNum).padStart(2, '0')
          const chapterLabel   = String(phase.number).padStart(2, '0')
          const accent         = sColor(stepNum)  // per-step, cycles independently

          return (
            <div key={section.id}>

              {/* ── Phase banner ── */}
              {isNewPhase && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr',
                  gap: '0 32px',
                  alignItems: 'start',
                  marginTop: idx === 0 ? 0 : 80,
                  marginBottom: 0,
                  paddingBottom: 32,
                  borderBottom: `2px solid color-mix(in srgb, ${color} 30%, var(--border))`,
                }}>
                  <div style={{ textAlign: 'right', paddingTop: 4 }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic', fontWeight: 400,
                      fontSize: '4.5rem', lineHeight: 1,
                      color: 'var(--bg-highlight)',
                      letterSpacing: '-0.05em',
                      userSelect: 'none',
                    }}>
                      {chapterLabel}
                    </span>
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{phase.emoji}</span>
                      <h3 style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fg)', margin: 0, letterSpacing: '-0.025em' }}>
                        {phase.label}
                      </h3>
                      <span style={{
                        marginLeft: 4,
                        padding: '2px 10px', borderRadius: 999,
                        background: tint,
                        border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
                        fontSize: '0.72rem', fontWeight: 700,
                        color, letterSpacing: '0.02em',
                        textTransform: 'uppercase' as const,
                      }}>
                        Phase {phase.number}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--fg-comment)', margin: 0, lineHeight: 1.55, maxWidth: '560px' }}>
                      {phase.goal}
                    </p>
                  </div>
                </div>
              )}

              {/* ── Step: two-column [Guide | Problems] ── */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 28,
                alignItems: 'start',
                paddingTop: 28, paddingBottom: 32,
                borderBottom: '1px solid var(--border)',
              }}>
                {/* LEFT: Guide card — IS the step */}
                {section.fundamentalsSlug ? (
                  <StepGuideCard
                    href={`/fundamentals/${section.fundamentalsSlug}`}
                    label={section.label}
                    hook={section.mentalModelHook}
                    stepNum={stepLabel}
                    color={accent}
                  />
                ) : (
                  <PlaceholderGuideCard
                    label={section.label}
                    hook={section.mentalModelHook}
                    stepNum={stepLabel}
                  />
                )}

                {/* RIGHT: Practice + revisit */}
                <div style={{ paddingTop: 4 }}>
                  {!hasAnyProblems && (
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: '0.875rem', color: 'var(--fg-gutter)',
                      margin: 0,
                    }}>
                      Problems coming soon.
                    </p>
                  )}

                  {hasNewProblems && (
                    <div style={{ marginBottom: hasRevisits ? 20 : 0 }}>
                      <p style={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '0.6rem', fontWeight: 700,
                        letterSpacing: '0.09em', textTransform: 'uppercase',
                        color: 'var(--fg-gutter)', margin: '0 0 8px',
                      }}>
                        Practice
                      </p>
                      {section.firstPass.map(({ id }) => {
                        const p = problemMap[id]
                        if (!p) return null
                        return (
                          <Link
                            key={id}
                            href={`/problems/${id}`}
                            className="problem-link"
                            style={{ display: 'flex', alignItems: 'baseline', gap: 0, padding: '5px 0' }}
                          >
                            <span style={{ flexShrink: 0, width: 20 }} />
                            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.65rem', color: 'var(--fg-gutter)', flexShrink: 0, minWidth: 30 }}>
                              {id}
                            </span>
                            <span className="problem-title" style={{ fontSize: '0.875rem', color: 'var(--fg-alt)', lineHeight: 1.3 }}>
                              {p.title}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  )}

                  {hasRevisits && (
                    <div>
                      <p style={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '0.6rem', fontWeight: 700,
                        letterSpacing: '0.09em', textTransform: 'uppercase',
                        color: 'var(--orange)', margin: '0 0 8px',
                      }}>
                        Also revisit — from {revisitFromLabel}
                      </p>
                      {revisitIds.map(id => {
                        const p = problemMap[id]
                        if (!p) return null
                        return (
                          <Link
                            key={`r-${id}`}
                            href={`/problems/${id}`}
                            className="problem-link"
                            style={{ display: 'flex', alignItems: 'baseline', gap: 0, padding: '5px 0' }}
                          >
                            <span style={{ fontSize: '0.75rem', color: 'var(--orange)', flexShrink: 0, width: 20, lineHeight: 1 }}>↩</span>
                            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.65rem', color: 'var(--fg-gutter)', flexShrink: 0, minWidth: 30 }}>
                              {id}
                            </span>
                            <span className="problem-title" style={{ fontSize: '0.875rem', color: 'var(--fg-comment)', lineHeight: 1.3 }}>
                              {p.title}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>


            </div>
          )
        })}

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 64 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{
            fontSize: '0.8rem', fontStyle: 'italic',
            color: 'var(--fg-gutter)', flexShrink: 0,
            fontFamily: 'var(--font-display)',
          }}>
            More mental models coming
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
      </section>

    </div>
  )
}
