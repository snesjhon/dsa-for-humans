import Link from 'next/link'
import { JOURNEY, type JourneySection, type Phase } from '@/lib/journey'
import { getAllProblems } from '@/lib/content'
import { PhaseTracker } from '@/components/PhaseTracker'

type PMap = Record<string, { title: string; hasMentalModel: boolean }>

const PHASE_COLORS = ['var(--purple)', 'var(--blue)', 'var(--green)', 'var(--orange)', 'var(--cyan)']
const pColor = (n: number) => PHASE_COLORS[(n - 1) % PHASE_COLORS.length]

const BLEED = { marginLeft: '-24px', marginRight: '-24px' } as const
const inner = (pad = '0 24px'): React.CSSProperties => ({
  maxWidth: '1120px', margin: '0 auto', padding: pad,
})

type SectionEntry = {
  section: JourneySection
  phase: Phase
  revisitIds: string[]
  revisitFromLabel: string
  stepNum: number
}

function buildCurriculum(): SectionEntry[] {
  const entries: SectionEntry[] = []
  let pendingIds: string[] = []
  let pendingFrom = ''
  let stepNum = 0

  JOURNEY.forEach(phase => {
    phase.sections.forEach(section => {
      stepNum++
      entries.push({ section, phase, revisitIds: pendingIds, revisitFromLabel: pendingFrom, stepNum })
      pendingIds  = section.reinforce.map(p => p.id)
      pendingFrom = section.label
    })
  })

  if (pendingIds.length > 0 && entries.length > 0) {
    const last = entries[entries.length - 1]
    entries[entries.length - 1] = {
      ...last,
      revisitIds: [...last.revisitIds, ...pendingIds],
      revisitFromLabel: last.revisitFromLabel || pendingFrom,
    }
  }
  return entries
}

type PhaseGroup = { phase: Phase; entries: SectionEntry[] }

function buildPhaseGroups(): PhaseGroup[] {
  const curriculum = buildCurriculum()
  const groups: PhaseGroup[] = []
  for (const entry of curriculum) {
    const last = groups[groups.length - 1]
    if (!last || last.phase.number !== entry.phase.number) {
      groups.push({ phase: entry.phase, entries: [entry] })
    } else {
      last.entries.push(entry)
    }
  }
  return groups
}

function PhaseBannerContent({ phase, color, chapterLabel }: {
  phase: Phase
  color: string
  chapterLabel: string
}) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '56px 0 40px' }}>
      <div style={{
        position: 'absolute', right: 0, top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
        fontSize: '13rem', lineHeight: 1, letterSpacing: '-0.05em',
        color: `color-mix(in srgb, ${color} 12%, transparent)`,
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {chapterLabel}
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>{phase.emoji}</span>
        <span style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: '0.68rem', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color,
        }}>
          Phase {phase.number}
        </span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
        fontSize: '2.75rem', lineHeight: 1.05, letterSpacing: '-0.03em',
        color: 'var(--fg)', margin: '0 0 14px',
      }}>
        {phase.label}
      </h3>

      <div style={{ width: 40, height: 3, background: color, borderRadius: 2, marginBottom: 14 }} />

      <p style={{
        fontSize: '0.9375rem', lineHeight: 1.65,
        color: 'var(--fg-comment)', margin: 0, maxWidth: 560,
      }}>
        {phase.goal}
      </p>
    </div>
  )
}

function StepGuideCard({ href, label, hook, stepNum, color }: {
  href: string; label: string; hook: string; stepNum: string; color: string
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      background: 'transparent',
      backdropFilter: 'blur(12px)',
      border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
      borderRadius: '0.875rem',
      padding: '20px 22px',
      height: '100%',
      boxSizing: 'border-box',
      boxShadow: `0 4px 24px color-mix(in srgb, ${color} 10%, transparent), 0 1px 4px rgba(0,0,0,0.08)`,
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
      <div style={{
        fontWeight: 800, fontSize: '1.25rem',
        color: 'var(--fg)', lineHeight: 1.2,
        letterSpacing: '-0.02em', marginBottom: 12,
      }}>
        {label}
      </div>
      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: '0.9375rem', lineHeight: 1.65,
        color: 'var(--fg-comment)', margin: '0 0 20px',
        flex: 1,
      }}>
        {hook}
      </p>
      <Link href={href} className="guide-btn" style={{
        alignSelf: 'flex-start',
        padding: '7px 16px', borderRadius: 6,
        background: color, color: 'white',
        fontSize: '0.8rem', fontWeight: 600,
        letterSpacing: '0.01em',
        textDecoration: 'none', display: 'inline-block',
      }}>
        Read the guide →
      </Link>
    </div>
  )
}

function PlaceholderGuideCard({ label, hook, stepNum }: {
  label: string; hook: string; stepNum: string
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      background: 'color-mix(in srgb, var(--bg) 60%, var(--bg-alt))',
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

export default function PathPage() {
  const allProblems = getAllProblems()
  const problemMap: PMap = Object.fromEntries(allProblems.map(p => [p.id, p]))

  const totalProblems = allProblems.length
  const totalSections = JOURNEY.reduce((acc, p) => acc + p.sections.length, 0)

  const phaseGroups = buildPhaseGroups()

  return (
    <>
      {/* ─────────────────────────────────────────── THE PATH header */}
      <section style={{ ...BLEED, background: 'var(--bg)', marginTop: '-54px' }}>
        <div style={inner('118px 24px 40px')}>
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
      </section>

      {/* ─────────────────────────────────────────── PHASE ZONES — each full-bleed */}
      {phaseGroups.map(({ phase, entries }, groupIdx) => {
        const color      = pColor(phase.number)
        const nextColor  = groupIdx < phaseGroups.length - 1
          ? pColor(phaseGroups[groupIdx + 1].phase.number)
          : null
        const chapterLabel = String(phase.number).padStart(2, '0')

        const zoneBg = nextColor
          ? `linear-gradient(180deg,
              color-mix(in srgb, ${color} 8%, var(--bg)) 0%,
              color-mix(in srgb, ${color} 8%, var(--bg)) 60%,
              color-mix(in srgb, ${nextColor} 4%, var(--bg)) 100%)`
          : `color-mix(in srgb, ${color} 8%, var(--bg))`

        return (
          <div key={phase.number} id={`phase-zone-${phase.number}`} style={{ ...BLEED, background: zoneBg }}>

            <div style={inner('0 24px')}>
              <PhaseBannerContent phase={phase} color={color} chapterLabel={chapterLabel} />
            </div>

            <div style={inner('0 24px')}>
              {entries.map((entry, entryIdx) => {
                const { section, revisitIds, revisitFromLabel, stepNum } = entry
                const accent         = color
                const stepLabel      = String(stepNum).padStart(2, '0')
                const hasNewProblems = section.firstPass.length > 0
                const hasRevisits    = revisitIds.length > 0
                const hasAnyProblems = hasNewProblems || hasRevisits
                const isLast         = entryIdx === entries.length - 1

                return (
                  <div key={section.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 28,
                    alignItems: 'start',
                    padding: isLast ? '0 0 0' : '0 0 48px',
                  }}>
                    {/* LEFT: Guide card */}
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
                )
              })}
              <div style={{ height: 56 }} />
            </div>

          </div>
        )
      })}

      {/* ─────────────────────────────────────────── FOOTER STRIP */}
      <div style={{ ...BLEED, background: 'var(--bg)', padding: '48px 24px 80px' }}>
        <div style={{ ...inner(), display: 'flex', alignItems: 'center', gap: 16 }}>
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
      </div>

      <PhaseTracker phaseCount={phaseGroups.length} />
    </>
  )
}
