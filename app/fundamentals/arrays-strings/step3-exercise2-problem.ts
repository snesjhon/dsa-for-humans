// =============================================================================
// Arrays & Strings — Level 3, Exercise 2: Range Sum
// =============================================================================
// Goal: Use a prefix sum array to answer range queries in O(1).
//
// Return the sum of nums[left..right] (inclusive, 0-based).
// Build a prefix array first, then compute the answer in O(1).
//
// Example:
//   rangeSum([1, 2, 3, 4], 1, 3) → 9   (2 + 3 + 4)
//   rangeSum([1, 2, 3, 4], 0, 0) → 1   (just nums[0])
// =============================================================================
function rangeSum(nums: number[], left: number, right: number): number {
  throw new Error('not implemented');
}

test('full range',      () => rangeSum([1, 2, 3, 4], 0, 3), 10);
test('partial range',   () => rangeSum([1, 2, 3, 4], 1, 3),  9);
test('single element',  () => rangeSum([1, 2, 3, 4], 2, 2),  3);
test('first element',   () => rangeSum([1, 2, 3, 4], 0, 0),  1);
test('with negatives',  () => rangeSum([-1, 2, -3, 4], 1, 3), 3);
test('single-elem arr', () => rangeSum([7], 0, 0),            7);

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
