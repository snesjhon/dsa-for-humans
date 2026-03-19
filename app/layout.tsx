import type { Metadata } from 'next'
import { Newsreader, Plus_Jakarta_Sans } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  adjustFontFallback: false,
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'DSA for Humans — A Structured Learning Path',
  description: 'Learn DSA the way it should be taught. Build mental models first, then apply them through a structured curriculum.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font-body), system-ui, sans-serif' }}>
        <header
          className="sticky top-0 z-50"
          style={{
            borderBottom: '1px solid var(--border)',
            background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <nav className="w-full flex items-center gap-6" style={{ height: '54px', maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
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
        </header>
        <main className="w-full" style={{ padding: '0 24px' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
