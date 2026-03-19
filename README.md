# DSA-for-humans

A web platform for learning Data Structures & Algorithms through mental models and pattern recognition — built for humans, not machines.

> Previously maintained at `../snesjhon/ysk/dsa`. Now lives here as a standalone platform.

---

## What is DSA-for-humans?

DSA-for-humans is an interactive study platform that teaches you to *see patterns*, not memorize solutions. Every problem is paired with a mental model — a human-readable analogy that makes the algorithm stick. The learning path is structured as a two-phase journey from Novice to Studied, with a pattern recognition trainer to reinforce what you've learned.

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Content resolution**: The app reads markdown from `app/study-guides/`, `app/concepts/`, and `app/fundamentals/` via the file-based content loaders in `lib/`.

---

## Architecture

### App routes

| Route | File | Description |
|---|---|---|
| `/` | [`app/page.tsx`](app/page.tsx) | Timeline home — visual learning journey |
| `/patterns` | [`app/patterns/page.tsx`](app/patterns/page.tsx) | Grid of all 13 DSA patterns |
| `/patterns/[pattern]` | [`app/patterns/[pattern]/page.tsx`](app/patterns/%5Bpattern%5D/page.tsx) | Pattern detail with problem list |
| `/problems/[id]` | [`app/problems/[id]/page.tsx`](app/problems/%5Bid%5D/page.tsx) | Problem page with mental model |
| `/problems/[id]/solution` | [`app/problems/[id]/solution/page.tsx`](app/problems/%5Bid%5D/solution/page.tsx) | Solution walkthrough |
| `/train` | [`app/train/page.tsx`](app/train/page.tsx) | Pattern trainer session picker |
| `/train/[session]` | [`app/train/[session]/page.tsx`](app/train/%5Bsession%5D/page.tsx) | Interactive pattern quiz |
| `/fundamentals/[slug]` | [`app/fundamentals/[slug]/page.tsx`](app/fundamentals/%5Bslug%5D/page.tsx) | Deep-dive conceptual guides |

### Core library

| File | Purpose |
|---|---|
| [`lib/types.ts`](lib/types.ts) | `Problem`, `PatternGroup` TypeScript interfaces |
| [`lib/content.ts`](lib/content.ts) | File-based content loader (markdown → typed data) |
| [`lib/patterns.ts`](lib/patterns.ts) | 13 DSA pattern definitions with icons and descriptions |
| [`lib/journey.ts`](lib/journey.ts) | Two-phase learning path with sections and problem lists |
| [`lib/fundamentals.ts`](lib/fundamentals.ts) | Fundamentals guide loader |
| [`lib/headings.ts`](lib/headings.ts) | Heading extraction for auto-generated TOC |

### Components

| File | Purpose |
|---|---|
| [`components/Trainer.tsx`](components/Trainer.tsx) | Pattern recognition quiz engine |
| [`components/MarkdownRenderer.tsx`](components/MarkdownRenderer.tsx) | Markdown → React with syntax highlighting |
| [`components/TableOfContents.tsx`](components/TableOfContents.tsx) | Auto-generated TOC from headings |
| [`components/JourneyNav.tsx`](components/JourneyNav.tsx) | Navigation between journey sections |
| [`components/PatternGrid.tsx`](components/PatternGrid.tsx) | Pattern grid layout |

### Content structure

```
app/
├── study-guides/           # 52 entries (problem folders + visual guides)
│   ├── 022-generate-parentheses/
│   │   ├── mental-model.md
│   │   ├── study-guide.md
│   │   └── study-guide-solution.md
│   └── ...
├── concepts/               # 17 markdown files (pattern theory)
│   ├── hash-maps.md
│   ├── sliding-window.md
│   ├── trees.md
│   └── ...
└── fundamentals/           # Deep-dive guides (graphs, trees, BSTs, etc.)
    └── [slug]/
        └── page.tsx
```

---

## The 13 patterns

