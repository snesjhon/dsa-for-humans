// =============================================================================
// Merge Sorted Array — Complete Solution
// =============================================================================
// Analogy: Two sorted filing drawers merged from the back into one.
// Drawer A (nums1) has m real files + n empty reserved slots.
// Drawer B (nums2) has n files.
// Three markers: lastA, lastB, slot — all start at the back.

function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let lastA = m - 1;    // Last-A marker: last real file in Drawer A
  let lastB = n - 1;    // Last-B marker: last file in Drawer B
  let slot = m + n - 1; // Slot marker: next position to fill (starts at the back)

  // While both drawers have files: place the larger one at slot, step back
  while (lastA >= 0 && lastB >= 0) {
    if (nums1[lastA] >= nums2[lastB]) {
      nums1[slot--] = nums1[lastA--]; // Drawer A file wins (or tie) — place and step back
    } else {
      nums1[slot--] = nums2[lastB--]; // Drawer B file wins — place and step back
    }
  }

  // Copy any remaining Drawer B files into the front of Drawer A
  // (remaining Drawer A files are already in their correct positions)
  while (lastB >= 0) {
    nums1[slot--] = nums2[lastB--];
  }
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

test('Interleaved values with tie', () => {
  const n1 = [1, 2, 3, 0, 0, 0];
  merge(n1, 3, [2, 5, 6], 3);
  return n1;
}, [1, 2, 2, 3, 5, 6]);

test('Drawer A all larger — A exhausts first, Drawer B has leftovers', () => {
  const n1 = [4, 5, 6, 0, 0, 0];
  merge(n1, 3, [1, 2, 3], 3);
  return n1;
}, [1, 2, 3, 4, 5, 6]);

test('Edge case: m=0, Drawer A empty', () => {
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
