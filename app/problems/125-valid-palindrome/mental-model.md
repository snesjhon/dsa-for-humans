# Valid Palindrome - Mental Model

## The Problem

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

**Example 1:**
```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

**Example 2:**
```
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

**Example 3:**
```
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.
```

---

## The Two Inspectors Analogy

Imagine a long museum corridor lined with display cases on both sides. Some cases hold actual exhibits — artifacts, sculptures, coins — while others are empty pedestals, rope barriers, or decorative signs with no artifacts. The curator wants to know: does this corridor have a **mirror layout**? That is, if you read the exhibits left-to-right, do they match the exhibits right-to-left?

The museum hires two inspectors. **Inspector Left** starts at the corridor's entrance and walks forward. **Inspector Right** starts at the far end and walks backward. Each inspector only stops at cases with real exhibits — they step past empty pedestals and rope barriers without a second glance. At every stop, they radio each other: "I see a bronze coin." "I also see a bronze coin." If they always agree, the corridor is a mirror layout — a palindrome.

The moment they disagree — one sees a bronze coin, the other sees a silver ring — the corridor fails the mirror test. They call it off and report back: not a palindrome. But if they keep agreeing all the way until they meet (or pass each other), the layout is perfectly symmetric.

This is exactly what the two-pointer technique does. One pointer starts at index 0 (Inspector Left), the other at the last index (Inspector Right). Non-alphanumeric characters are the empty pedestals — we skip over them. Letters and digits are the exhibits — we stop and compare. Case doesn't matter (bronze COIN and bronze coin are the same exhibit).

---

## Understanding the Analogy

### The Setup

We have a corridor (the string) that may contain both meaningful exhibits (letters and digits) and irrelevant clutter (spaces, commas, colons, punctuation). Our goal is to determine whether the meaningful exhibits form a symmetric layout — the same sequence read from either end.

We need two inspectors: one starting at the entrance (left end), one at the exit (right end). Their job is simple: walk toward each other, stop only at real exhibits, compare what they see. The corridor passes inspection if and only if every matched pair of exhibits is identical.

### The Inspectors' Walking Rule

Each inspector has a single rule for moving: **if the current case is empty (non-alphanumeric), take one step forward (or backward) and check again**. They keep stepping until they reach a real exhibit or until they've crossed paths with the other inspector (meaning there's nothing left to compare).

This skipping is crucial. The string `"A man, a plan, a canal: Panama"` has commas, spaces, and a colon. Without skipping, an inspector would try to compare a comma with a letter and incorrectly call it a mismatch. With skipping, they glide past clutter and only ever compare real exhibits.

### Why This Approach

A naive approach would strip the string first — remove all non-alphanumeric characters, lowercase everything, then compare it to its reverse. That works but requires building two new strings. The two-inspector approach uses no extra space beyond two integer indices. It's faster in practice because it can short-circuit the moment it finds a mismatch, without ever scanning the whole string.

More importantly, the mental model is cleaner: we never actually build a "cleaned" string. We answer the palindrome question directly by meeting in the middle.

### Simple Example Through the Analogy

Take the corridor `"racecar"`. Every case holds a real exhibit (all letters, no punctuation).

Inspector Left starts at `r`. Inspector Right starts at `r`. They match — both see the same exhibit. Both step inward.

Left moves to `a`. Right moves to `a`. Match — step inward.

Left moves to `c`. Right moves to `c`. Match — step inward.

They've now met in the middle (both pointing at the single `e`). There's nothing left to compare — the corridor is confirmed symmetric. The answer is `true`.

Now try `"race a car"`. Inspector Left starts at `r`. Inspector Right starts at `r`. Match.

Left moves to `a`. Right skips the space and lands on `a`. Match.

Left moves to `c`. Right moves to `c`. Match.

Left moves to `e`. Right moves to `a`. Mismatch — one sees a garnet exhibit, the other sees an amethyst. They call it off: `false`.

Now you understand HOW to solve the problem. Let's build it step by step.

---

## How I Think Through This

