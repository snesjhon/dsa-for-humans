export interface Problem {
  id: string           // "001", "022", "200"
  title: string        // "Two Sum"
  patterns: string[]   // ["hash-map", "arrays"]
  hasMentalModel: boolean
  hasStudyGuide: boolean
  hasSolution: boolean
  slug: string         // "022-generate-parentheses"
  files: {
    mentalModel?: string
    studyGuide?: string
    solution?: string
  }
}

export interface PatternGroup {
  id: string           // "hash-map"
  label: string        // "Hash Maps"
  description: string  // superpower one-liner
  icon: string         // emoji
  conceptFile?: string // path to concepts/X.md
  problems: Problem[]
}
