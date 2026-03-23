import Link from 'next/link'
import { JOURNEY } from '@/lib/journey'
import { getAllProblems } from '@/lib/content'

const BLEED = { marginLeft: '-24px', marginRight: '-24px' } as const
const inner = (pad = '0 24px'): React.CSSProperties => ({
  maxWidth: '1120px', margin: '0 auto', padding: pad,
})

// ─── Inline UI Mockups ────────────────────────────────────────────────────────

function TracerMockup() {
  const nums   = [1, 2, 3, 1]
  const result = [1, 1, 1, 0]
  const activeI = 3

  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: '0.875rem',
      overflow: 'hidden', background: 'var(--bg)',
      boxShadow: '0 8px 32px rgba(88,60,172,0.08), 0 1px 4px rgba(0,0,0,0.06)',
    }}>
      {/* header */}
      <div style={{
        padding: '10px 16px', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'var(--bg-alt)',
      }}>
        <span style={{
          fontFamily: 'ui-monospace, monospace', fontSize: '0.58rem', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          background: 'color-mix(in srgb, var(--purple) 14%, transparent)',
          color: 'var(--purple)', padding: '3px 8px', borderRadius: 4,
        }}>FORWARD PASS</span>
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.7rem', color: 'var(--fg-alt)' }}>
          album = <strong style={{ color: 'var(--purple)' }}>3</strong>
        </span>
      </div>

      {/* grid */}
      <div style={{ padding: '20px 20px 16px' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          {/* row labels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 12 }}>
            {['nums', 'result'].map(lbl => (
              <span key={lbl} style={{
                fontFamily: 'ui-monospace, monospace', fontSize: '0.58rem',
                color: 'var(--fg-gutter)', height: 44, display: 'flex',
                alignItems: 'center', paddingRight: 4,
              }}>{lbl}</span>
            ))}
          </div>
          {/* columns */}
          <div style={{ display: 'flex', gap: 6 }}>
            {nums.map((num, i) => {
              const isActive = i === activeI
              const filled = i < activeI
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  {/* nums cell */}
                  <div style={{
                    width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${isActive ? 'var(--purple)' : 'var(--border)'}`,
                    borderRadius: 6, fontWeight: 700, fontSize: '1rem',
                    fontFamily: 'ui-monospace, monospace',
                    background: isActive ? 'color-mix(in srgb, var(--purple) 12%, var(--bg))' : 'var(--bg)',
                    color: isActive ? 'var(--purple)' : 'var(--fg)',
                  }}>{num}</div>
                  {/* result cell */}
                  <div style={{
                    width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${isActive ? 'var(--purple)' : 'var(--border)'}`,
                    borderRadius: 6, fontFamily: 'ui-monospace, monospace', fontSize: '1rem',
                    fontWeight: filled ? 700 : 400,
                    background: filled
                      ? 'color-mix(in srgb, var(--purple) 8%, var(--bg))'
                      : isActive
                        ? 'color-mix(in srgb, var(--purple) 12%, var(--bg))'
                        : 'var(--bg)',
                    color: filled || isActive ? 'var(--fg)' : 'var(--fg-gutter)',
                  }}>{result[i]}</div>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', color: 'var(--fg-gutter)' }}>{i}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* label */}
        <div style={{
          marginTop: 14, padding: '9px 12px', borderRadius: 6,
          background: 'var(--bg-alt)', border: '1px solid var(--border)',
        }}>
          <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.72rem', color: 'var(--fg-alt)', margin: 0, lineHeight: 1.5 }}>
            Stamp <strong style={{ color: 'var(--purple)' }}>1</strong>: already in album! →{' '}
            <strong style={{ color: 'var(--green)' }}>return true ✓</strong>
          </p>
        </div>
      </div>

      {/* footer */}
      <div style={{
        borderTop: '1px solid var(--border)', padding: '10px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--bg-alt)',
      }}>
        <div style={{ display: 'flex', gap: 12 }}>
          {['■ prefix stored', '■ final value'].map(lbl => (
            <span key={lbl} style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.58rem', color: 'var(--fg-gutter)' }}>{lbl}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {['← Prev', '5 / 6', 'Next →'].map((t, i) => i === 1
            ? <span key={t} style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.68rem', color: 'var(--fg-gutter)' }}>{t}</span>
            : <button key={t} style={{
                padding: '4px 10px', borderRadius: 4, border: '1px solid var(--border)',
                background: 'var(--bg)', fontFamily: 'ui-monospace, monospace',
                fontSize: '0.68rem', color: 'var(--fg-alt)', cursor: 'pointer',
              }}>{t}</button>
          )}
        </div>
      </div>
    </div>
  )
}

function CodeEditorMockup() {
  return (
    <div style={{
      border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.875rem',
      overflow: 'hidden', background: '#1E1B2E',
      boxShadow: '0 8px 32px rgba(0,0,0,0.24)',
      fontFamily: 'ui-monospace, monospace', fontSize: '0.78rem', lineHeight: '1.7',
    }}>
      {/* editor body */}
      <div style={{ display: 'flex', padding: '18px 0' }}>
        {/* line numbers */}
        <div style={{
          padding: '0 14px', borderRight: '1px solid rgba(255,255,255,0.06)',
          color: 'rgba(255,255,255,0.18)', userSelect: 'none',
          textAlign: 'right', minWidth: 36,
        }}>
          {[1,2,3,4,5,6,7,8,9,10].map(n => <div key={n}>{n}</div>)}
        </div>
        {/* code */}
        <div style={{ padding: '0 20px', flex: 1, overflowX: 'auto' }}>
          <div><Kw>function</Kw> <Fn>containsDuplicate</Fn><Px>(nums: </Px><Ty>number</Ty><Px>[]): </Px><Ty>boolean</Ty><Px> {'{'}</Px></div>
          <div><Px>{'  '}</Px><Kw>const</Kw><Px> stampAlbum = </Px><Kw>new</Kw><Px> Set&lt;</Px><Ty>number</Ty><Px>&gt;();</Px></div>
          <div>&nbsp;</div>
          <div><Px>{'  '}</Px><Kw>for</Kw><Px> (</Px><Kw>const</Kw><Px> stamp </Px><Kw>of</Kw><Px> nums) {'{'}</Px></div>
          <div style={{ background: 'rgba(173,149,233,0.09)' }}>
            <Px>{'    '}</Px><Kw>if</Kw><Px> (stampAlbum.</Px><Fn>has</Fn><Px>(stamp)) </Px><Kw>return</Kw><Lit> true</Lit><Px>;</Px>
          </div>
          <div><Px>{'    '}stampAlbum.</Px><Fn>add</Fn><Px>(stamp);</Px></div>
          <div><Px>{'  }'}</Px></div>
          <div>&nbsp;</div>
          <div><Px>{'  '}</Px><Kw>return</Kw><Lit> false</Lit><Px>;</Px></div>
          <div><Px>{'}'}</Px></div>
        </div>
      </div>

      {/* output bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '8px 16px', background: 'rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {['PASS has duplicate at end', 'PASS no duplicates', 'PASS all same value'].map(line => (
            <span key={line} style={{ fontSize: '0.65rem', color: '#52B87A' }}>✓ {line}</span>
          ))}
        </div>
        <button style={{
          padding: '6px 14px', borderRadius: 5, background: 'var(--blue)',
          color: 'white', border: 'none', fontSize: '0.72rem', fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'ui-monospace, monospace',
        }}>
          Run <kbd style={{ background: 'rgba(255,255,255,0.15)', padding: '1px 5px', borderRadius: 3, fontSize: '0.68rem' }}>⌘↵</kbd>
        </button>
      </div>
    </div>
  )
}

function MentalModelMockup() {
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: '0.875rem',
      overflow: 'hidden', background: 'var(--bg)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      height: '100%', display: 'flex', flexDirection: 'column',
    }}>
      {/* problem header */}
      <div style={{
        padding: '12px 18px', borderBottom: '1px solid var(--border)',
        background: 'var(--bg-alt)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', fontWeight: 700,
          color: 'var(--fg-gutter)',
        }}>217</span>
        <span style={{ width: 1, height: 10, background: 'var(--border)', display: 'inline-block' }} />
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--fg)' }}>Contains Duplicate</span>
        <span style={{ marginLeft: 'auto' }}>
          <span style={{
            fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--green)', background: 'var(--green-tint)',
            padding: '2px 7px', borderRadius: 3,
          }}>Easy</span>
        </span>
      </div>

      {/* analogy section */}
      <div style={{ padding: '18px 18px 0', flex: 1 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10,
        }}>
          <span style={{
            fontFamily: 'ui-monospace, monospace', fontSize: '0.58rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)',
          }}>📖 The Stamp Collector's Album</span>
        </div>
        <p style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          fontSize: '0.9rem', lineHeight: 1.65,
          color: 'var(--fg-comment)', margin: '0 0 14px',
        }}>
          A collector scans a pile of stamps, checking their album before mounting each one. If the design is already mounted — a duplicate is found. Stop immediately.
        </p>
        <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
          {[['Hash Set', 'var(--purple)', 'var(--purple-tint)'], ['O(n) time', 'var(--blue)', 'var(--blue-tint)']].map(([lbl, color, bg]) => (
            <span key={lbl} style={{
              padding: '4px 10px', borderRadius: 4, fontSize: '0.65rem',
              fontFamily: 'ui-monospace, monospace', fontWeight: 600,
              color, background: bg,
            }}>{lbl}</span>
          ))}
        </div>
      </div>

      {/* trace preview strip */}
      <div style={{
        borderTop: '1px solid var(--border)', padding: '12px 18px',
        background: 'var(--bg-alt)', display: 'flex', gap: 6, alignItems: 'center',
      }}>
        {[1, 2, 3, 1].map((n, i) => (
          <div key={i} style={{
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${i === 3 ? 'var(--purple)' : 'var(--border)'}`,
            borderRadius: 5, fontFamily: 'ui-monospace, monospace', fontSize: '0.8rem', fontWeight: 700,
            background: i === 3 ? 'color-mix(in srgb, var(--purple) 12%, var(--bg))' : 'var(--bg)',
            color: i === 3 ? 'var(--purple)' : 'var(--fg)',
          }}>{n}</div>
        ))}
        <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.65rem', color: 'var(--purple)', marginLeft: 6 }}>
          ← duplicate detected
        </span>
      </div>
    </div>
  )
}

// ─── Fundamentals Card Visuals ───────────────────────────────────────────────

function VisualAssemblyLine() {
  const tape = [3, 0, 1, 0, 2]
  const W = 2, R = 3
  return (
    <div style={{ padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: 'var(--fg-gutter)', marginBottom: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        conveyor belt
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {tape.map((n, i) => (
          <div key={i} style={{
            flex: 1, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1.5px solid ${i === W ? 'var(--blue)' : i === R ? 'var(--orange)' : i < W ? 'color-mix(in srgb, var(--blue) 40%, transparent)' : 'var(--border)'}`,
            borderRadius: 5,
            background: i === W ? 'color-mix(in srgb, var(--blue) 14%, var(--bg))' : i === R ? 'color-mix(in srgb, var(--orange) 10%, var(--bg))' : i < W ? 'color-mix(in srgb, var(--blue) 7%, var(--bg))' : 'var(--bg)',
            fontFamily: 'ui-monospace, monospace', fontSize: '0.875rem', fontWeight: i <= R ? 700 : 400,
            color: i === W ? 'var(--blue)' : i === R ? 'var(--orange)' : i < W ? 'var(--blue)' : 'var(--fg-gutter)',
          }}>{n}</div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {tape.map((_, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', fontWeight: 700, color: i === W ? 'var(--blue)' : i === R ? 'var(--orange)' : 'transparent' }}>
            {i === W ? 'W' : i === R ? 'R' : '.'}
          </div>
        ))}
      </div>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.56rem', color: 'var(--fg-gutter)', marginTop: 4, lineHeight: 1.6 }}>
        <span style={{ color: 'var(--blue)', fontWeight: 700 }}>W</span> places keepers<br />
        <span style={{ color: 'var(--orange)', fontWeight: 700 }}>R</span> inspects everything
      </div>
    </div>
  )
}

function VisualCardCatalog() {
  const rows = [
    { k: '"name"', v: '"Alice"', bucket: 3 },
    { k: '"age"', v: '30', bucket: 7 },
    { k: '"city"', v: '"NYC"', bucket: 1 },
  ]
  return (
    <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: 'var(--fg-gutter)', marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>card catalog</div>
      {rows.map(({ k, v, bucket }, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.65rem', color: 'var(--orange)', background: 'color-mix(in srgb, var(--orange) 8%, var(--bg))', border: '1px solid color-mix(in srgb, var(--orange) 25%, transparent)', borderRadius: 4, padding: '4px 7px', whiteSpace: 'nowrap' }}>{k}</div>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', color: 'var(--fg-gutter)' }}>→</span>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', color: 'var(--fg-gutter)', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 4, padding: '3px 6px', whiteSpace: 'nowrap' }}>slot {bucket}</div>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', color: 'var(--fg-gutter)' }}>→</span>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.65rem', color: '#52b87a', background: 'color-mix(in srgb, #52b87a 7%, var(--bg))', border: '1px solid color-mix(in srgb, #52b87a 25%, transparent)', borderRadius: 4, padding: '4px 7px', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v}</div>
        </div>
      ))}
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', color: 'var(--fg-gutter)', marginTop: 4 }}>
        any key → O(1) lookup
      </div>
    </div>
  )
}

