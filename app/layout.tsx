import type { Metadata } from 'next'
import { Newsreader, Plus_Jakarta_Sans } from 'next/font/google'
import { SiteHeader } from '@/components/SiteHeader'
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
        <SiteHeader />
        <main className="w-full" style={{ padding: '0 24px' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
