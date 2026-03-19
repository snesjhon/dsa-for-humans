// =============================================================================
// Arrays & Strings — Level 1, Exercise 1: Remove Duplicates
// =============================================================================
// Goal: Use the write cursor to compact a sorted array in-place.
//
// Remove duplicates from a sorted array in-place.
// The array is sorted, so duplicates are always adjacent.
// Keep the first occurrence of each value; overwrite the rest.
// Return the number of unique elements.
//
// Example:
//   removeDuplicates([1, 1, 2])          → 2   (array becomes [1, 2, ...])
//   removeDuplicates([0, 0, 1, 1, 1, 2]) → 3   (array becomes [0, 1, 2, ...])
// =============================================================================
function removeDuplicates(nums: number[]): number {
  throw new Error('not implemented');
}

test('empty array',     () => removeDuplicates([]),              0);
test('no duplicates',   () => removeDuplicates([1, 2, 3]),       3);
test('all duplicates',  () => removeDuplicates([2, 2, 2, 2]),    1);
test('two groups',      () => removeDuplicates([1, 1, 2]),       2);
test('longer mixed',    () => removeDuplicates([0,0,1,1,1,2,2]), 3);
test('single element',  () => removeDuplicates([7]),             1);

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
