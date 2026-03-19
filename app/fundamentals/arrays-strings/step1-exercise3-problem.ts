// =============================================================================
// Arrays & Strings — Level 1, Exercise 3: Compact Evens
// =============================================================================
// Goal: Apply the write cursor with a custom keep condition.
//
// Compact an array so that all even numbers appear first, in their original
// relative order. Odd numbers are discarded.
// Return the count of even numbers placed.
//
// Example:
//   compactEvens([1, 2, 3, 4, 5, 6]) → 3   (array becomes [2, 4, 6, ...])
//   compactEvens([1, 3, 5])          → 0   (no evens)
// =============================================================================
function compactEvens(nums: number[]): number {
  throw new Error('not implemented');
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
