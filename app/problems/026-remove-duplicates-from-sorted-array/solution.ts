// =============================================================================
// Remove Duplicates from Sorted Array — Complete Solution
// =============================================================================
// The Librarian's Shelf: two hands (writing + reading) compact a sorted array
// so only one copy of each title remains in the left section.

function removeDuplicates(nums: number[]): number {
  let k = 1; // writing hand: starts at slot 1 (slot 0 is always unique)

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k - 1]) {
      // new title found — place it at the writing hand's current slot
      nums[k] = nums[i]; // writing hand places the book
      k++;               // writing hand advances to the next available slot
    }
    // duplicate: reading hand moves on (implicit in for loop), writing hand stays
  }

  return k; // number of unique titles in the clean section
}

// Tests — all must print PASS
test('single element', () => removeDuplicates([1]), 1);
test('two unique values', () => removeDuplicates([1, 2]), 2);
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
test('two elements same', () => removeDuplicates([3, 3]), 1);
test('two elements different', () => {
  const nums = [1, 2];
  const k = removeDuplicates(nums);
  return nums.slice(0, k);
}, [1, 2]);

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
