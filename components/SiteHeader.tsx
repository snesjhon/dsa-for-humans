'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 12)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        // Transparent at top: hero extends behind header via marginTop:-54px.
        // On scroll: frosted glass tinted by --active-phase-color (set by PhaseTracker).
        // CSS custom property changes cascade automatically, so the color
        // transitions smoothly as phases scroll into view.
        background: scrolled
          ? 'color-mix(in srgb, var(--active-phase-color) 9%, color-mix(in srgb, var(--bg) 87%, transparent))'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(1.3)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.3)' : 'none',
        transition: 'background 500ms ease',
      }}
    >
      {/*
        Inner wrapper with position:relative so the gradient border div
        can be absolutely positioned and span the full header width —
        independent of the centered nav's max-width constraint.
      */}
      <div style={{ position: 'relative' }}>
        <nav
          className="w-full flex items-center gap-6"
          style={{ height: '54px', maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}
        >
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '1.125rem',
              color: 'var(--fg)',
              letterSpacing: '-0.01em',
            }}>
              DSA for Humans
            </span>
          </Link>
          <div className="ml-auto" />
        </nav>

        {/*
          Gradient bottom border — echoes the hero's purple→blue wash.
          Fades in on scroll, invisible at the top of the page.
          Spans the full viewport width (not capped by nav's max-width).
        */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'color-mix(in srgb, var(--active-phase-color) 30%, transparent)',
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 450ms ease',
            pointerEvents: 'none',
          }}
        />
      </div>
    </header>
  )
}
