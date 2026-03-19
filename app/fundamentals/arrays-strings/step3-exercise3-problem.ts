// =============================================================================
// Arrays & Strings — Level 3, Exercise 3: Product Except Self
// =============================================================================
// Goal: Use prefix and suffix products to build the output without division.
//
// Return an array output where output[i] is the product of every element
// in nums except nums[i]. You may not use division.
// Hint: compute a prefix product array and a suffix product array, then
// combine them.
//
// Example:
//   productExceptSelf([1, 2, 3, 4]) → [24, 12, 8, 6]
//   productExceptSelf([2, 3])       → [3, 2]
// =============================================================================
function productExceptSelf(nums: number[]): number[] {
  throw new Error('not implemented');
}

test('basic four',    () => productExceptSelf([1, 2, 3, 4]),    [24, 12, 8, 6]);
test('two elements',  () => productExceptSelf([2, 3]),           [3, 2]);
test('with zero',     () => productExceptSelf([1, 0, 3, 4]),    [0, 12, 0, 0]);
test('two zeros',     () => productExceptSelf([0, 0]),           [0, 0]);
test('with negative', () => productExceptSelf([-1, 2, -3, 4]), [-24, 12, -8, 6]);
test('all ones',      () => productExceptSelf([1, 1, 1]),        [1, 1, 1]);

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
