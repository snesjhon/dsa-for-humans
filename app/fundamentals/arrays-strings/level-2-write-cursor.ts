// =============================================================================
// Level 2: The Write Cursor — In-Place Compaction
// =============================================================================
// Before running: npx ts-node level-2-write-cursor.ts
// Goal: Practice the read + write pointer pattern for in-place array compaction.
//
// Key idea: the read head scans every element; the write head (k) only advances
// when it places a value that belongs. Return k — the length of the result.

// -----------------------------------------------------------------------------
// Exercise 1
// Given an integer array nums, remove all occurrences of val in place.
// Return k, the count of elements that are NOT val.
// The first k elements of nums should hold the answer; the rest don't matter.
//
// Example:
//   removeElement([3, 2, 2, 3], 3)    → 2  (nums becomes [2, 2, ...])
//   removeElement([0, 1, 2, 2, 3], 2) → 3  (nums becomes [0, 1, 3, ...])
// -----------------------------------------------------------------------------
function removeElement(nums: number[], val: number): number {
  throw new Error("TODO");
}

test("removes 3 from [3,2,2,3]", removeElement([3, 2, 2, 3], 3), 2);
test("removes 2 from [0,1,2,2,3]", removeElement([0, 1, 2, 2, 3], 2), 3);
test("val not present", removeElement([1, 2, 3], 9), 3);
test("all elements equal val", removeElement([5, 5, 5], 5), 0);
test("single element kept", removeElement([1], 2), 1);
test("single element removed", removeElement([1], 1), 0);

// -----------------------------------------------------------------------------
// Exercise 2
// Given a sorted array nums, remove duplicates in place so that each unique
// value appears exactly once. Return k — the number of unique elements.
// The first k elements of nums should be the unique values in order.
//
// Compare nums[read] with nums[k-1] (the last written value) — not with
// nums[read-1].
//
// Example:
//   removeDuplicates([1, 1, 2])              → 2  (nums becomes [1, 2, ...])
//   removeDuplicates([0, 0, 1, 1, 1, 2, 2]) → 3  (nums becomes [0, 1, 2, ...])
// -----------------------------------------------------------------------------
function removeDuplicates(nums: number[]): number {
  throw new Error("TODO");
}

test("dedup [1,1,2]", removeDuplicates([1, 1, 2]), 2);
test("dedup [0,0,1,1,1,2,2]", removeDuplicates([0, 0, 1, 1, 1, 2, 2]), 3);
test("all same value", removeDuplicates([3, 3, 3, 3]), 1);
test("already unique", removeDuplicates([1, 2, 3]), 3);
test("single element", removeDuplicates([7]), 1);

// -----------------------------------------------------------------------------
// Exercise 3
// Given two sorted arrays nums1 (with extra space at the end) and nums2,
// merge nums2 into nums1 in place so that nums1 holds the sorted result.
// m = count of valid elements in nums1, n = count of elements in nums2.
//
// Write from the BACK of nums1 — this avoids overwriting unread values.
// Start both read pointers at the last valid element and the write pointer
// at the very last slot (m + n - 1).
//
// Example:
//   merge([1,2,3,0,0,0], 3, [2,5,6], 3) → nums1 becomes [1,2,2,3,5,6]
//   merge([1], 1, [], 0)                 → nums1 becomes [1]
// -----------------------------------------------------------------------------
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  throw new Error("TODO");
}

{
  const a = [1, 2, 3, 0, 0, 0];
  merge(a, 3, [2, 5, 6], 3);
  test("merge [1,2,3] and [2,5,6]", a, [1, 2, 2, 3, 5, 6]);
}
{
  const a = [1];
  merge(a, 1, [], 0);
  test("merge with empty nums2", a, [1]);
}
{
  const a = [0];
  merge(a, 0, [1], 1);
  test("merge empty nums1 with [1]", a, [1]);
}
{
  const a = [4, 5, 6, 0, 0, 0];
  merge(a, 3, [1, 2, 3], 3);
  test("nums2 all smaller than nums1", a, [1, 2, 3, 4, 5, 6]);
}

// =============================================================================
// Tests — all should print PASS
// =============================================================================

function test(desc: string, actual: unknown, expected: unknown): void {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${pass ? "PASS" : "FAIL"} ${desc}`);
  if (!pass) {
    console.log(`  expected: ${JSON.stringify(expected)}`);
    console.log(`  received: ${JSON.stringify(actual)}`);
  }
}
