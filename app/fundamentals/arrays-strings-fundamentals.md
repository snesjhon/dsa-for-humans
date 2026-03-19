## 1. Overview

Arrays and strings are the bedrock of every coding interview. Nearly every problem — even trees, graphs, and dynamic programming — eventually reduces to operating on a sequence of values by index.

What makes array problems deceptively hard is that the most obvious approach (nested loops, building a new array) is rarely what's expected. The goal is almost always to do it *in-place* in a single pass with O(1) extra space.

This guide covers the three index-based tools that unlock all of that: **the write cursor**, **two converging pointers**, and **prefix/suffix passes**. By the end, you'll recognize which tool a problem is asking for before you write a single line of code.

---

## 2. Core Concept & Mental Model

### The Assembly Line Analogy

Picture a factory assembly line. A **conveyor belt** carries items from left to right — that's your array. There are two key roles:

- A **scanner** (read pointer) moves steadily from left to right, inspecting every item without exception.
- A **stamper** (write cursor) sits near the front and only advances when it places a valid item.

When you need to compact or filter, the scanner looks at everything, but the stamper only places keepers. The gap between them represents eliminated slots.

For problems that check symmetry or search a sorted sequence, you deploy **two inspectors**: one starts at the left end, one at the right, and they walk toward each other. Each step eliminates a position from further consideration — which is what makes this O(n) instead of O(n²).

For problems where each position needs context from both sides — "what's the product of everything *except* this element?" — you send a **left messenger** walking forward collecting prefix information, then a **right messenger** walking backward collecting suffix information. Each position gets its answer from what both messengers gathered on their respective sides.

### Understanding the Analogy

#### The Setup

The conveyor belt stretches from index 0 to index n-1. Each slot holds one item — a number or a character. You cannot add more slots or create a second belt (no extra space). Your only tools are: where you're reading from, where you're writing to, and what you've accumulated so far.

#### The Three Roles on the Line

The **scanner and stamper** (write cursor) work as a pair on the same belt moving forward. The scanner looks at every item. The stamper only places keepers. The gap between them grows as more items are eliminated — that gap is the "graveyard" of discarded slots, which you can safely overwrite.

The **two converging inspectors** start at opposite ends and walk toward each other. They exploit the structure of the belt — sorted order, or the symmetry property of palindromes — to eliminate one slot per step. No item they've already judged needs to be revisited.

The **two messengers** make separate trips. The first walks left-to-right, recording what it accumulates before each slot. The second walks right-to-left, recording what it accumulates after each slot. Each slot collects both messengers' notes and combines them — this is how you answer "what about everything *except* me?" without rescanning.

#### Why These Approaches

All three exploit the fact that arrays are indexed. You never need to look at an element twice if you move your pointers correctly. The write cursor's output is always a *prefix* of the input — which means it fits in-place. Converging pointers eliminate half the problem each time they both move. Two-pass prefix/suffix flips an O(n²) inside-out look into two forward scans.

#### A Simple Example

The line is `[3, 2, 2, 1, 2, 4]` and you want to remove all `2`s. The scanner walks forward. Each time it finds a non-2, the stamper places it and advances one slot. When the scanner reaches the end, the stamper has only advanced three times — slots 0, 1, 2 now hold `[3, 1, 4]`. The rest of the belt doesn't matter.

Now you understand the tools. Let's build them step by step.

---

### How I Think Through This

When I see an array or string problem, the first question I ask is: *am I being asked to modify the array in-place, or am I computing something about it?* If in-place, I reach for the write cursor — `r` scans everything, `w` only advances on keepers, and `w` at the end is both the count and the boundary. If the array is sorted or I need to check symmetry end-to-end, two converging pointers from L=0 and R=n-1 let me eliminate one position per step without any extra space. If each position needs to know about everything to its left *and* its right simultaneously, I do a forward pass to build prefix values into the output array, then a backward pass to multiply in suffix values. The key signal for the last pattern is "except self" or "combining left and right context."

