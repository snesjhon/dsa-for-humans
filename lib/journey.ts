// Full DSA learning path: Novice → Studied → Expert
// Source: 00-complete-dsa-path.md
// Time references removed — path is organized by phases and steps only.

export interface JourneyProblem {
  id: string; // problem ID e.g. "027"
  isFirstPass: boolean;
}

export interface JourneySection {
  id: string; // slug e.g. "binary-trees"
  label: string; // "Binary Trees"
  patternIds: string[];
  mentalModelHook: string;
  analogies: string[];
  fundamentalsSlug?: string;
  fundamentalsBlurb?: string;
  firstPass: JourneyProblem[];
  reinforce: JourneyProblem[];
}

export interface Phase {
  number: number;
  label: string; // "Novice"
  emoji: string;
  goal: string;
  sections: JourneySection[];
}

export const JOURNEY: Phase[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 1: NOVICE
  // ─────────────────────────────────────────────────────────────────────────
  {
    number: 1,
    label: 'Novice',
    emoji: '🌱',
    goal: 'Build foundational problem-solving intuition with linear structures.',
    sections: [
      {
        id: 'arrays-strings',
        label: 'Arrays & Strings',
        patternIds: ['arrays', 'two-pointers'],
        mentalModelHook:
          'Think about in-place manipulation — how do you rewrite an array without extra space?',
        analogies: [
          'Two Messengers (prefix/suffix pass)',
          'Quality Control Line (two-pointer)',
        ],
        fundamentalsSlug: 'arrays-strings',
        fundamentalsBlurb:
          'Index manipulation, the write-cursor pattern, and converging two pointers — the three tools behind every array and string technique you will use throughout the path.',
        firstPass: [
          { id: '344', isFirstPass: true },
          { id: '026', isFirstPass: true },
          { id: '088', isFirstPass: true },
          { id: '125', isFirstPass: true },
        ],
        reinforce: [
          { id: '238', isFirstPass: false },
          { id: '271', isFirstPass: false },
        ],
      },
      {
        id: 'hash-maps',
        label: 'Hash Maps & Sets',
        patternIds: ['hash-map'],
        mentalModelHook:
          "Trading space for time — find what you need in O(1) by remembering what you've seen.",
        analogies: ['Checkpoint Journey (prefix sum + hash map)'],
        fundamentalsSlug: 'hash-maps',
        fundamentalsBlurb:
          'Frequency counting, complement lookups, and prefix sums stored in a map — the three tools that replace O(n²) scans with a single pass.',
        firstPass: [
          { id: '217', isFirstPass: true },
          { id: '387', isFirstPass: true },
          { id: '001', isFirstPass: true },
          { id: '242', isFirstPass: true },
        ],
        reinforce: [
          { id: '049', isFirstPass: false },
          { id: '128', isFirstPass: false },
          { id: '036', isFirstPass: false },
        ],
      },
      {
        id: 'two-pointers',
        label: 'Two Pointers',
        patternIds: ['two-pointers'],
        mentalModelHook:
          'Two pointers converge — eliminate the need for nested loops by moving inward together.',
        analogies: ['Quality Control Line (fast/slow pointer)'],
        firstPass: [
          { id: '027', isFirstPass: true },
          { id: '167', isFirstPass: true },
          { id: '011', isFirstPass: true },
        ],
        reinforce: [
          { id: '075', isFirstPass: false },
          { id: '015', isFirstPass: false },
          { id: '042', isFirstPass: false },
        ],
      },
      {
        id: 'sliding-window',
        label: 'Sliding Window',
        patternIds: ['sliding-window'],
        mentalModelHook:
          "Expand your window until it's invalid, then shrink from the left. The window remembers what you've seen.",
        analogies: [
          'Adjustable Magnifying Glass (min window)',
          'Fence Renovation (longest repeating)',
        ],
        firstPass: [
          { id: '121', isFirstPass: true },
          { id: '003', isFirstPass: true },
        ],
        reinforce: [
          { id: '567', isFirstPass: false },
          { id: '424', isFirstPass: false },
          { id: '076', isFirstPass: false },
          { id: '239', isFirstPass: false },
        ],
      },
      {
        id: 'linked-lists',
        label: 'Linked Lists',
        patternIds: ['linked-list'],
        mentalModelHook:
          'Pointer manipulation — you can restructure any linked list in-place if you can visualize the pointer dance.',
        analogies: [
          'Reverse Linked List II (with sentinel node)',
          'Hot Shelf (LRU Cache)',
        ],
        firstPass: [
          { id: '206', isFirstPass: true },
          { id: '021', isFirstPass: true },
          { id: '141', isFirstPass: true },
        ],
        reinforce: [
          { id: '287', isFirstPass: false },
          { id: '019', isFirstPass: false },
          { id: '092', isFirstPass: false },
          { id: '143', isFirstPass: false },
          { id: '002', isFirstPass: false },
          { id: '138', isFirstPass: false },
          { id: '146', isFirstPass: false },
          { id: '025', isFirstPass: false },
        ],
      },
      {
        id: 'stack-queue',
        label: 'Stack & Queue',
        patternIds: ['design'],
        mentalModelHook:
          'LIFO vs FIFO — when the order you process things determines correctness, reach for a stack or queue.',
        analogies: [
          'Stack of plates (LIFO)',
          'Ticket line (FIFO)',
          'Monotonic bouncer (daily temperatures)',
        ],
        firstPass: [
          { id: '232', isFirstPass: true },
          { id: '020', isFirstPass: true },
          { id: '155', isFirstPass: true },
          { id: '150', isFirstPass: true },
        ],
        reinforce: [
          { id: '739', isFirstPass: false },
          { id: '853', isFirstPass: false },
          { id: '084', isFirstPass: false },
        ],
      },
      {
        id: 'recursion-backtracking-intro',
        label: 'Recursion & Backtracking Intro',
        patternIds: ['backtracking'],
        mentalModelHook:
          'Trust the recursion. At each step, make a choice, explore, then undo it. The decision tree writes itself.',
        analogies: [
          'Mountain Climber (generate parentheses)',
          'Vending Machine (subsets)',
        ],
        firstPass: [
          { id: '509', isFirstPass: true },
          { id: '078', isFirstPass: true },
        ],
        reinforce: [{ id: '022', isFirstPass: false }],
      },
      {
        id: 'binary-search',
        label: 'Binary Search',
        patternIds: ['binary-search'],
        mentalModelHook:
          "Eliminate half the search space every step. You don't search — you shrink until only one answer remains.",
        analogies: [
          'Broken Bookshelf (rotated array)',
          'Thermostat Testing (koko)',
          '2D Matrix search',
        ],
        firstPass: [
          { id: '704', isFirstPass: true },
          { id: '035', isFirstPass: true },
          { id: '278', isFirstPass: true },
          { id: '374', isFirstPass: true },
        ],
        reinforce: [
          { id: '074', isFirstPass: false },
          { id: '069', isFirstPass: false },
          { id: '875', isFirstPass: false },
          { id: '153', isFirstPass: false },
          { id: '033', isFirstPass: false },
          { id: '034', isFirstPass: false },
          { id: '162', isFirstPass: false },
          { id: '981', isFirstPass: false },
          { id: '004', isFirstPass: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 2: STUDIED
  // ─────────────────────────────────────────────────────────────────────────
  {
    number: 2,
    label: 'Studied',
    emoji: '📚',
    goal: 'Master hierarchical structures and graph algorithms. Develop pattern recognition.',
    sections: [
      {
        id: 'binary-trees',
        label: 'Binary Trees',
        patternIds: ['trees'],
        mentalModelHook:
          'Every tree problem is a conversation between a node and its subtrees. Trust the recursion to handle the children.',
        analogies: [
          'File System Navigation (DFS/BFS)',
          'Depth counter',
          'Mirror reflection',
          'Diameter as hidden path through root',
        ],
        fundamentalsSlug: 'binary-trees',
        fundamentalsBlurb:
          'DFS vs BFS, recursive tree thinking, traversal patterns, and when to use each — before you write a single line of problem code.',
        firstPass: [
          { id: '226', isFirstPass: true },
          { id: '104', isFirstPass: true },
          { id: '100', isFirstPass: true },
          { id: '543', isFirstPass: true },
        ],
        reinforce: [
          { id: '110', isFirstPass: false },
          { id: '572', isFirstPass: false },
          { id: '102', isFirstPass: false },
          { id: '199', isFirstPass: false },
          { id: '1448', isFirstPass: false },
          { id: '236', isFirstPass: false },
          { id: '105', isFirstPass: false },
          { id: '124', isFirstPass: false },
          { id: '297', isFirstPass: false },
        ],
      },
      {
        id: 'binary-search-trees',
        label: 'Binary Search Trees',
        patternIds: ['trees', 'binary-search'],
        mentalModelHook:
          'The BST property gives you direction — at every node you know exactly which subtree to enter.',
        analogies: ['Navigation by comparison (insert into BST)'],
        fundamentalsSlug: 'bst',
        fundamentalsBlurb:
          'How the BST ordering property turns search into navigation, and why in-order traversal always gives sorted output.',
        firstPass: [
          { id: '701', isFirstPass: true },
          { id: '098', isFirstPass: true },
        ],
        reinforce: [
          { id: '230', isFirstPass: false },
          { id: '235', isFirstPass: false },
        ],
      },
      {
        id: 'heaps-priority-queues',
        label: 'Heaps & Priority Queues',
        patternIds: ['design'],
        mentalModelHook:
          'A heap always has the answer at the top — maintain sorted order dynamically without re-sorting everything.',
        analogies: [
          'Leaderboard (max heap)',
          'Waiting room by priority (min heap)',
        ],
        fundamentalsSlug: 'heaps-priority-queues',
        fundamentalsBlurb:
          'How heaps maintain the max/min in O(log n), and when to reach for a heap over sorting.',
        firstPass: [
          { id: '1046', isFirstPass: true },
          { id: '703', isFirstPass: true },
          { id: '215', isFirstPass: true },
        ],
        reinforce: [
          { id: '973', isFirstPass: false },
          { id: '347', isFirstPass: false },
          { id: '621', isFirstPass: false },
          { id: '355', isFirstPass: false },
          { id: '295', isFirstPass: false },
          { id: '023', isFirstPass: false },
        ],
      },
      {
        id: 'graphs',
        label: 'Graphs — Fundamentals',
        patternIds: ['graphs'],
        mentalModelHook:
          'Graph problems are about connected components. DFS from every unvisited node, marking as you go.',
        analogies: [
          'Island explorer (flood fill + count)',
          'City map with one-way streets',
        ],
        fundamentalsSlug: 'graphs',
        fundamentalsBlurb:
          'Graph representation (adjacency list vs matrix), directed vs undirected, and the core BFS/DFS template before applying it to problems.',
        firstPass: [
          { id: '200', isFirstPass: true },
          { id: '695', isFirstPass: true },
          { id: '133', isFirstPass: true },
        ],
        reinforce: [
          { id: '323', isFirstPass: false },
          { id: '261', isFirstPass: false },
        ],
      },
      {
        id: 'graph-traversal-dfs',
        label: 'Graph Traversal — DFS',
        patternIds: ['graphs'],
        mentalModelHook:
          "DFS is a commitment: go as deep as you can, mark your path, and only backtrack when you're stuck.",
        analogies: [
          'Maze explorer (go deep, backtrack)',
          'Cycle detection via coloring',
        ],
        fundamentalsSlug: 'graph-traversal-dfs',
        fundamentalsBlurb:
          'Cycle detection, topological ordering, and path-finding — the three things DFS unlocks that BFS cannot.',
        firstPass: [
          { id: '547', isFirstPass: true },
          { id: '797', isFirstPass: true },
          { id: '207', isFirstPass: true },
        ],
        reinforce: [
          { id: '130', isFirstPass: false },
          { id: '417', isFirstPass: false },
        ],
      },
      {
        id: 'graph-traversal-bfs',
        label: 'Graph Traversal — BFS',
        patternIds: ['graphs'],
        mentalModelHook:
          'BFS explores level by level — if you need the shortest path in an unweighted graph, BFS finds it first.',
        analogies: [
          'Ripple in a pond (level-by-level spread)',
          'Multi-source infection spread (rotting oranges)',
        ],
        firstPass: [
          { id: '1091', isFirstPass: true },
          { id: '994', isFirstPass: true },
          { id: '286', isFirstPass: true },
        ],
        reinforce: [{ id: '127', isFirstPass: false }],
      },
      {
        id: 'advanced-graphs',
        label: 'Advanced Graph Algorithms',
        patternIds: ['graphs'],
        mentalModelHook:
          'Topological sort orders dependencies. Union-Find groups components. Dijkstra finds the cheapest path.',
        analogies: [
          'Prerequisite chain (topo sort)',
          'Merging friend groups (union-find)',
          'GPS routing (Dijkstra)',
        ],
        firstPass: [
          { id: '210', isFirstPass: true },
          { id: '684', isFirstPass: true },
          { id: '743', isFirstPass: true },
        ],
        reinforce: [
          { id: '787', isFirstPass: false },
          { id: '332', isFirstPass: false },
          { id: '1584', isFirstPass: false },
          { id: '778', isFirstPass: false },
          { id: '269', isFirstPass: false },
        ],
      },
      {
        id: 'backtracking-deep',
        label: 'Backtracking Deep Dive',
        patternIds: ['backtracking'],
        mentalModelHook:
          'Now you add constraints. The mountain climber knows which paths lead nowhere and prunes them early.',
        analogies: [
          'Vending Machine (combination sum)',
          'Decision Tree (permutations)',
        ],
        firstPass: [
          { id: '077', isFirstPass: true },
          { id: '039', isFirstPass: true },
          { id: '046', isFirstPass: true },
        ],
        reinforce: [
          { id: '090', isFirstPass: false },
          { id: '040', isFirstPass: false },
          { id: '017', isFirstPass: false },
          { id: '079', isFirstPass: false },
          { id: '131', isFirstPass: false },
          { id: '051', isFirstPass: false },
          { id: '037', isFirstPass: false },
        ],
      },
      {
        id: 'dp-1d',
        label: 'Dynamic Programming — 1D',
        patternIds: ['dynamic-programming'],
        mentalModelHook:
          "Cache overlapping subproblems. If you've solved it before, don't solve it again — look it up.",
        analogies: [
          'Staircase choices (climbing stairs)',
          'Robber route planning (house robber)',
        ],
        firstPass: [
          { id: '070', isFirstPass: true },
          { id: '746', isFirstPass: true },
          { id: '198', isFirstPass: true },
        ],
        reinforce: [
          { id: '213', isFirstPass: false },
          { id: '005', isFirstPass: false },
          { id: '647', isFirstPass: false },
          { id: '091', isFirstPass: false },
          { id: '322', isFirstPass: false },
          { id: '152', isFirstPass: false },
          { id: '139', isFirstPass: false },
          { id: '300', isFirstPass: false },
          { id: '416', isFirstPass: false },
        ],
      },
      {
        id: 'dp-2d',
        label: 'Dynamic Programming — 2D',
        patternIds: ['dynamic-programming'],
        mentalModelHook:
          'Two-dimensional state: the answer at grid[i][j] depends on previously computed cells. Build bottom-up.',
        analogies: [
          'Path counting on a grid (unique paths)',
          'Common story between two sequences (LCS)',
        ],
        firstPass: [
          { id: '062', isFirstPass: true },
          { id: '1143', isFirstPass: true },
          { id: '518', isFirstPass: true },
        ],
        reinforce: [
          { id: '309', isFirstPass: false },
          { id: '494', isFirstPass: false },
          { id: '097', isFirstPass: false },
          { id: '329', isFirstPass: false },
          { id: '115', isFirstPass: false },
          { id: '072', isFirstPass: false },
          { id: '312', isFirstPass: false },
          { id: '010', isFirstPass: false },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 3: EXPERT
  // ─────────────────────────────────────────────────────────────────────────
  {
    number: 3,
    label: 'Expert',
    emoji: '🎯',
    goal: 'Combine techniques, optimize solutions, and tackle hard problems with confidence.',
    sections: [
      {
        id: 'greedy',
        label: 'Greedy Algorithms',
        patternIds: ['greedy'],
        mentalModelHook:
          'Make the locally optimal choice at every step. When the greedy choice is provably safe, you never need to look back.',
        analogies: [
          'Jumping as far as possible (jump game)',
          'Gas station route planning',
        ],
        firstPass: [
          { id: '053', isFirstPass: true },
          { id: '055', isFirstPass: true },
          { id: '045', isFirstPass: true },
        ],
        reinforce: [
          { id: '134', isFirstPass: false },
          { id: '846', isFirstPass: false },
          { id: '1899', isFirstPass: false },
          { id: '763', isFirstPass: false },
          { id: '678', isFirstPass: false },
        ],
      },
      {
        id: 'intervals',
        label: 'Intervals',
        patternIds: ['greedy'],
        mentalModelHook:
          'Sort by start time. Then decide: does this interval overlap with the last? Merge, skip, or insert.',
        analogies: [
          'Meeting room booking (overlap detection)',
          'Road repair crew scheduling',
        ],
        firstPass: [
          { id: '252', isFirstPass: true },
          { id: '056', isFirstPass: true },
          { id: '057', isFirstPass: true },
        ],
        reinforce: [
          { id: '435', isFirstPass: false },
          { id: '253', isFirstPass: false },
          { id: '1851', isFirstPass: false },
        ],
      },
      {
        id: 'tries',
        label: 'Tries',
        patternIds: ['design', 'trees'],
        mentalModelHook:
          'A trie is a tree where each path spells a word. Share prefixes, branch at differences.',
        analogies: [
          'Dictionary indexed by first letter, then second, then third',
        ],
        firstPass: [
          { id: '208', isFirstPass: true },
          { id: '211', isFirstPass: true },
        ],
        reinforce: [{ id: '212', isFirstPass: false }],
      },
      {
        id: 'math-geometry',
        label: 'Math & Geometry',
        patternIds: ['arrays'],
        mentalModelHook:
          'Matrix problems reward in-place thinking. Identify the transformation pattern before touching any cell.',
        analogies: ['Rotating a grid layer by layer', 'Spiral unwinding'],
        firstPass: [
          { id: '066', isFirstPass: true },
          { id: '202', isFirstPass: true },
          { id: '048', isFirstPass: true },
        ],
        reinforce: [
          { id: '054', isFirstPass: false },
          { id: '073', isFirstPass: false },
          { id: '050', isFirstPass: false },
          { id: '043', isFirstPass: false },
          { id: '2013', isFirstPass: false },
        ],
      },
      {
        id: 'bit-manipulation',
        label: 'Bit Manipulation',
        patternIds: ['arrays'],
        mentalModelHook:
          'XOR cancels duplicates. AND masks bits. Shift multiplies or divides by two. Think in binary.',
        analogies: [
          'Pairs cancel out (XOR)',
          'Counting set bits one at a time',
        ],
        firstPass: [
          { id: '136', isFirstPass: true },
          { id: '191', isFirstPass: true },
          { id: '338', isFirstPass: true },
        ],
        reinforce: [
          { id: '190', isFirstPass: false },
          { id: '268', isFirstPass: false },
          { id: '007', isFirstPass: false },
          { id: '371', isFirstPass: false },
        ],
      },
    ],
  },
];

export function getSectionById(sectionId: string): JourneySection | undefined {
  for (const phase of JOURNEY) {
    const section = phase.sections.find((s) => s.id === sectionId);
    if (section) return section;
  }
  return undefined;
}

export function getPhaseForSection(sectionId: string): Phase | undefined {
  return JOURNEY.find((phase) =>
    phase.sections.some((s) => s.id === sectionId),
  );
}

export function getAllSectionIds(): string[] {
  return JOURNEY.flatMap((phase) => phase.sections.map((s) => s.id));
}

export function getSectionsForProblem(problemId: string): JourneySection[] {
  const result: JourneySection[] = [];
  for (const phase of JOURNEY) {
    for (const section of phase.sections) {
      const allIds = [
        ...section.firstPass.map((p) => p.id),
        ...section.reinforce.map((p) => p.id),
      ];
      if (allIds.includes(problemId)) result.push(section);
    }
  }
  return result;
}
