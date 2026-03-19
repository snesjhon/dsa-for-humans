// =============================================================================
// Remove Duplicates from Sorted Array — Step 1 of 1: The Two-Hand Sweep — SOLUTION
// =============================================================================
// Goal: Writing hand (k) starts at slot 1. Reading hand (i) scans from slot 1.
//       When nums[i] !== nums[k-1] (new title), write nums[k] = nums[i] and k++.
//       Return k — the number of unique titles in the clean section.

function removeDuplicates(nums: number[]): number {
  let k = 1; // writing hand: slot 0 is already the first unique book

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k - 1]) {
      // new title — place it in the clean section and advance writing hand
      nums[k] = nums[i]; // writing hand places the book at its current slot
      k++;               // writing hand advances to the next available slot
    }
    // duplicate: only reading hand moves (implicit in for loop)
  }

  return k; // number of unique titles in the clean section
}

// Tests — all must print PASS
test('single element', () => removeDuplicates([1]), 1);
test('[1,1,2] returns k=2', () => removeDuplicates([1, 1, 2]), 2);
test('[1,1,2] modifies array correctly', () => {
  const nums = [1, 1, 2];
  const k = removeDuplicates(nums);
  return nums.slice(0, k);
}, [1, 2]);
test('all duplicates returns k=1', () => removeDuplicates([5, 5, 5, 5]), 1);
test('no duplicates', () => {
  const nums = [1, 2, 3];
  const k = removeDuplicates(nums);
  return nums.slice(0, k);
}, [1, 2, 3]);
test('[0,0,1,1,1,2,2,3,3,4] returns k=5', () => removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]), 5);
test('[0,0,1,1,1,2,2,3,3,4] modifies array', () => {
  const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  const k = removeDuplicates(nums);
  return nums.slice(0, k);
}, [0, 1, 2, 3, 4]);

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