Take `[1, 2, 3, 4]`, find product except self: I can't divide (what if there's a zero?), so I send both messengers. Forward: result becomes `[1, 1, 2, 6]` — each slot now holds the product of everything to its left. Backward: I multiply in suffix values, right-to-left, `suffix` starts at 1. After position 3: `6 * 1 = 6`, suffix becomes 4. After position 2: `2 * 4 = 8`, suffix becomes 12. After position 1: `1 * 12 = 12`, suffix becomes 24. After position 0: `1 * 24 = 24`. Result: `[24, 12, 8, 6]` ✓

---

## 3. Building Blocks — Progressive Learning

### Level 1: The Write Cursor

**Why this level matters**

The most common array constraint is "do it in-place with O(1) extra space." That means you cannot build a new filtered array — you must rewrite the original. The write cursor is the pattern that makes this possible. Without it, you instinctively reach for a second array or a nested loop. With it, nearly any filter-and-compact problem becomes a single forward pass.

**How to think about it**

You maintain two positions in the same array: `r` (the reader, scanning every element) and `w` (the writer, tracking where the next valid element should land). The reader always advances. The writer only advances when it places something.

Think of `w` as pointing to the next blank slot in your output. When the scanner finds a keeper, it stamps it into slot `w` and bumps `w` forward by one. Non-keepers are skipped — the reader moves on but the writer stays put, ready to overwrite that slot the next time a keeper arrives.

When the reader finishes, the first `w` positions of the array hold exactly the valid elements. Everything after index `w` is irrelevant — the problem only cares about the first `w` positions.

**Walking through it**

Remove all `2`s from `[3, 2, 2, 1, 2, 4]`. Expected: first 3 elements are `[3, 1, 4]`, return length `3`.

```
Start: r=0, w=0  →  [3, 2, 2, 1, 2, 4]

r=0: nums[0]=3 (keep) → stamp into w=0, w becomes 1
     [3, 2, 2, 1, 2, 4]   r=1, w=1

r=1: nums[1]=2 (skip)
     [3, 2, 2, 1, 2, 4]   r=2, w=1

r=2: nums[2]=2 (skip)
     [3, 2, 2, 1, 2, 4]   r=3, w=1

r=3: nums[3]=1 (keep) → stamp into w=1, w becomes 2
     [3, 1, 2, 1, 2, 4]   r=4, w=2

r=4: nums[4]=2 (skip)
     [3, 1, 2, 1, 2, 4]   r=5, w=2

r=5: nums[5]=4 (keep) → stamp into w=2, w becomes 3
     [3, 1, 4, 1, 2, 4]   r=6, w=3

Done: return w=3 → nums[0..2] = [3, 1, 4] ✓
```

**The one thing to get right**

`w` is simultaneously "the index to write to" and "the count of valid elements placed so far." If you increment `w` before writing, you skip slot 0 and your count is off by one. If you write without incrementing, you overwrite the same slot forever. Always: write first, then increment.

**Code**

```typescript
function removeElement(nums: number[], val: number): number {
  let w = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] !== val) {
      nums[w] = nums[r];
      w++;
    }
  }
  return w;
}
```

:::stackblitz{step=1 total=3 exercises="step1-exercise1-problem.ts,step1-exercise2-problem.ts,step1-exercise3-problem.ts" solutions="step1-exercise1-solution.ts,step1-exercise2-solution.ts,step1-exercise3-solution.ts"}

> **Mental anchor**: The write cursor says "I only advance when I place something real." The read pointer says "I look at everything." The gap between them is the graveyard.

**→ Bridge to Level 2**

The write cursor moves in one direction with one active pointer. But many problems need to reason about both ends of the array simultaneously — that's when two converging pointers replace the single read pointer.

---

### Level 2: Two Converging Pointers

**Why this level matters**

