// =============================================================================
// Level 1: Index Manipulation & Linear Iteration
// =============================================================================
// Before running: npx ts-node level-1-index-manipulation.ts
// Goal: Practice controlling array indices directly — forward, backward, and both ends.

// -----------------------------------------------------------------------------
// Exercise 1
// Reverse an array of numbers in place and return it.
// Use two pointers starting at each end and swap while left < right.
//
// Example:
//   reverseArray([1, 2, 3, 4, 5]) → [5, 4, 3, 2, 1]
//   reverseArray([1, 2])          → [2, 1]
// -----------------------------------------------------------------------------
function reverseArray(arr: number[]): number[] {
  throw new Error("TODO");
}

test("reverses five elements", reverseArray([1, 2, 3, 4, 5]), [5, 4, 3, 2, 1]);
test("reverses two elements", reverseArray([1, 2]), [2, 1]);
test("reverses odd-length (middle unchanged)", reverseArray([1, 2, 3]), [3, 2, 1]);
test("single element stays the same", reverseArray([42]), [42]);
test("empty array stays empty", reverseArray([]), []);

// -----------------------------------------------------------------------------
// Exercise 2
// Rotate an array to the right by k steps, in place.
// Each element moves k positions to the right; elements that fall off the end
// wrap around to the front.
//
// Hint: reverse the whole array, then reverse the first k elements,
//       then reverse the remaining n-k elements.
//
// Example:
//   rotateRight([1, 2, 3, 4, 5, 6, 7], 3) → [5, 6, 7, 1, 2, 3, 4]
//   rotateRight([1, 2, 3], 1)             → [3, 1, 2]
// -----------------------------------------------------------------------------
function rotateRight(nums: number[], k: number): number[] {
  throw new Error("TODO");
}

test("rotates 7 elements by 3", rotateRight([1, 2, 3, 4, 5, 6, 7], 3), [5, 6, 7, 1, 2, 3, 4]);
test("rotates 3 elements by 1", rotateRight([1, 2, 3], 1), [3, 1, 2]);
test("k equals length is a no-op", rotateRight([1, 2, 3], 3), [1, 2, 3]);
test("k larger than length wraps", rotateRight([1, 2, 3], 4), [3, 1, 2]);
test("single element unchanged", rotateRight([99], 5), [99]);

// -----------------------------------------------------------------------------
// Exercise 3
// Given an integer array nums sorted in ascending order, return the index of
// the first occurrence of target, or -1 if not found.
// Use a manual for loop with an explicit index variable (not indexOf).
//
// Then: find the LAST occurrence of target (scan from the right).
//
// Example:
//   firstIndex([1, 2, 2, 3, 4], 2)  → 1
//   lastIndex([1, 2, 2, 3, 4], 2)   → 2
//   firstIndex([1, 2, 3], 5)        → -1
// -----------------------------------------------------------------------------
function firstIndex(nums: number[], target: number): number {
  throw new Error("TODO");
}

function lastIndex(nums: number[], target: number): number {
  throw new Error("TODO");
}

test("first index of 2 in [1,2,2,3,4]", firstIndex([1, 2, 2, 3, 4], 2), 1);
test("last index of 2 in [1,2,2,3,4]", lastIndex([1, 2, 2, 3, 4], 2), 2);
test("not found returns -1", firstIndex([1, 2, 3], 5), -1);
test("last not found returns -1", lastIndex([1, 2, 3], 5), -1);
test("single element found", firstIndex([7], 7), 0);
test("single element not found", lastIndex([7], 8), -1);

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
