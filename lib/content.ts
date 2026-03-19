import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Problem, PatternGroup } from './types'
import { PATTERN_META, PATTERN_ORDER } from './patterns'

const STUDY_GUIDES_DIR = path.join(process.cwd(), 'app', 'problems')
const CONCEPTS_DIR = path.join(process.cwd(), 'app', 'patterns')

const PATTERN_MAP: Record<string, string[]> = {
  // ── Arrays & Strings ──────────────────────────────────────────────────
  '001': ['hash-map', 'arrays'],
  '003': ['sliding-window'],
  '007': ['arrays'],
  '011': ['two-pointers'],
  '015': ['two-pointers'],
  '019': ['linked-list', 'two-pointers'],
  '021': ['linked-list'],
  '023': ['linked-list'],
  '025': ['linked-list'],
  '026': ['two-pointers', 'arrays'],
  '027': ['two-pointers', 'arrays'],
  '042': ['two-pointers'],
  '043': ['arrays'],
  '048': ['arrays'],
  '054': ['arrays'],
  '066': ['arrays'],
  '073': ['arrays'],
  '075': ['two-pointers'],
  '088': ['two-pointers', 'arrays'],
  '121': ['dynamic-programming', 'greedy'],
  '125': ['two-pointers', 'arrays'],
  '128': ['hash-map'],
  '136': ['arrays'],
  '167': ['two-pointers', 'binary-search'],
  '190': ['arrays'],
  '191': ['arrays'],
  '202': ['hash-map'],
  '217': ['hash-map', 'arrays'],
  '238': ['arrays'],
  '239': ['sliding-window', 'monotonic-stack'],
  '242': ['hash-map', 'arrays'],
  '268': ['arrays'],
  '271': ['arrays'],
  '338': ['dynamic-programming'],
  '371': ['arrays'],
  '387': ['hash-map', 'arrays'],

  // ── Hash Maps ─────────────────────────────────────────────────────────
  '036': ['hash-map', 'arrays'],
  '049': ['hash-map'],
  '560': ['hash-map'],

  // ── Sliding Window ────────────────────────────────────────────────────
  '076': ['sliding-window'],
  '424': ['sliding-window'],
  '567': ['sliding-window', 'hash-map'],

  // ── Linked Lists ─────────────────────────────────────────────────────
  '002': ['linked-list'],
  '092': ['linked-list'],
  '138': ['linked-list'],
  '141': ['linked-list'],
  '143': ['linked-list'],
  '146': ['design', 'hash-map'],
  '206': ['linked-list'],
  '287': ['linked-list', 'binary-search'],

  // ── Stack & Queue ─────────────────────────────────────────────────────
  '020': ['design'],
  '084': ['monotonic-stack'],
  '150': ['design'],
  '155': ['design'],
  '232': ['design'],
  '394': ['design'],
  '739': ['monotonic-stack'],
  '853': ['monotonic-stack'],

  // ── Recursion & Backtracking ──────────────────────────────────────────
  '017': ['backtracking'],
  '022': ['backtracking'],
  '037': ['backtracking'],
  '039': ['backtracking'],
  '040': ['backtracking'],
  '046': ['backtracking'],
  '051': ['backtracking'],
  '077': ['backtracking'],
  '078': ['backtracking'],
  '079': ['backtracking'],
  '090': ['backtracking'],
  '131': ['backtracking'],
  '212': ['backtracking', 'trees'],
  '344': ['two-pointers', 'arrays'],
  '494': ['dynamic-programming', 'backtracking'],
  '509': ['dynamic-programming'],

  // ── Binary Search ─────────────────────────────────────────────────────
  '004': ['binary-search'],
  '033': ['binary-search'],
  '034': ['binary-search'],
  '035': ['binary-search'],
  '069': ['binary-search'],
  '074': ['binary-search'],
  '153': ['binary-search'],
  '162': ['binary-search'],
  '278': ['binary-search'],
  '374': ['binary-search'],
  '704': ['binary-search'],
  '875': ['binary-search'],
  '981': ['binary-search', 'design'],

  // ── Trees ─────────────────────────────────────────────────────────────
  '098': ['trees', 'binary-search'],
  '100': ['trees'],
  '102': ['trees'],
  '104': ['trees'],
  '105': ['trees'],
  '110': ['trees'],
  '114': ['trees'],
  '124': ['trees'],
  '144': ['trees'],
  '199': ['trees'],
  '208': ['design', 'trees'],
  '211': ['design', 'trees'],
  '226': ['trees'],
  '230': ['trees', 'binary-search'],
  '235': ['trees', 'binary-search'],
  '236': ['trees'],
  '297': ['trees', 'design'],
  '543': ['trees'],
  '572': ['trees'],
  '701': ['trees', 'binary-search'],
  '1448': ['trees'],

  // ── Graphs ────────────────────────────────────────────────────────────
  '127': ['graphs'],
  '130': ['graphs'],
  '133': ['graphs'],
  '200': ['graphs'],
  '207': ['graphs'],
  '210': ['graphs'],
  '261': ['graphs'],
  '269': ['graphs'],
  '286': ['graphs'],
  '323': ['graphs'],
  '329': ['dynamic-programming', 'graphs'],
  '332': ['graphs'],
  '417': ['graphs'],
  '547': ['graphs'],
  '684': ['graphs'],
  '695': ['graphs'],
  '743': ['graphs'],
  '778': ['graphs'],
  '787': ['graphs'],
  '797': ['graphs'],
  '994': ['graphs'],
  '1091': ['graphs'],
  '1584': ['graphs'],

  // ── Heaps ─────────────────────────────────────────────────────────────
  '215': ['design'],
  '295': ['design'],
  '347': ['design', 'hash-map'],
  '355': ['design'],
  '621': ['greedy'],
  '703': ['design'],
  '973': ['design'],
  '1046': ['design'],

  // ── Dynamic Programming ───────────────────────────────────────────────
  '005': ['dynamic-programming'],
  '010': ['dynamic-programming'],
  '062': ['dynamic-programming'],
  '070': ['dynamic-programming'],
  '072': ['dynamic-programming'],
  '091': ['dynamic-programming'],
  '097': ['dynamic-programming'],
  '115': ['dynamic-programming'],
  '139': ['dynamic-programming'],
  '152': ['dynamic-programming'],
  '198': ['dynamic-programming'],
  '213': ['dynamic-programming'],
  '300': ['dynamic-programming'],
  '309': ['dynamic-programming'],
  '312': ['dynamic-programming'],
  '322': ['dynamic-programming'],
  '416': ['dynamic-programming'],
  '518': ['dynamic-programming'],
  '647': ['dynamic-programming'],
  '746': ['dynamic-programming'],
  '926': ['dynamic-programming', 'greedy'],
  '1143': ['dynamic-programming'],

  // ── Greedy ────────────────────────────────────────────────────────────
  '032': ['monotonic-stack', 'dynamic-programming'],
  '045': ['greedy'],
  '050': ['arrays'],
  '053': ['dynamic-programming', 'greedy'],
  '055': ['greedy'],
  '056': ['greedy'],
  '057': ['greedy'],
  '134': ['greedy'],
  '252': ['greedy'],
  '253': ['greedy'],
  '402': ['monotonic-stack', 'greedy'],
  '435': ['greedy'],
  '678': ['greedy', 'dynamic-programming'],
  '763': ['greedy'],
  '846': ['greedy'],
  '1851': ['greedy'],
  '1899': ['greedy'],
  '2013': ['design'],
}