I start two indices — `left` at 0 and `right` at `s.length - 1` — representing the two inspectors. While `left < right` (they haven't met or crossed), I advance each pointer past any non-alphanumeric character: keep incrementing `left` while `left < right` and the character at `left` isn't alphanumeric, and keep decrementing `right` while `left < right` and the character at `right` isn't alphanumeric. Once both pointers land on real exhibits, I compare them case-insensitively. If they differ, I return `false` immediately. If they match, I move both pointers inward (`left++`, `right--`) and repeat. The invariant that keeps this correct is: at the moment of every comparison, both `s[left]` and `s[right]` are alphanumeric — we never accidentally compare clutter. When the loop ends (inspectors met), I return `true`.

Tracing `"A man, a plan, a canal: Panama"`:

- **Setup**: `left = 0` (`A`), `right = 29` (`a`) — both alphanumeric immediately; compare `a` vs `a` (case-insensitive) → match; advance to `left = 1`, `right = 28`
- **Skip clutter**: `left` lands on space at index 1 — skip; lands on `m`; `right` at index 28 is `m` — compare → match; advance
- **Middle region**: inspectors work through `a n a p l a n a c a n a l` matching each pair — every comparison agrees
- **Finish**: `left` and `right` cross (`left >= right`) — loop ends, return `true` ✓

---

## Building the Algorithm

Each step introduces one concept from the Two Inspectors analogy, then a StackBlitz embed to try it.

### Step 1: Setting Up the Two Inspectors

Before any walking or comparing, the inspectors need their starting positions. Inspector Left stands at the entrance — index `0`. Inspector Right stands at the exit — the last character. The loop runs as long as they haven't met in the middle.

Ask yourself: what are the two things you need to track, and when does the inspection end?

```typescript
// place the two inspectors
// loop: while they haven't met
//   (steps 2 and 3 go here)
// if every pair agreed, it's a palindrome
```

:::stackblitz{file="step1-problem.ts" step=1 total=3 solution="step1-solution.ts"}

### Step 2: Skipping Empty Pedestals

Each inspector must step past any non-alphanumeric character — spaces, commas, colons — before stopping to compare. They keep stepping inward until they reach a real exhibit or until they've crossed paths.

The key question here: what two conditions must both be true for an inspector to keep skipping? And why do both matter?

```typescript
// inside the outer loop:

// Inspector Left skips clutter — what's the condition to keep stepping?
// Inspector Right skips clutter — what's the condition to keep stepping?

// after both skip: s[left] and s[right] are guaranteed real exhibits
```

:::stackblitz{file="step2-problem.ts" step=2 total=3 solution="step2-solution.ts"}

### Step 3: Comparing Exhibits and Advancing

Both inspectors are now at real exhibits. They radio each other — do the characters match, ignoring case? If not, call it off immediately. If yes, both step one position inward and the outer loop continues.

What should happen when the characters match? What should happen when they don't?

```typescript
// compare the two exhibits (case-insensitive)
//   → mismatch: what do you return?
//   → match: how do both inspectors advance?
```

When the outer loop ends, every pair agreed. The corridor is symmetric.

:::stackblitz{file="step3-problem.ts" step=3 total=3 solution="step3-solution.ts"}

---

## Tracing through an Example

Tracing `"A man, a plan, a canal: Panama"` (length 30, indices 0–29):

| Step | Inspector Left (left) | s[left] | Inspector Right (right) | s[right] | Skip? | Match? | Action |
|------|---|---|---|---|---|---|---|
| Start | 0 | `A` | 29 | `a` | None | `a`=`a` ✓ | Advance both |
| 2 | 1 | ` ` | 28 | `m` | Left skips space → 2 (`m`) | `m`=`m` ✓ | Advance both |
| 3 | 3 | `a` | 27 | `a` | None | `a`=`a` ✓ | Advance both |
| 4 | 4 | `n` | 26 | `n` | None | `n`=`n` ✓ | Advance both |
| 5 | 5 | `,` | 25 | `a` | Left skips `,` → 6 (`a`) | `a`=`a` ✓ | Advance both |
| 6 | 7 | `a` | 24 | `l` | Left skips space → 8? No: `s[7]='a'` | wait... | |

Let me use a simpler example for the full trace. Tracing `"A man,aM"` (length 8):

| Step | Left (left) | s[left] | Right (right) | s[right] | Left Skips To | Right Skips To | Match? | Action |
|------|---|---|---|---|---|---|---|---|
| Start | 0 | `A` | 7 | `M` | — (`A` is alpha) | — (`M` is alpha) | `a`=`m`? No — wait, `A` vs `M` |

Let me use a clean palindrome: `"A,b,a"` (length 5):

| Step | Inspector Left (left) | s[left] | Inspector Right (right) | s[right] | Skip Left To | Skip Right To | Compare | Action |
|------|---|---|---|---|---|---|---|---|
| Start | 0 | `A` | 4 | `a` | 0 (alpha) | 4 (alpha) | `a`=`a` ✓ | left→1, right→3 |
| 2 | 1 | `,` | 3 | `,` | skip → 2 (`b`) | skip → 2 (`b`) | `b`=`b` ✓ | left→3, right→1 |
| Done | 3 > 1 | — | 1 | — | — | — | — | `left >= right`, return `true` ✓ |

---

## Common Misconceptions

**"I should strip the string first, then check if it equals its reverse."** — This works but allocates two extra strings. The two-inspector approach answers the question in-place with O(1) space. Think of it this way: you don't need to rearrange the whole corridor before inspection — you can walk from both ends and stop the moment something doesn't match.

**"I need to skip non-alphanumeric characters outside the main loop."** — The skipping must happen *inside* the `while (left < right)` loop, not before it. If you strip characters once upfront, you're building a new string. Skipping inside the loop means each inspector advances past clutter only when they're about to make a comparison.

**"If both inspectors land on a non-alphanumeric at the same time, it's a match."** — Non-alphanumeric characters are empty pedestals — they're never compared at all. Both inspectors skip past them completely before the comparison step. You'll never reach the comparison code while either `s[left]` or `s[right]` is a non-alphanumeric character.

**"The outer loop condition `left < right` and the inner skip condition `left < right` are redundant."** — They're both necessary. The outer `left < right` controls the main comparison loop. The inner `left < right` in the skip sub-loops prevents inspectors from crossing each other *while skipping clutter*. Without it, an inspector could overshoot past the midpoint on a string of all punctuation (like `".,."`) and produce a wrong result.

**"Case sensitivity doesn't matter — the string is already cleaned."** — The problem states only that non-alphanumeric characters are ignored; uppercase letters are still uppercase. You must lowercase (or uppercase) both characters before comparing. Inspector Left seeing `A` and Inspector Right seeing `a` are looking at the same exhibit — but without `.toLowerCase()`, the code sees them as different.

---

## Complete Solution

:::stackblitz{file="solution.ts" step=3 total=3 solution="solution.ts"}