Problems involving symmetry ("is this a palindrome?") or a sorted structure ("find two numbers that sum to target") appear impossible to solve in less than O(n²) until you notice that starting from both ends and moving inward eliminates one element per step. That insight drops the work to O(n) — without any extra memory.

**How to think about it**

Place `L` at index 0 and `R` at index `n-1`. At each step, look at the pair `(arr[L], arr[R])`. Based on what you find, advance one (or both) pointers inward. The critical question is: which pointer moves, and when?

- For a **palindrome check**: if `s[L] !== s[R]` you already know it's not a palindrome and can stop. If they match, both pointers move inward. Either way, you make progress.
- For a **sorted two-sum**: if the sum of the pair is too small, moving `L` right increases the sum (because the array is sorted and larger values are to the right). If the sum is too large, move `R` left. If it matches, you're done.

Each move **eliminates an entire position** from consideration. After at most `n` total moves, the two pointers meet — the loop ends.

**Walking through it**

Check if `"racecar"` is a palindrome.

```
s = ['r','a','c','e','c','a','r']
     L=0                   R=6

Step 1: s[0]='r' === s[6]='r' → match, move both inward
     L=1               R=5

Step 2: s[1]='a' === s[5]='a' → match, move both inward
     L=2           R=4

Step 3: s[2]='c' === s[4]='c' → match, move both inward
     L=3       R=3

Step 4: L >= R → stop. Every pair matched.

Result: palindrome ✓
```

Check if `"hello"` is a palindrome.

```
s = ['h','e','l','l','o']
     L=0               R=4

Step 1: s[0]='h' !== s[4]='o' → mismatch, return false immediately

Result: not a palindrome ✓
```

**The one thing to get right**

The loop condition is `L < R`, not `L <= R`. When `L === R`, you are looking at the middle character of an odd-length string. It always matches itself — there is nothing to check. Checking it with `L <= R` is harmless but if your logic tries to advance past a single-character middle it can skip elements.

**Code**

```typescript
function isPalindrome(s: string): boolean {
  let L = 0, R = s.length - 1;
  while (L < R) {
    if (s[L] !== s[R]) return false;
    L++;
    R--;
  }
  return true;
}
```

:::stackblitz{step=2 total=3 exercises="step2-exercise1-problem.ts,step2-exercise2-problem.ts,step2-exercise3-problem.ts" solutions="step2-exercise1-solution.ts,step2-exercise2-solution.ts,step2-exercise3-solution.ts"}

> **Mental anchor**: Two pointers converge by eliminating one position per step. They always meet in O(n) — no matter how the array is structured.

**→ Bridge to Level 3**

Both the write cursor and two pointers work with information available *at the current position*. But some problems need context about everything to the left and everything to the right of each position simultaneously — and that context can't be gathered in a single pass. Prefix and suffix passes solve this.

---

### Level 3: Prefix & Suffix Passes

**Why this level matters**

Some problems ask: "at each position, combine everything before it with everything after it." The naive solution is O(n²) — scan left and right for each element. Prefix and suffix passes reduce this to O(n): compute the left side in one forward pass, the right side in one backward pass. Each position gets its answer by combining the two.

**How to think about it**

Send two messengers across the array:

1. **Left messenger** walks left-to-right. Before reaching position `i`, it has accumulated information from all elements to the left. It records that information and moves on.
2. **Right messenger** walks right-to-left. Before reaching position `i`, it has accumulated information from all elements to the right. It multiplies that in.

Each position ends up with the combined result from both messengers — without ever re-scanning.

The canonical example is "product of array except self." You can't divide the total product by `nums[i]` because it might be zero. Instead:

- Forward pass: `result[i]` = product of all elements *before* position `i`. Start with `prefix = 1`.
- Backward pass: multiply `result[i]` by the product of all elements *after* position `i`. Maintain a running `suffix` variable as you scan right-to-left.

No extra array needed — the output array accumulates both passes in-place.

**Walking through it**