const TITLE_MAP: Record<string, string> = {
  '001': 'Two Sum',
  '002': 'Add Two Numbers',
  '003': 'Longest Substring Without Repeating Characters',
  '004': 'Median of Two Sorted Arrays',
  '005': 'Longest Palindromic Substring',
  '007': 'Reverse Integer',
  '010': 'Regular Expression Matching',
  '011': 'Container With Most Water',
  '015': '3Sum',
  '017': 'Letter Combinations of a Phone Number',
  '019': 'Remove Nth Node From End of List',
  '020': 'Valid Parentheses',
  '021': 'Merge Two Sorted Lists',
  '022': 'Generate Parentheses',
  '023': 'Merge K Sorted Lists',
  '025': 'Reverse Nodes in K-Group',
  '026': 'Remove Duplicates from Sorted Array',
  '027': 'Remove Element',
  '032': 'Longest Valid Parentheses',
  '033': 'Search in Rotated Sorted Array',
  '034': 'Find First and Last Position of Element in Sorted Array',
  '035': 'Search Insert Position',
  '036': 'Valid Sudoku',
  '037': 'Sudoku Solver',
  '039': 'Combination Sum',
  '040': 'Combination Sum II',
  '042': 'Trapping Rain Water',
  '043': 'Multiply Strings',
  '045': 'Jump Game II',
  '046': 'Permutations',
  '048': 'Rotate Image',
  '049': 'Group Anagrams',
  '050': 'Pow(x, n)',
  '051': 'N-Queens',
  '053': 'Maximum Subarray',
  '054': 'Spiral Matrix',
  '055': 'Jump Game',
  '056': 'Merge Intervals',
  '057': 'Insert Interval',
  '062': 'Unique Paths',
  '066': 'Plus One',
  '069': 'Sqrt(x)',
  '070': 'Climbing Stairs',
  '072': 'Edit Distance',
  '073': 'Set Matrix Zeroes',
  '074': 'Search a 2D Matrix',
  '075': 'Sort Colors',
  '076': 'Minimum Window Substring',
  '077': 'Combinations',
  '078': 'Subsets',
  '079': 'Word Search',
  '084': 'Largest Rectangle in Histogram',
  '088': 'Merge Sorted Array',
  '090': 'Subsets II',
  '091': 'Decode Ways',
  '092': 'Reverse Linked List II',
  '097': 'Interleaving String',
  '098': 'Validate Binary Search Tree',
  '100': 'Same Tree',
  '102': 'Binary Tree Level Order Traversal',
  '104': 'Maximum Depth of Binary Tree',
  '105': 'Construct Binary Tree from Preorder and Inorder Traversal',
  '110': 'Balanced Binary Tree',
  '114': 'Flatten Binary Tree to Linked List',
  '115': 'Distinct Subsequences',
  '121': 'Best Time to Buy and Sell Stock',
  '124': 'Binary Tree Maximum Path Sum',
  '125': 'Valid Palindrome',
  '127': 'Word Ladder',
  '128': 'Longest Consecutive Sequence',
  '130': 'Surrounded Regions',
  '131': 'Palindrome Partitioning',
  '133': 'Clone Graph',
  '134': 'Gas Station',
  '136': 'Single Number',
  '138': 'Copy List with Random Pointer',
  '139': 'Word Break',
  '141': 'Linked List Cycle',
  '143': 'Reorder List',
  '144': 'Binary Tree Preorder Traversal',
  '146': 'LRU Cache',
  '150': 'Evaluate Reverse Polish Notation',
  '152': 'Maximum Product Subarray',
  '153': 'Find Minimum in Rotated Sorted Array',
  '155': 'Min Stack',
  '162': 'Find Peak Element',
  '167': 'Two Sum II - Input Array Is Sorted',
  '190': 'Reverse Bits',
  '191': 'Number of 1 Bits',
  '198': 'House Robber',
  '199': 'Binary Tree Right Side View',
  '200': 'Number of Islands',
  '202': 'Happy Number',
  '206': 'Reverse Linked List',
  '207': 'Course Schedule',
  '208': 'Implement Trie (Prefix Tree)',
  '210': 'Course Schedule II',
  '211': 'Design Add and Search Words Data Structure',
  '212': 'Word Search II',
  '213': 'House Robber II',
  '215': 'Kth Largest Element in an Array',
  '217': 'Contains Duplicate',
  '226': 'Invert Binary Tree',
  '230': 'Kth Smallest Element in a BST',
  '232': 'Implement Queue using Stacks',
  '235': 'Lowest Common Ancestor of a Binary Search Tree',
  '236': 'Lowest Common Ancestor of a Binary Tree',
  '238': 'Product of Array Except Self',
  '239': 'Sliding Window Maximum',
  '242': 'Valid Anagram',
  '252': 'Meeting Rooms',
  '253': 'Meeting Rooms II',
  '261': 'Graph Valid Tree',
  '268': 'Missing Number',
  '269': 'Alien Dictionary',
  '271': 'Encode and Decode Strings',
  '278': 'First Bad Version',
  '286': 'Walls and Gates',
  '287': 'Find the Duplicate Number',
  '295': 'Find Median from Data Stream',
  '297': 'Serialize and Deserialize Binary Tree',
  '300': 'Longest Increasing Subsequence',
  '309': 'Best Time to Buy and Sell Stock with Cooldown',
  '312': 'Burst Balloons',
  '322': 'Coin Change',
  '323': 'Number of Connected Components in an Undirected Graph',
  '329': 'Longest Increasing Path in a Matrix',
  '332': 'Reconstruct Itinerary',
  '338': 'Counting Bits',
  '344': 'Reverse String',
  '347': 'Top K Frequent Elements',
  '355': 'Design Twitter',
  '371': 'Sum of Two Integers',
  '374': 'Guess Number Higher or Lower',
  '387': 'First Unique Character in a String',
  '394': 'Decode String',
  '402': 'Remove K Digits',
  '416': 'Partition Equal Subset Sum',
  '417': 'Pacific Atlantic Water Flow',
  '424': 'Longest Repeating Character Replacement',
  '435': 'Non-overlapping Intervals',
  '494': 'Target Sum',
  '509': 'Fibonacci Number',
  '518': 'Coin Change II',
  '543': 'Diameter of Binary Tree',
  '547': 'Number of Provinces',
  '560': 'Subarray Sum Equals K',
  '567': 'Permutation in String',
  '572': 'Subtree of Another Tree',
  '621': 'Task Scheduler',
  '647': 'Palindromic Substrings',
  '678': 'Valid Parenthesis String',
  '684': 'Redundant Connection',
  '695': 'Max Area of Island',
  '701': 'Insert into a Binary Search Tree',
  '703': 'Kth Largest Element in a Stream',
  '704': 'Binary Search',
  '739': 'Daily Temperatures',
  '743': 'Network Delay Time',
  '746': 'Min Cost Climbing Stairs',
  '763': 'Partition Labels',
  '778': 'Swim in Rising Water',
  '787': 'Cheapest Flights Within K Stops',
  '797': 'All Paths From Source to Target',
  '846': 'Hand of Straights',
  '853': 'Car Fleet',
  '875': 'Koko Eating Bananas',
  '926': 'Flip String to Monotone Increasing',
  '973': 'K Closest Points to Origin',
  '981': 'Time Based Key-Value Store',
  '994': 'Rotting Oranges',
  '1046': 'Last Stone Weight',
  '1091': 'Shortest Path in Binary Matrix',
  '1143': 'Longest Common Subsequence',
  '1448': 'Count Good Nodes in Binary Tree',
  '1584': 'Min Cost to Connect All Points',
  '1851': 'Minimum Interval to Include Each Query',
  '1899': 'Merge Triplets to Form Target Triplet',
  '2013': 'Detect Squares',
}