function VisualFileSystem() {
  return (
    <div style={{ padding: '22px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '100%' }}>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: 'var(--fg-gutter)', marginBottom: 4, alignSelf: 'flex-start', letterSpacing: '0.06em', textTransform: 'uppercase' }}>binary tree</div>
      {/* Root */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 44, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--purple)', borderRadius: 6, fontFamily: 'ui-monospace, monospace', fontSize: '0.85rem', fontWeight: 700, background: 'color-mix(in srgb, var(--purple) 12%, var(--bg))', color: 'var(--purple)' }}>15</div>
      </div>
      {/* Connectors */}
      <div style={{ position: 'relative', width: '100%', height: 12 }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', width: '28%', height: 1, background: 'var(--border)', transform: 'translateX(-100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: '50%', width: '28%', height: 1, background: 'var(--border)' }} />
      </div>
      {/* Level 2 */}
      <div style={{ display: 'flex', gap: 24 }}>
        {[10, 20].map(n => (
          <div key={n} style={{ width: 40, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid color-mix(in srgb, var(--purple) 45%, transparent)', borderRadius: 5, fontFamily: 'ui-monospace, monospace', fontSize: '0.75rem', fontWeight: 600, background: 'color-mix(in srgb, var(--purple) 7%, var(--bg))', color: 'var(--purple)' }}>{n}</div>
        ))}
      </div>
      {/* Level 3 */}
      <div style={{ display: 'flex', gap: 6 }}>
        {[8, 12, 17, 25].map(n => (
          <div key={n} style={{ width: 32, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', borderRadius: 4, fontFamily: 'ui-monospace, monospace', fontSize: '0.65rem', color: 'var(--fg-gutter)', background: 'var(--bg)' }}>{n}</div>
        ))}
      </div>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: 'var(--fg-gutter)', marginTop: 2 }}>left &lt; parent &lt; right</div>
    </div>
  )
}

function VisualCityMap() {
  const nodes = [
    { id: 'A', x: 50, y: 10 },
    { id: 'B', x: 14, y: 42 },
    { id: 'C', x: 86, y: 42 },
    { id: 'D', x: 28, y: 80 },
    { id: 'E', x: 72, y: 80 },
  ]
  const edges = [['A','B'],['A','C'],['B','C'],['B','D'],['C','E'],['D','E']]
  return (
    <div style={{ padding: '22px 14px 14px', width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: 'var(--fg-gutter)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>city road map</div>
      <div style={{ position: 'relative', height: 130 }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 95">
          {edges.map(([a, b], i) => {
            const na = nodes.find(n => n.id === a)!
            const nb = nodes.find(n => n.id === b)!
            return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="var(--border)" strokeWidth="1.5" />
          })}
          {nodes.map(({ id, x, y }) => (
            <g key={id}>
              <circle cx={x} cy={y} r="10" fill="color-mix(in srgb, var(--blue) 10%, var(--bg))" stroke="var(--blue)" strokeWidth="1.5" />
              <text x={x} y={y + 4} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill="var(--blue)">{id}</text>
            </g>
          ))}
        </svg>
      </div>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', color: 'var(--fg-gutter)' }}>
        nodes + edges · visited set
      </div>
    </div>
  )
}

function VisualERTriage() {
  const levels = [[1], [3, 2], [8, 7, 4, 5]]
  const colors = [['#d94f4f'], ['#d9804f','#d9804f'], ['#a8a8a8','#a8a8a8','#a8a8a8','#a8a8a8']]
  const sizes = [44, 36, 28]
  const fontSizes = ['1rem', '0.82rem', '0.68rem']
  return (
    <div style={{ padding: '22px 14px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, width: '100%' }}>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: 'var(--fg-gutter)', alignSelf: 'flex-start', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>ER triage</div>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color: 'var(--fg-gutter)', marginBottom: 2 }}>most critical always at top</div>
      {levels.map((row, r) => (
        <div key={r} style={{ display: 'flex', gap: 7, justifyContent: 'center' }}>
          {row.map((n, c) => (
            <div key={c} style={{
              width: sizes[r], height: sizes[r],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${colors[r][c]}`,
              borderRadius: 6,
              background: `color-mix(in srgb, ${colors[r][c]} 12%, var(--bg))`,
              fontFamily: 'ui-monospace, monospace',
              fontSize: fontSizes[r],
              fontWeight: 700, color: colors[r][c],
            }}>{n}</div>
          ))}
        </div>
      ))}
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.54rem', color: 'var(--fg-gutter)', marginTop: 4, textAlign: 'center', lineHeight: 1.6 }}>
        parent ≤ children<br />min always at root · O(log n)
      </div>
    </div>
  )
}

const FUNDAMENTALS_DATA = [
  {
    slug: 'arrays-strings',
    name: 'Arrays & Strings',
    analogy: 'The Assembly Line',
    excerpt: 'A conveyor belt with a reader and writer. The reader inspects everything; the writer only places keepers. One pass, no extra space.',
    tags: ['Two Pointers', 'Write Cursor', 'Prefix Pass'],
    accent: 'var(--blue)',
    Visual: VisualAssemblyLine,
  },
  {
    slug: 'hash-maps',
    name: 'Hash Maps & Sets',
    analogy: 'The Library Card Catalog',
    excerpt: 'Any book found in one step, no matter how large the library. Membership, lookup, counting — all O(1).',
    tags: ['HashMap', 'HashSet', 'O(1) lookup'],
    accent: 'var(--orange)',
    Visual: VisualCardCatalog,
  },
  {
    slug: 'binary-trees',
    name: 'Binary Trees',
    analogy: 'File System Navigation',
    excerpt: 'Folders nested inside folders. DFS follows one path to its end; BFS visits every folder at each depth before going deeper.',
    tags: ['DFS', 'BFS', 'Recursion'],
    accent: 'var(--purple)',
    Visual: VisualFileSystem,
  },
  {
    slug: 'graphs',
    name: 'Graphs',
    analogy: 'The City Road Map',
    excerpt: 'Cities connected by roads. Unlike trees, graphs can cycle — so you mark every city you visit to avoid looping forever.',
    tags: ['Adjacency List', 'Visited Set', 'BFS / DFS'],
    accent: 'var(--blue)',
    Visual: VisualCityMap,
  },
  {
    slug: 'heaps-priority-queues',
    name: 'Heaps',
    analogy: 'ER Triage',
    excerpt: 'The most critical patient is always seen first — not by arrival order, but by severity. The heap always surfaces the min (or max) in O(1).',
    tags: ['Priority Queue', 'O(log n)', 'Min / Max'],
    accent: '#d94f4f',
    Visual: VisualERTriage,
  },
]

// ─── Mental Model Card Visuals ───────────────────────────────────────────────

function VisualStampAlbum() {
  return (
    <div style={{ padding: '18px 20px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {[1, 2, 3, 1].map((n, i) => {
          const isDup = i === 3
          const isMounted = i < 3
          return (
            <div key={i} style={{
              width: 44, height: 52,
              border: `1.5px solid ${isDup ? '#d94f4f' : isMounted ? 'var(--purple)' : 'var(--border)'}`,
              borderRadius: 5,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
              background: isDup ? 'color-mix(in srgb, #d94f4f 10%, var(--bg))' : isMounted ? 'color-mix(in srgb, var(--purple) 8%, var(--bg))' : 'var(--bg)',
            }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '1rem', fontWeight: 700, color: isDup ? '#d94f4f' : isMounted ? 'var(--purple)' : 'var(--fg-gutter)' }}>{n}</span>
              <span style={{ fontSize: '0.5rem', color: isDup ? '#d94f4f' : 'var(--purple)' }}>{isDup ? 'dup!' : '✓'}</span>
            </div>
          )
        })}
        <div style={{ marginLeft: 4, fontFamily: 'ui-monospace, monospace', fontSize: '0.58rem', color: '#d94f4f', lineHeight: 1.5 }}>already<br />in album!</div>
      </div>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.58rem', color: 'var(--fg-gutter)' }}>
        album = {'{'}<span style={{ color: 'var(--purple)' }}>1, 2, 3</span>{'}'}
      </div>
    </div>
  )
}

function VisualTwoInspectors() {
  const chars = ['r', 'a', 'c', 'e', 'c', 'a', 'r']
  const L = 2, R = 4
  return (
    <div style={{ padding: '18px 16px 12px' }}>
      <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginBottom: 5 }}>
        {chars.map((c, i) => (
          <div key={i} style={{
            width: 27, height: 27, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1.5px solid ${i === L || i === R ? 'var(--blue)' : 'var(--border)'}`,
            borderRadius: 4, fontFamily: 'ui-monospace, monospace', fontSize: '0.72rem',
            fontWeight: i === L || i === R ? 700 : 400,
            background: i === L || i === R ? 'color-mix(in srgb, var(--blue) 12%, var(--bg))' : 'var(--bg)',
            color: i === L || i === R ? 'var(--blue)' : 'var(--fg-alt)',
          }}>{c}</div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginBottom: 8 }}>
        {chars.map((_, i) => (
          <div key={i} style={{ width: 27, textAlign: 'center', fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', color: 'var(--blue)', fontWeight: 700 }}>
            {i === L ? 'L' : i === R ? 'R' : ''}
          </div>
        ))}
      </div>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', color: '#52b87a', textAlign: 'center' }}>
        c == c ✓ — inspectors agree
      </div>
    </div>
  )
}

function VisualTwoMessengers() {
  return (
    <div style={{ padding: '14px 14px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
      {[
        { label: 'nums', vals: [1, 2, 3, 4], color: 'var(--fg-gutter)', bg: 'var(--bg)', border: 'var(--border)' },
        { label: 'L →', vals: [1, 1, 2, 6], color: 'var(--orange)', bg: 'color-mix(in srgb, var(--orange) 7%, var(--bg))', border: 'color-mix(in srgb, var(--orange) 35%, transparent)' },
        { label: '← R', vals: [24, 12, 4, 1], color: 'var(--blue)', bg: 'color-mix(in srgb, var(--blue) 7%, var(--bg))', border: 'color-mix(in srgb, var(--blue) 35%, transparent)' },
        { label: 'out', vals: [24, 12, 8, 6], color: '#52b87a', bg: 'color-mix(in srgb, #52b87a 7%, var(--bg))', border: 'color-mix(in srgb, #52b87a 40%, transparent)' },
      ].map(({ label, vals, color, bg, border }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.52rem', color, width: 32, textAlign: 'right', flexShrink: 0 }}>{label}</span>
          {vals.map((n, i) => (
            <div key={i} style={{ flex: 1, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${border}`, borderRadius: 4, fontFamily: 'ui-monospace, monospace', fontSize: '0.7rem', fontWeight: label === 'out' ? 700 : 500, background: bg, color }}>{n}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

function VisualOdometer() {
  const pts = [{ l: 'Start', m: 0 }, { l: 'A', m: 10 }, { l: 'B', m: 15 }, { l: 'C', m: 30 }]
  return (
    <div style={{ padding: '20px 20px 10px' }}>
      <div style={{ position: 'relative', marginBottom: 6 }}>
        <div style={{ height: 2, background: 'var(--border)', margin: '10px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', top: 0, left: 0, right: 0 }}>
          {pts.map((p, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? 'var(--fg-gutter)' : 'var(--orange)', marginBottom: 2, border: `2px solid ${i === 0 ? 'var(--fg-gutter)' : 'var(--orange)'}` }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        {pts.map((p, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', color: i === 0 ? 'var(--fg-gutter)' : 'var(--orange)' }}>{p.l}</span>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', fontWeight: 700, color: i === 0 ? 'var(--fg-gutter)' : 'var(--orange)' }}>{p.m}</span>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', color: 'var(--fg-gutter)', textAlign: 'center' }}>
        C − A = <span style={{ color: 'var(--orange)', fontWeight: 700 }}>30 − 10 = 20</span> miles
      </div>
    </div>
  )
}

function VisualMountainClimber() {
  return (
    <div style={{ padding: '14px 16px 10px', fontFamily: 'ui-monospace, monospace', fontSize: '0.72rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--fg-gutter)', fontSize: '0.6rem' }}>start</span>
          <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{`""`}</span>
          <span style={{ color: 'var(--fg-gutter)', fontSize: '0.55rem' }}>open=2, close=2</span>
        </div>
        <div style={{ paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ color: 'var(--fg-gutter)', fontSize: '0.55rem' }}>╰─</span>
            <span style={{ color: '#52b87a', fontWeight: 700 }}>{`"("`}</span>
            <span style={{ color: 'var(--fg-gutter)', fontSize: '0.52rem' }}>open=1</span>
          </div>
          <div style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ color: 'var(--fg-gutter)', fontSize: '0.52rem' }}>├─</span>
              <span style={{ color: '#52b87a', fontWeight: 700 }}>{`"(("`}</span>
              <span style={{ color: 'var(--fg-gutter)', fontSize: '0.52rem' }}>→ "(())" </span>
              <span style={{ color: '#52b87a', fontSize: '0.52rem' }}>✓</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ color: 'var(--fg-gutter)', fontSize: '0.52rem' }}>╰─</span>
              <span style={{ color: 'var(--blue)', fontWeight: 700 }}>{`"()"`}</span>
              <span style={{ color: 'var(--fg-gutter)', fontSize: '0.52rem' }}>→ "()()" </span>
              <span style={{ color: '#52b87a', fontSize: '0.52rem' }}>✓</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 8, fontSize: '0.56rem', color: 'var(--fg-gutter)' }}>
        <span style={{ color: '#52b87a' }}>(</span> = climb&nbsp;&nbsp;
        <span style={{ color: 'var(--blue)' }}>)</span> = descend&nbsp;&nbsp;can&apos;t go below ground
      </div>
    </div>
  )
}

function VisualParkRanger() {
  const grid = [[1,1,0,0],[1,0,0,1],[0,0,0,1],[0,0,0,0]]
  const flagged = new Set(['0,0','0,1','1,0','1,3','2,3'])
  return (
    <div style={{ padding: '14px 16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {grid.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: 3 }}>
            {row.map((cell, c) => {
              const key = `${r},${c}`
              const isFlag = flagged.has(key)
              return (
                <div key={c} style={{
                  width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 3, fontSize: '0.62rem',
                  border: `1px solid ${cell === 1 ? (isFlag ? 'var(--orange)' : '#52b87a') : 'color-mix(in srgb, var(--blue) 25%, transparent)'}`,
                  background: cell === 1
                    ? (isFlag ? 'color-mix(in srgb, var(--orange) 14%, var(--bg))' : 'color-mix(in srgb, #52b87a 10%, var(--bg))')
                    : 'color-mix(in srgb, var(--blue) 7%, var(--bg))',
                  color: cell === 1 ? (isFlag ? 'var(--orange)' : '#52b87a') : 'var(--blue)',
                }}>
                  {isFlag ? '⚑' : cell === 1 ? '▪' : '~'}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', color: 'var(--fg-gutter)' }}>
        <span style={{ color: 'var(--orange)' }}>⚑</span> surveyed &nbsp;
        <span style={{ color: '#52b87a' }}>▪</span> land &nbsp;
        <span style={{ color: 'var(--blue)' }}>~</span> ocean
      </div>
    </div>
  )
}

// Mental model card dataset
const MENTAL_MODELS_DATA = [
  {
    id: '217', name: 'Contains Duplicate', difficulty: 'Easy', diffColor: '#52b87a',
    analogy: "The Stamp Collector's Album",
    excerpt: "A collector checks their album before mounting each stamp. The instant a design appears twice — stop. No need to finish the pile.",
    tags: ['Hash Set', 'O(n) time'],
    accent: 'var(--purple)',
    Visual: VisualStampAlbum,
  },
  {
    id: '125', name: 'Valid Palindrome', difficulty: 'Easy', diffColor: '#52b87a',
    analogy: "The Two Museum Inspectors",
    excerpt: "Two inspectors walk from opposite ends, skipping empty pedestals, comparing exhibits. Always agree — mirror layout confirmed.",
    tags: ['Two Pointers', 'O(1) space'],
    accent: 'var(--blue)',
    Visual: VisualTwoInspectors,
  },
  {
    id: '238', name: 'Product Except Self', difficulty: 'Medium', diffColor: 'var(--orange)',
    analogy: "The Two Messengers",
    excerpt: "Two messengers walk opposite directions through a row of villages, writing their tally before absorbing each harvest. No village sees its own.",
    tags: ['Prefix / Suffix', 'O(n) time'],
    accent: 'var(--orange)',
    Visual: VisualTwoMessengers,
  },
  {
    id: '560', name: 'Subarray Sum = K', difficulty: 'Medium', diffColor: 'var(--orange)',
    analogy: "The Checkpoint Journey",
    excerpt: "Record your odometer at every city. The distance between two checkpoints is just subtraction. A logbook of past readings makes any target instant to find.",
    tags: ['Prefix Sums', 'HashMap'],
    accent: 'var(--orange)',
    Visual: VisualOdometer,
  },
  {
    id: '022', name: 'Generate Parentheses', difficulty: 'Medium', diffColor: 'var(--orange)',
    analogy: "The Mountain Climber",
    excerpt: "Every ( is a step up, every ) a step down. You can only descend if you've climbed. Every valid route ends back at ground level.",
    tags: ['Backtracking', 'Recursion'],
    accent: '#52b87a',
    Visual: VisualMountainClimber,
  },
  {
    id: '200', name: 'Number of Islands', difficulty: 'Medium', diffColor: 'var(--orange)',
    analogy: "The Park Ranger Survey",
    excerpt: "Spot uncharted land, radio a survey team. They fan out and plant flags on every connected tile. One call claims the whole island.",
    tags: ['DFS / BFS', 'Graph'],
    accent: 'var(--blue)',
    Visual: VisualParkRanger,
  },
]

// Syntax token helpers for code mockup
const Kw = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: '#AD95E9' }}>{children}</span>
const Fn = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: '#7FB6ED' }}>{children}</span>
const Ty = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: '#52B87A' }}>{children}</span>
const Lit = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: '#D99530' }}>{children}</span>
const Px = ({ children }: { children: React.ReactNode }) =>
  <span style={{ color: '#AEADA8' }}>{children}</span>

// ─── Page ─────────────────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  { step: '01', heading: 'Read the mental model', body: 'Each section opens with a guide built around a real-world analogy — the why, not just the how.', color: 'var(--purple)' },
  { step: '02', heading: 'Apply it immediately', body: "A focused set of problems locks in what you just read while it's still fresh. Doing before forgetting.", color: 'var(--blue)' },
  { step: '03', heading: 'Revisit as you advance', body: "Harder problems from previous models resurface in later steps — exactly when you're ready for them.", color: 'var(--green)' },
]

export default function HomePage() {
  const allProblems = getAllProblems()

  const totalProblems = allProblems.length
  const totalPhases   = JOURNEY.length
  const totalSections = JOURNEY.reduce((acc, p) => acc + p.sections.length, 0)

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{
        ...BLEED,
        background: 'linear-gradient(150deg, color-mix(in srgb, var(--purple) 10%, var(--bg)) 0%, color-mix(in srgb, var(--blue) 6%, var(--bg)) 50%, var(--bg) 90%)',
        marginTop: '-54px',
        paddingBottom: 80,
      }}>
        <div style={inner('118px 24px 0')}>

          <div style={{ marginBottom: 32 }}>
            <span style={{
              fontFamily: 'ui-monospace, monospace', fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--purple)',
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid color-mix(in srgb, var(--purple) 22%, transparent)',
              padding: '5px 14px', borderRadius: '999px', display: 'inline-block',
            }}>A structured learning path</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(3.5rem, 7vw, 5.75rem)', lineHeight: 1.0, letterSpacing: '-0.03em',
            color: 'var(--fg)', marginBottom: 40, maxWidth: '860px',
          }}>
            Learn DSA the way<br />it should be taught.
          </h1>

          <div style={{
            display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
            gap: '24px 48px', maxWidth: '820px', marginBottom: 52,
          }}>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.75, color: 'var(--fg-alt)', margin: 0 }}>
              Most DSA study is backwards — grinding problems until solutions stick by accident.
              This path builds <strong style={{ color: 'var(--purple)', fontWeight: 700 }}>mental models first</strong>.
              Understand the <em>why</em> before writing a line of code.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--fg-comment)', margin: 0 }}>
              The result: you recognize what kind of problem you&apos;re looking at — not because you
              memorized the solution, but because the intuition is actually yours.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 40 }}>
              {[
                { value: String(totalPhases),   label: 'phases',        color: 'var(--orange)'  },
                { value: String(totalSections), label: 'mental models', color: 'var(--purple)'  },
                { value: String(totalProblems), label: 'problems',      color: 'var(--blue)'    },
              ].map(({ value, label, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
                    fontSize: '3.25rem', lineHeight: 1, color, letterSpacing: '-0.04em',
                  }}>{value}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--fg-gutter)' }}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Link href="/path" style={{
                padding: '11px 28px', borderRadius: 7, fontWeight: 600, fontSize: '0.9375rem',
                color: 'white', background: 'var(--blue)', textDecoration: 'none',
              }}>
                Start the learning path →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM / CONTRAST ──────────────────────────────────────────── */}
      <section style={{ ...BLEED, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div style={{ ...inner('0 24px'), display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ padding: '48px 48px 48px 0', borderRight: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-gutter)', marginBottom: 16 }}>
              The usual approach
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.625rem', lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 14px' }}>
              Grinding leaves too much to chance.
            </h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--fg-comment)', margin: 0 }}>
              Solving 200 random problems teaches you 200 solutions. Ask yourself which ones you could
              reproduce cold — without the label, without having seen it recently. Pattern matching by
              accident doesn&apos;t transfer to problems you haven&apos;t seen before.
            </p>
          </div>
          <div style={{ padding: '48px 0 48px 48px' }}>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 16 }}>
              This path
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.625rem', lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 14px' }}>
              Real pattern recognition is built deliberately.
            </h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--fg-comment)', margin: 0 }}>
              This path teaches you to see the structure of a problem — not because you&apos;ve seen it
              before, but because you understand the underlying pattern. That understanding transfers to
              problems you&apos;ve never encountered.
            </p>
          </div>
        </div>
      </section>

      {/* ── FUNDAMENTALS GALLERY ────────────────────────────────────────────── */}
      <section style={{ ...BLEED, background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div style={inner('72px 24px 80px')}>

          <div style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-gutter)' }}>Step 1</span>
                <span style={{ width: 24, height: 1, background: 'var(--border)', display: 'inline-block' }} />
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)' }}>Build the foundation</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
                fontSize: '2.25rem', lineHeight: 1.1, letterSpacing: '-0.03em',
                color: 'var(--fg)', margin: '0 0 14px', maxWidth: 580,
              }}>
                Every data structure gets its own mental model.
              </h2>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--fg-comment)', margin: 0, maxWidth: 520 }}>
                Before you encounter a single problem, you understand the tools you&apos;ll use to solve them — each one through a single real-world analogy that makes the structure obvious.
              </p>
            </div>
            <Link href="/path" style={{
              fontFamily: 'ui-monospace, monospace', fontSize: '0.72rem', fontWeight: 600,
              color: 'var(--fg-alt)', textDecoration: 'none', whiteSpace: 'nowrap',
              border: '1px solid var(--border)', padding: '8px 16px', borderRadius: 5,
              background: 'var(--bg-alt)', flexShrink: 0,
            }}>
              Explore fundamentals →
            </Link>
          </div>

          {/* 2-col horizontal card grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {FUNDAMENTALS_DATA.map(({ slug, name, analogy, excerpt, tags, accent, Visual }, idx) => (
              <div key={slug} style={{
                border: '1px solid var(--border)', borderRadius: '0.875rem',
                overflow: 'hidden', background: 'var(--bg)',
                display: 'flex', flexDirection: 'row',
                gridColumn: idx === 4 ? '1 / -1' : undefined,
              }}>
                {/* Visual panel — left */}
                <div style={{
                  width: 220, flexShrink: 0,
                  borderRight: '1px solid var(--border)',
                  background: `color-mix(in srgb, ${accent} 5%, var(--bg-alt))`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Visual />
                </div>

                {/* Content — right */}
                <div style={{ flex: 1, padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 180 }}>
                  <div>
                    <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-gutter)', marginBottom: 8 }}>Fundamentals</div>
                    <div style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--fg)', marginBottom: 6, lineHeight: 1.25 }}>{name}</div>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
                      fontSize: '1.25rem', lineHeight: 1.15, letterSpacing: '-0.02em',
                      color: accent, marginBottom: 14,
                    }}>{analogy}</div>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--fg-comment)', margin: 0 }}>{excerpt}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 20 }}>
                    {tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: 'ui-monospace, monospace', fontSize: '0.58rem', fontWeight: 600,
                        padding: '3px 8px', borderRadius: 4,
                        color: 'var(--fg-gutter)', background: 'var(--bg-alt)',
                        border: '1px solid var(--border)',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENTAL MODELS GALLERY ───────────────────────────────────────────── */}
      <section style={{ ...BLEED, background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
        <div style={inner('72px 24px 80px')}>

          {/* Section header */}
          <div style={{ marginBottom: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-gutter)' }}>Step 2</span>
                <span style={{ width: 24, height: 1, background: 'var(--border)', display: 'inline-block' }} />
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)' }}>Apply the foundation</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
                fontSize: '2.25rem', lineHeight: 1.1, letterSpacing: '-0.03em',
                color: 'var(--fg)', margin: '0 0 14px', maxWidth: 560,
              }}>
                Then tackle real algorithms — with a story for each.
              </h2>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--fg-comment)', margin: 0, maxWidth: 520 }}>
                Each problem gets its own analogy. You already know the tools — now you learn exactly which one applies, and why, before writing a line of code.
              </p>
            </div>
            <Link href="/path" style={{
              fontFamily: 'ui-monospace, monospace', fontSize: '0.72rem', fontWeight: 600,
              color: 'var(--fg-alt)', textDecoration: 'none', whiteSpace: 'nowrap',
              border: '1px solid var(--border)', padding: '8px 16px', borderRadius: 5,
              background: 'var(--bg)', flexShrink: 0,
            }}>
              Browse all problems →
            </Link>
          </div>

          {/* 3×2 card grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {MENTAL_MODELS_DATA.map(({ id, name, difficulty, diffColor, analogy, excerpt, tags, accent, Visual }) => (
              <div key={id} style={{
                border: '1px solid var(--border)', borderRadius: '0.875rem',
                overflow: 'hidden', background: 'var(--bg)',
                display: 'flex', flexDirection: 'column',
                transition: 'box-shadow 0.15s',
              }}>
                {/* Visual preview area */}
                <div style={{
                  borderBottom: '1px solid var(--border)',
                  background: `color-mix(in srgb, ${accent} 5%, var(--bg-alt))`,
                  minHeight: 128,
                }}>
                  <Visual />
                </div>

                {/* Card content */}
                <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Problem meta row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 9 }}>
                    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.55rem', fontWeight: 700, color: 'var(--fg-gutter)', letterSpacing: '0.04em' }}>{id}</span>
                    <span style={{ width: 1, height: 8, background: 'var(--border)', display: 'inline-block' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg)' }}>{name}</span>
                    <span style={{ marginLeft: 'auto', fontFamily: 'ui-monospace, monospace', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: diffColor, background: `color-mix(in srgb, ${diffColor} 12%, transparent)`, padding: '2px 6px', borderRadius: 3, flexShrink: 0 }}>{difficulty}</span>
                  </div>
                  {/* Analogy name */}
                  <div style={{
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
                    fontSize: '1.0625rem', lineHeight: 1.2, letterSpacing: '-0.01em',
                    color: accent, marginBottom: 8,
                  }}>{analogy}</div>
                  {/* Excerpt */}
                  <p style={{ fontSize: '0.8125rem', lineHeight: 1.7, color: 'var(--fg-comment)', margin: '0 0 12px', flex: 1 }}>{excerpt}</p>
                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: 'ui-monospace, monospace', fontSize: '0.56rem', fontWeight: 600,
                        padding: '3px 7px', borderRadius: 3,
                        color: 'var(--fg-gutter)', background: 'var(--bg-alt)',
                        border: '1px solid var(--border)',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL SHOWCASE ─────────────────────────────────────────────────── */}
      <section style={{ ...BLEED, background: 'var(--bg)' }}>
        <div style={inner('72px 24px 80px')}>

          {/* Section header */}
          <div style={{ marginBottom: 52 }}>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-gutter)', marginBottom: 12 }}>
              Inside a lesson
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
              fontSize: '2.25rem', lineHeight: 1.1, letterSpacing: '-0.03em',
              color: 'var(--fg)', margin: 0, maxWidth: 540,
            }}>
              Every step of learning is intentional.
            </h2>
          </div>

          {/* Feature 1 — Tracer */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1.1fr 0.9fr',
            gap: '40px 56px', marginBottom: 40, alignItems: 'center',
          }}>
            <TracerMockup />
            <div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 12 }}>
                Visual Tracers
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.75rem', lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--fg)', margin: '0 0 14px' }}>
                See the algorithm run before you write a line.
              </h3>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--fg-comment)', margin: '0 0 20px' }}>
                Interactive step-through tracers let you advance frame by frame — watching each variable
                change, each array cell light up, the state evolving visually before you ever touch the keyboard.
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: 'var(--fg-comment)', margin: 0 }}>
                The algorithm stops being abstract. You can <em>see</em> exactly what it&apos;s doing at every step.
              </p>
            </div>
          </div>

          {/* Feature 2 + 3 — Code Editor + Mental Model */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
            {/* Code editor */}
            <div>
              <CodeEditorMockup />
              <div style={{ padding: '20px 4px 0' }}>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 8 }}>
                  Step-by-Step Building
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.375rem', lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 10px' }}>
                  Build the algorithm yourself.
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--fg-comment)', margin: 0 }}>
                  Each concept unlocks incrementally inside a real in-browser editor. You write the solution —
                  guided, but never handed the answer.
                </p>
              </div>
            </div>

            {/* Mental model */}
            <div>
              <MentalModelMockup />
              <div style={{ padding: '20px 4px 0' }}>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 8 }}>
                  Mental Models
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.375rem', lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '0 0 10px' }}>
                  Every pattern has an unforgettable analogy.
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--fg-comment)', margin: 0 }}>
                  Before any code appears, the pattern is explained through a single real-world metaphor you
                  won&apos;t forget. The algorithm becomes obvious once the intuition is there.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section style={{ ...BLEED, borderTop: '1px solid var(--border)' }}>
        <div style={inner('0 24px')}>
          <div style={{ padding: '48px 0 32px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-gutter)', marginBottom: 8 }}>
              The loop
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.625rem', lineHeight: 1.2, letterSpacing: '-0.025em', color: 'var(--fg)', margin: 0 }}>
              Three steps. Repeated across every section.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {HOW_IT_WORKS.map(({ step, heading, body, color }, i) => (
              <div key={step} style={{
                padding: '40px 36px',
                background: `color-mix(in srgb, ${color} 7%, var(--bg))`,
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '3.25rem', lineHeight: 1, color: `color-mix(in srgb, ${color} 30%, var(--bg))`, letterSpacing: '-0.05em', marginBottom: 18, userSelect: 'none' }}>{step}</div>
                <div style={{ fontWeight: 700, fontSize: '1.0625rem', lineHeight: 1.25, color: 'var(--fg)', marginBottom: 12 }}>{heading}</div>
                <div style={{ width: 36, height: 3, background: color, marginBottom: 14, borderRadius: 2 }} />
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--fg-alt)', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────────── */}
      <section style={{
        ...BLEED,
        background: 'linear-gradient(170deg, color-mix(in srgb, var(--blue) 7%, var(--bg)) 0%, var(--bg) 60%)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{
          ...inner('72px 24px 80px'),
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: 40, flexWrap: 'wrap',
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '2.5rem', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--fg)', margin: '0 0 12px', maxWidth: 520 }}>
              Ready to build real intuition?
            </h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--fg-comment)', margin: 0, maxWidth: 440 }}>
              The path starts with the fundamentals and scales to expert-level techniques — one mental model at a time.
            </p>
          </div>
          <Link href="/path" style={{
            padding: '13px 32px', borderRadius: 7, fontWeight: 600, fontSize: '1rem',
            color: 'white', background: 'var(--blue)', textDecoration: 'none', flexShrink: 0,
          }}>
            View the path →
          </Link>
        </div>
      </section>
    </>
  )
}
