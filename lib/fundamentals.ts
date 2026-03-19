import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { JOURNEY } from './journey'

const FUNDAMENTALS_DIR = path.join(process.cwd(), 'app', 'fundamentals')

export interface FundamentalsGuide {
  slug: string        // "binary-trees"
  filename: string    // "binary-trees-fundamentals.md"
  title: string       // "Binary Trees - Fundamentals"
  content: string
  sections: string[]  // top-level ## headings
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1] : ''
}

function extractH2Sections(content: string): string[] {
  const matches = content.matchAll(/^##\s+(.+)$/gm)
  return Array.from(matches).map(m => m[1])
}

export function getFundamentalsGuide(slug: string): FundamentalsGuide | null {
  const filename = `${slug}-fundamentals.md`
  const filePath = path.join(FUNDAMENTALS_DIR, filename)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)

  return {
    slug,
    filename,
    title: extractTitle(content),
    content,
    sections: extractH2Sections(content),
  }
}

export function getAllFundamentalsSlugs(): string[] {
  if (!fs.existsSync(FUNDAMENTALS_DIR)) return []

  return fs
    .readdirSync(FUNDAMENTALS_DIR)
    .filter(f => f.endsWith('-fundamentals.md') && !f.includes('sql'))
    .map(f => f.replace('-fundamentals.md', ''))
}

// Find which journey section links to this fundamentals slug
export function getSectionForFundamentals(slug: string) {
  for (const phase of JOURNEY) {
    for (const section of phase.sections) {
      if (section.fundamentalsSlug === slug) {
        return { phase, section }
      }
    }
  }
  return null
}