function extractIdFromSlug(slug: string): string | null {
  const match = slug.match(/^(\d+)-/)
  return match ? match[1].padStart(3, '0') : null
}

let _problems: Problem[] | null = null

export function getAllProblems(): Problem[] {
  if (_problems) return _problems

  const problems: Problem[] = []

  if (!fs.existsSync(STUDY_GUIDES_DIR)) {
    console.warn('problems directory not found at', STUDY_GUIDES_DIR)
    return []
  }

  const entries = fs.readdirSync(STUDY_GUIDES_DIR, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const id = extractIdFromSlug(entry.name)
    if (!id) continue

    const dirPath = path.join(STUDY_GUIDES_DIR, entry.name)
    const files = fs.readdirSync(dirPath)

    const hasMentalModel = files.includes('mental-model.md')
    const hasStudyGuide = files.includes('study-guide.md')
    const hasSolution = files.includes('study-guide-solution.md')

    const problem: Problem = {
      id,
      title: TITLE_MAP[id] || entry.name.replace(/^\d+-/, '').replace(/-/g, ' '),
      patterns: PATTERN_MAP[id] || [],
      hasMentalModel,
      hasStudyGuide,
      hasSolution,
      slug: entry.name,
      files: {
        mentalModel: hasMentalModel ? path.join(dirPath, 'mental-model.md') : undefined,
        studyGuide: hasStudyGuide ? path.join(dirPath, 'study-guide.md') : undefined,
        solution: hasSolution ? path.join(dirPath, 'study-guide-solution.md') : undefined,
      },
    }

    problems.push(problem)
  }

  problems.sort((a, b) => parseInt(a.id) - parseInt(b.id))
  _problems = problems
  return problems
}

