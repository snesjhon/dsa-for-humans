// =============================================================================
// Merge Sorted Array — Step 1 of 2: Deal from the Back — SOLUTION
// =============================================================================
// Goal: Set up the three file markers (lastA, lastB, slot) and run the main
// comparison loop — while both drawers have files, place the larger one at slot,
// stepping both the used-drawer marker and slot backward.

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let lastA = m - 1;    // Last-A marker: back of Drawer A's real section
  let lastB = n - 1;    // Last-B marker: back of Drawer B
  let slot = m + n - 1; // Slot marker: fill from the back of Drawer A

  // While both drawers have files: compare and place the larger one at slot
  while (lastA >= 0 && lastB >= 0) {
    if (nums1[lastA] >= nums2[lastB]) {
      nums1[slot--] = nums1[lastA--]; // Drawer A's file is larger (or tied) — place it
    } else {
      nums1[slot--] = nums2[lastB--]; // Drawer B's file is larger — place it
    }
  }
  // Note: if Drawer B still has files after the loop, they'd need copying (Step 2).
  // These tests are chosen so Drawer B exhausts first — Step 2 not yet needed.
}

// Tests — all must print PASS
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
