// =============================================================================
// Arrays & Strings — Level 1, Exercise 1: Stamp the Keepers — SOLUTION
// =============================================================================
// Goal: Practice the most direct form of the scanner + stamper.
//
// The scanner (r) reads every slot. The stamper (w) only advances when
// the scanner finds a positive value — it writes the keeper into slot w,
// then bumps w forward by one. Everything else is skipped off the belt.
// =============================================================================
function keepPositives(nums: number[]): number {
  let w = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] > 0) {
      nums[w] = nums[r];
      w++;
    }
  }
  return w;
}

test('mixed signs',     () => keepPositives([-1, 3, 0, 2, -4, 5]),  3);
test('none positive',   () => keepPositives([0, -1, -2]),            0);
test('all positive',    () => keepPositives([1, 2, 3]),              3);
test('empty belt',      () => keepPositives([]),                     0);
test('single positive', () => keepPositives([4]),                    1);
test('single zero',     () => keepPositives([0]),                    0);

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
