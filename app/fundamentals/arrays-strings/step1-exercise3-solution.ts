// =============================================================================
// Arrays & Strings — Level 1, Exercise 3: Compact Evens — SOLUTION
// =============================================================================
function compactEvens(nums: number[]): number {
  let w = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] % 2 === 0) {
      nums[w] = nums[r];
      w++;
    }
  }
  return w;
}

test('mixed',        () => compactEvens([1, 2, 3, 4, 5, 6]), 3);
test('no evens',     () => compactEvens([1, 3, 5]),           0);
test('all evens',    () => compactEvens([2, 4, 6]),           3);
test('empty',        () => compactEvens([]),                  0);
test('single even',  () => compactEvens([2]),                 1);
test('single odd',   () => compactEvens([1]),                 0);

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