export function getProblemById(id: string): Problem | undefined {
  return getAllProblems().find(p => p.id === id)
}

export function getProblemsByPattern(patternId: string): Problem[] {
  return getAllProblems().filter(p => p.patterns.includes(patternId))
}

export function getAllPatternGroups(): PatternGroup[] {
  const problems = getAllProblems()
  const groups: PatternGroup[] = []

  for (const patternId of PATTERN_ORDER) {
    const meta = PATTERN_META[patternId]
    if (!meta) continue

    const patternProblems = problems.filter(p => p.patterns.includes(patternId))
    if (patternProblems.length === 0) continue

    const conceptPath = meta.conceptFile
      ? path.join(CONCEPTS_DIR, meta.conceptFile)
      : undefined

    groups.push({
      id: patternId,
      label: meta.label,
      description: meta.description,
      icon: meta.icon,
      conceptFile: conceptPath && fs.existsSync(conceptPath) ? conceptPath : undefined,
      problems: patternProblems,
    })
  }

  return groups
}

export function readMarkdownFile(filePath: string): { content: string; data: Record<string, unknown> } {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(raw)
  return { content, data }
}

export function getConceptContent(patternId: string): string | null {
  const meta = PATTERN_META[patternId]
  if (!meta?.conceptFile) return null
  const conceptPath = path.join(CONCEPTS_DIR, meta.conceptFile)
  if (!fs.existsSync(conceptPath)) return null
  const { content } = readMarkdownFile(conceptPath)
  return content
}
