// =============================================================================
// Arrays & Strings — Level 2, Exercise 3: Two Sum (Sorted)
// =============================================================================
// Goal: Use two converging pointers on a sorted array to find a target pair.
//
// Given a sorted array and a target sum, return the 1-based indices of the
// two numbers that add up to target. Exactly one solution is guaranteed.
// Do not use a hash map — use two converging pointers.
//
// Example:
//   twoSumSorted([2, 7, 11, 15], 9) → [1, 2]
//   twoSumSorted([2, 3, 4], 6)      → [1, 3]
//   twoSumSorted([-1, 0], -1)       → [1, 2]
// =============================================================================
function twoSumSorted(nums: number[], target: number): [number, number] {
  throw new Error('not implemented');
}

test('basic',          () => twoSumSorted([2, 7, 11, 15], 9),  [1, 2]);
test('middle pair',    () => twoSumSorted([2, 3, 4], 6),        [1, 3]);
test('negatives',      () => twoSumSorted([-1, 0], -1),         [1, 2]);
test('last two',       () => twoSumSorted([1, 2, 3, 4], 7),     [3, 4]);
test('first and last', () => twoSumSorted([1, 5, 6, 10], 11),   [1, 4]);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function test(desc: string, fn: () => unknown, expected: unknown): void {
  try {
    const actual = fn();
    const pass = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(`${pass ? 'PASS' : 'FAIL'} ${desc}`);
    if (!pass) {
      console.log(`  expected: ${JSON.stringify(expected)}`);
      console.log(`  received: ${JSON.stringify(actual)}`);
    }
  } catch (e) {
    if (e instanceof Error && e.message === 'not implemented') {
      console.log(`TODO  ${desc}`);
    } else { throw e; }
  }
}
