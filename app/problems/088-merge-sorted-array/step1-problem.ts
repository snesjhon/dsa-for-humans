// =============================================================================
// Merge Sorted Array — Step 1 of 2: Deal from the Back
// =============================================================================
// Goal: Set up the three file markers (lastA, lastB, slot) and run the main
// comparison loop — while both drawers have files, place the larger one at slot,
// stepping both the used-drawer marker and slot backward.
//
// Implement the TODO below, then run: npx tsx step1-problem.ts

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  // TODO: Set up lastA = m-1, lastB = n-1, slot = m+n-1.
  //       While lastA >= 0 AND lastB >= 0:
  //         compare nums1[lastA] vs nums2[lastB],
  //         place the larger at nums1[slot],
  //         step that drawer's marker and slot backward.
  throw new Error('not implemented');
}

// Tests
test('Drawer B all larger — B exhausts first', () => {
  const n1 = [1, 0];
  merge(n1, 1, [2], 1);
  return n1;
}, [1, 2]);

test('Both drawers size 3, Drawer B all larger', () => {
  const n1 = [1, 3, 5, 0, 0, 0];
  merge(n1, 3, [6, 7, 8], 3);
  return n1;
}, [1, 3, 5, 6, 7, 8]);

test('Interleaved values, Drawer B exhausts last', () => {
  const n1 = [1, 2, 3, 0, 0, 0];
  merge(n1, 3, [2, 5, 6], 3);
  return n1;
}, [1, 2, 2, 3, 5, 6]);

// ─── Helpers ──────────────────────────────────────────────────────────────────
// (auto-folded in the editor — must be present for the file to run)

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
    } else {
      throw e;
    }
  }
}