`nums = [1, 2, 3, 4]`. Expected output: `[24, 12, 8, 6]`.

```
Forward pass (prefix product = everything to the LEFT of i):

  i=0: result[0] = prefix = 1          prefix becomes 1 * 1 = 1
  i=1: result[1] = prefix = 1          prefix becomes 1 * 2 = 2
  i=2: result[2] = prefix = 2          prefix becomes 2 * 3 = 6
  i=3: result[3] = prefix = 6          prefix becomes 6 * 4 = 24

  result = [1, 1, 2, 6]

Backward pass (multiply by suffix = everything to the RIGHT of i):

  i=3: result[3] *= suffix=1 → 6*1=6   suffix becomes 1 * 4 = 4
  i=2: result[2] *= suffix=4 → 2*4=8   suffix becomes 4 * 3 = 12
  i=1: result[1] *= suffix=12 → 1*12=12 suffix becomes 12 * 2 = 24
  i=0: result[0] *= suffix=24 → 1*24=24 suffix becomes 24 * 1 = 24

  result = [24, 12, 8, 6] ✓
```

**The one thing to get right**

`prefix` at position `i` covers elements *strictly before* `i`, not including `i` itself. So `prefix` starts at `1` (the multiplicative identity), and you update it *after* recording `result[i]`. Getting this order reversed includes `nums[i]` in its own product — corrupting every answer.

**Code**

```typescript
function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}
```

:::stackblitz{step=3 total=3 exercises="step3-exercise1-problem.ts,step3-exercise2-problem.ts,step3-exercise3-problem.ts" solutions="step3-exercise1-solution.ts,step3-exercise2-solution.ts,step3-exercise3-solution.ts"}

> **Mental anchor**: Prefix tells each position what came before. Suffix tells it what comes after. Together they answer in two O(n) passes what a nested loop would answer in O(n²).

---

## 4. Key Patterns

### Pattern: In-Place Compaction with Write Cursor

**When to use**: the problem says "in-place," "O(1) extra space," "remove elements," or "compress array." You're asked to modify the array and return the new length (not a new array).

**How to think about it**: the output is a *prefix* of the input array. You're deciding which elements belong in that prefix. The write cursor marks the boundary between "placed" and "not yet placed."

**Code**

```typescript
function removeDuplicates(nums: number[]): number {
  let w = 1;
  for (let r = 1; r < nums.length; r++) {
    if (nums[r] !== nums[r - 1]) {
      nums[w] = nums[r];
      w++;
    }
  }
  return nums.length === 0 ? 0 : w;
}
```

**Complexity**: Time O(n), Space O(1)

---

### Pattern: Prefix Sum for Range Queries

**When to use**: the problem involves summing or querying subarrays repeatedly, or asks for counts/sums over ranges. The key signal is "sum of elements between index i and j."

**How to think about it**: compute `prefix[i]` = sum of `nums[0..i-1]` once up front. Then any range sum `[L, R]` = `prefix[R+1] - prefix[L]` in O(1). The upfront O(n) cost pays off when you have many queries.

**Code**

```typescript
function buildPrefix(nums: number[]): number[] {
  const prefix = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }
  return prefix;
}

function rangeSum(prefix: number[], L: number, R: number): number {
  return prefix[R + 1] - prefix[L];
}
```

**Complexity**: Build O(n), Query O(1), Space O(n)

---

## 5. Decision Framework

### Concept Map

```mermaid
graph TD
    AS[Arrays and Strings] --> IP[In-Place Manipulation]
    AS --> Idx[Index Navigation]
    AS --> Str[Strings as Char Arrays]
    IP --> WC[Write Cursor]
    IP --> TP[Two Converging Pointers]
    IP --> PS[Prefix and Suffix Passes]
    WC --> WC1[Read pointer sees everything]
    WC --> WC2[Write cursor advances on keepers only]
    TP --> TP1[L starts at 0, R starts at end]
    TP --> TP2[One pointer moves per step — O of n total]
    PS --> PS1[Forward pass collects left context]
    PS --> PS2[Backward pass collects right context]
    Str --> S1[Indexed char sequence]
    Str --> S2[Two pointers check symmetry]
```

