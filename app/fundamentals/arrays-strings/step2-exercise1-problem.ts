// =============================================================================
// Arrays & Strings — Level 2, Exercise 1: Reverse Array
// =============================================================================
// Goal: Use two converging pointers to reverse an array in-place.
//
// Reverse the array in-place. No return value — modify arr directly.
//
// Example:
//   const a = [1, 2, 3, 4, 5]; reverseArray(a) → a is now [5, 4, 3, 2, 1]
//   const b = [1, 2];           reverseArray(b) → b is now [2, 1]
// =============================================================================
function reverseArray(arr: number[]): void {
  throw new Error('not implemented');
}

test('odd-length',  () => { const a = [1,2,3,4,5]; reverseArray(a); return a; }, [5,4,3,2,1]);
test('even-length', () => { const b = [1,2];        reverseArray(b); return b; }, [2,1]);
test('single',      () => { const c = [7];           reverseArray(c); return c; }, [7]);
test('empty',       () => { const d: number[] = [];  reverseArray(d); return d; }, []);
test('all same',    () => { const e = [3,3,3];       reverseArray(e); return e; }, [3,3,3]);
test('two same',    () => { const f = [5,5];          reverseArray(f); return f; }, [5,5]);

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
