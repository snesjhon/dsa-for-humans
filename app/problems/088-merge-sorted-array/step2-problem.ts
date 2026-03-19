// =============================================================================
// Merge Sorted Array — Step 2 of 2: File the Remaining Drawer B Documents
// =============================================================================
// Goal: After the main loop ends, if Drawer B still has files (lastB >= 0),
// copy them into the front slots of Drawer A. Drawer A's remaining files
// (if any) are already in their correct positions — no action needed.
//
// Prior step is complete and locked inside the function body.
// Implement the TODO below, then run: npx tsx step2-problem.ts

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  // ✓ Step 1: Three-marker comparison loop — deal from the back (locked)
  let lastA = m - 1;
  let lastB = n - 1;
  let slot = m + n - 1;

  while (lastA >= 0 && lastB >= 0) {
    if (nums1[lastA] >= nums2[lastB]) {
      nums1[slot--] = nums1[lastA--];
    } else {
      nums1[slot--] = nums2[lastB--];
    }
  }

  // TODO: Copy any remaining Drawer B files into the front of Drawer A.
  //       (Hint: while lastB >= 0, place nums2[lastB] at nums1[slot],
  //        stepping both markers backward.)
  throw new Error('not implemented');
}

// Tests
test('Drawer B all larger — B exhausts first (no copy needed)', () => {
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

test('Drawer A all larger — A exhausts first, Drawer B has leftovers', () => {
  const n1 = [4, 5, 6, 0, 0, 0];
  merge(n1, 3, [1, 2, 3], 3);
  return n1;
}, [1, 2, 3, 4, 5, 6]);

test('Edge case: m=0, Drawer A empty — all files come from Drawer B', () => {
  const n1 = [0];
  merge(n1, 0, [1], 1);
  return n1;
}, [1]);

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
