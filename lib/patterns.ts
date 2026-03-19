export const PATTERN_META: Record<string, { label: string; description: string; icon: string; conceptFile?: string }> = {
  'hash-map': {
    label: 'Hash Maps',
    description: 'Turn O(n²) lookups into O(1) by trading space for time — find complements instantly.',
    icon: '🗺️',
    conceptFile: 'hash-maps.md',
  },
  'sliding-window': {
    label: 'Sliding Window',
    description: 'Maintain a moving subarray with two pointers — expand to include, shrink to optimize.',
    icon: '🪟',
    conceptFile: 'flexible-sliding-window.md',
  },
  'two-pointers': {
    label: 'Two Pointers',
    description: 'Start from both ends and meet in the middle — eliminates the need for nested loops.',
    icon: '👆',
    conceptFile: 'two-pointers.md',
  },
  'binary-search': {
    label: 'Binary Search',
    description: 'Eliminate half the search space every step — turn O(n) into O(log n).',
    icon: '🔍',
    conceptFile: 'algorithm-paradigms.md',
  },
  'trees': {
    label: 'Trees',
    description: 'Recursive structure — every subtree is itself a tree. DFS unlocks the whole shape.',
    icon: '🌳',
    conceptFile: 'trees.md',
  },
  'graphs': {
    label: 'Graphs',
    description: 'BFS/DFS to explore connected components — islands, paths, and dependencies.',
    icon: '🕸️',
    conceptFile: 'dfs.md',
  },
  'backtracking': {
    label: 'Backtracking',
    description: 'Explore every path, prune dead ends — the mountain climber that retreats and retries.',
    icon: '🏔️',
    conceptFile: 'backtracking.md',
  },
  'monotonic-stack': {
    label: 'Monotonic Stack',
    description: 'Maintain an always-sorted stack — instantly find the next greater/smaller element.',
    icon: '📚',
    conceptFile: 'monotonic.md',
  },
  'dynamic-programming': {
    label: 'Dynamic Programming',
    description: 'Cache overlapping subproblems — solve complex problems by building from simple bases.',
    icon: '🧩',
    conceptFile: 'algorithm-paradigms.md',
  },
  'greedy': {
    label: 'Greedy',
    description: 'Make the locally optimal choice at each step — often leads to the global optimum.',
    icon: '💰',
    conceptFile: 'greedy-approach.md',
  },
  'arrays': {
    label: 'Arrays',
    description: 'In-place manipulation, prefix sums, and index tricks for linear-time solutions.',
    icon: '📋',
  },
  'linked-list': {
    label: 'Linked Lists',
    description: 'Pointer manipulation and the runner technique for in-place restructuring.',
    icon: '🔗',
  },
  'design': {
    label: 'Design',
    description: 'Combine data structures to meet time/space constraints for system components.',
    icon: '⚙️',
  },
}

export const PATTERN_ORDER = [
  'hash-map',
  'sliding-window',
  'two-pointers',
  'binary-search',
  'trees',
  'graphs',
  'backtracking',
  'monotonic-stack',
  'dynamic-programming',
  'greedy',
  'arrays',
  'linked-list',
  'design',
]