### Key Operations

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| Access by index | O(1) | — | The core advantage of arrays |
| Write cursor compact | O(n) | O(1) | One read pass, one write head |
| Two-pointer scan | O(n) | O(1) | Each pointer moves at most n steps total |
| Build prefix array | O(n) | O(n) | Separate array stores cumulative values |
| Prefix + suffix in-place | O(n) | O(1) extra | Two passes, reuse output array |

### When to use which

```mermaid
graph TD
    Q[Array or String problem] --> Q1{Filter or compact in-place?}
    Q1 -->|Yes| WC[Write Cursor]
    Q1 -->|No| Q2{Sorted array or check symmetry?}
    Q2 -->|Yes| TP[Two Converging Pointers]
    Q2 -->|No| Q3{Each position needs both-sides context?}
    Q3 -->|Yes| PS[Prefix and Suffix Passes]
    Q3 -->|No| Q4{Range sum or running total queries?}
    Q4 -->|Yes| PR[Prefix Sum Array]
    Q4 -->|No| NA[Consider Sliding Window or Hash Map]
```

**Recognition signals**

| Problem keywords | Technique |
|------------------|-----------|
| "in-place", "O(1) space", "remove/filter elements" | Write cursor |
| "palindrome", "two sum in sorted array", "reverse" | Two converging pointers |
| "product/sum except self", "context from both sides" | Prefix + suffix passes |
| "subarray sum", "range query", "count subarrays with sum k" | Prefix sum + hash map |

**When NOT to use two pointers from both ends**: when the array is unsorted and you need to find a pair sum. Two pointers only work because a sorted array guarantees that moving `L` right increases the sum and moving `R` left decreases it. Without that guarantee, use a hash set instead.

---

## 6. Common Gotchas & Edge Cases

**"I'll write first, then increment `w`" — except you incremented first.**
It's easy to write `w++; nums[w] = nums[r]` instead of `nums[w] = nums[r]; w++`. The first version skips slot 0 and produces an off-by-one count. Always write to `w` *before* advancing it.

**Loop condition `L <= R` for two pointers.**
When `L === R`, you're examining the middle of an odd-length array. The element always matches itself. If your logic is `if s[L] !== s[R] return false`, this is harmless. But if you decrement `R` and increment `L` past each other, you'll miss or double-count. Use `L < R` and stop cleanly.

**Prefix[i] includes `nums[i]` — off by one.**
If `prefix[i]` = sum of `nums[0..i]` (including `i`), then `prefix[R] - prefix[L]` gives the sum of `nums[L+1..R]`, not `nums[L..R]`. The standard convention is `prefix[i]` = sum of `nums[0..i-1]` so that `prefix[R+1] - prefix[L]` = sum of `nums[L..R]`. Decide your convention up front and be consistent.

**Forgetting to handle the empty array.**
`removeDuplicates([])` — if `w` starts at 1 and the array is empty, you return 1 instead of 0. Always check edge cases: empty input, single element, all duplicates, all different.

**Modifying the array while reading it with a separate index.**
In the write cursor pattern this is intentional — but if `w === r` you're overwriting the element you just read. This is fine because `nums[w] = nums[r]` when `w === r` is a no-op (you're writing the value to itself).

**Edge cases to always check**:
- Empty array `[]`
- Single-element array `[1]`
- All elements identical `[2, 2, 2, 2]`
- Already sorted / already valid
- Negative numbers in prefix sums (the pattern still works — don't assume positive)

**Debugging tips**: print `(r, w, nums.slice(0, w))` at each iteration of a write cursor. For two pointers, print `(L, R, s[L], s[R])`. For prefix passes, print the `result` array after the forward pass and again after the backward pass.