| Pattern | Icon | Core idea |
|---|---|---|
| Hash Maps | 🗺️ | O(1) lookups — trade space for time |
| Sliding Window | 🪟 | Two pointers, expand and shrink |
| Two Pointers | 👆 | Converging from both ends |
| Binary Search | 🔍 | Eliminate half the search space each step |
| Trees | 🌳 | Recursive substructure |
| Graphs | 🕸️ | Connected components, BFS/DFS |
| Backtracking | 🏔️ | Explore, prune, retreat |
| Monotonic Stack | 📚 | Maintain a sorted invariant |
| Dynamic Programming | 🧩 | Cache subproblem results |
| Greedy | 💰 | Local optimum → global optimum |
| Arrays | 📋 | In-place manipulation, prefix sums |
| Linked Lists | 🔗 | Pointer manipulation |
| Design | ⚙️ | Combine data structures for behavior |

Defined in [`lib/patterns.ts`](lib/patterns.ts).

---

## The learning journey

Two phases, defined in [`lib/journey.ts`](lib/journey.ts):

**Phase 1 — Novice** 🌱 *(3–5 weeks)*
1. Arrays & Strings
2. Hash Maps
3. Two Pointers
4. Sliding Window
5. Linked Lists
6. Recursion & Backtracking
7. Binary Search

**Phase 2 — Studied** 📚
8. Binary Trees
9. Binary Search Trees
10. Graphs Fundamentals
11. Graph Traversal — DFS
12. Backtracking Deep Dive
13. Monotonic Stack & Greedy

Each section has:
- A **mental model hook** — one-liner intuition for the pattern
- **First Pass** problems — build the foundation
- **Come Back & Reinforce** problems — deepen mastery
- Optional link to a fundamentals guide

---

## Current scope (PoC)

- **27 problems** fully integrated with mental models
- **52 study guide entries** available in `app/study-guides/`
- **13 DSA patterns** defined and linked
- **17 concept guides** covering pattern theory
- **13 journey sections** across 2 phases

The 27 active problems: `022 027 032 033 034 039 046 074 076 078 088 092 104 114 146 200 226 236 238 402 424 543 560 572 701 875 926`

Controlled by `POC_IDS` in [`lib/content.ts`](lib/content.ts).

---

## Stack

- **Next.js 14** (App Router, static generation)
- **React 18** + **TypeScript 5**
- **TailwindCSS 3** with custom GitLab color palette
- **react-markdown** + **rehype-highlight** + **remark-gfm**
- **gray-matter** for YAML frontmatter
- File-based content — no database, no backend

---

## Ideas & future direction

These are directions DSA-for-humans could grow into:

### Near-term
- **Expand to all 76+ problems** — unlock the full study-guides library
- **Phase 3: Master** — harder problems, advanced patterns (segment trees, tries, bit manipulation)
- **Search** — fuzzy search across problems, patterns, and concepts
- **Progress tracking** — mark problems as done, track streaks (localStorage or auth)

### Platform
- **Spaced repetition scheduler** — surface problems at optimal review intervals (SM-2 algorithm)
- **Difficulty ratings** — community-driven or auto-derived from problem metadata
- **Code playground** — inline editor with test runner per problem (Monaco + WASM judge)
- **Daily problem** — one featured problem per day with email/push notification
- **Mobile-optimized trainer** — flashcard-style pattern quiz for commuting

### Content
- **Video walkthroughs** — short recordings embedded per problem (Loom / custom player)
- **Visual algorithm animations** — Remotion-generated MP4s showing pointer movement, stack ops, tree traversal
- **Complexity cheatsheet** — sortable table of all problems with time/space complexity
- **"Interview Simulator"** — timed mock with random problem selection and post-session review

### Social / collaborative
- **Shareable study plans** — export a personalized journey as a link
- **Annotation layer** — leave notes on mental models, visible only to you
- **Community tips** — crowdsourced "aha moments" pinned to each problem

### Integration
- **LeetCode sync** — mark problems solved via LeetCode API, auto-update progress
- **Obsidian plugin** — pull DSA-for-humans content into your personal vault
- **CLI study mode** — `dsa-for-humans 104` prints the mental model to terminal

---

## Content origin

The markdown content (study guides, mental models, concept files) originated in [`../snesjhon/ysk`](../snesjhon/ysk) — a personal knowledge base repo. The platform was extracted from there and now lives here as its own standalone project. The original curriculum structure and two-pass learning system (`dsa/00-complete-dsa-path.md`) remains the source of truth for problem selection and ordering.
