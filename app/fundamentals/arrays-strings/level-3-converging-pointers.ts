// =============================================================================
// Level 3: Two-Pointer Convergence — Reading from Both Ends
// =============================================================================
// Before running: npx ts-node level-3-converging-pointers.ts
// Goal: Practice placing one pointer at each end and walking them inward.
//
// Unlike the write cursor (Level 2) where both pointers move forward,
// converging pointers face each other and stop when they meet or cross.

// -----------------------------------------------------------------------------
// Exercise 1
// Given a string s, return true if it is a palindrome after removing all
// non-alphanumeric characters and converting to lowercase.
// Use two pointers: one at the start, one at the end.
// Advance each pointer past non-alphanumeric characters before comparing.
//
// Example:
//   isPalindrome("A man, a plan, a canal: Panama") → true
//   isPalindrome("race a car")                     → false
//   isPalindrome(" ")                              → true
// -----------------------------------------------------------------------------
function isPalindrome(s: string): boolean {
  throw new Error("TODO");
}

test('isPalindrome("A man, a plan, a canal: Panama")', isPalindrome("A man, a plan, a canal: Panama"), true);
test('isPalindrome("race a car")', isPalindrome("race a car"), false);
test('isPalindrome(" ")', isPalindrome(" "), true);
test('isPalindrome("ab")', isPalindrome("ab"), false);
test('isPalindrome("a")', isPalindrome("a"), true);
test('isPalindrome("")', isPalindrome(""), true);

// -----------------------------------------------------------------------------
// Exercise 2
// Reverse only the vowels of a string. All other characters stay in place.
// Vowels are: a, e, i, o, u (upper and lower case).
// Use converging pointers: skip non-vowels on each side, then swap.
//
// Example:
//   reverseVowels("hello")  → "holle"
//   reverseVowels("leetcode") → "leotcede"
//   reverseVowels("aeiou")  → "uoiea"
// -----------------------------------------------------------------------------
function reverseVowels(s: string): string {
  throw new Error("TODO");
}

test('reverseVowels("hello")', reverseVowels("hello"), "holle");
test('reverseVowels("leetcode")', reverseVowels("leetcode"), "leotcede");
test('reverseVowels("aeiou")', reverseVowels("aeiou"), "uoiea");
test('reverseVowels("bcdfg")', reverseVowels("bcdfg"), "bcdfg");
test('reverseVowels("a")', reverseVowels("a"), "a");

// -----------------------------------------------------------------------------
// Exercise 3
// Given a sorted array of integers and a target sum, return the 1-based indices
// [i, j] of the two numbers that add up to target. Exactly one solution exists.
// Use converging pointers: if the sum is too small, advance left; too large, retreat right.
//
// This is Two Sum II (LeetCode 167). The sorted property is what makes two
// pointers work — moving left increases the sum, moving right decreases it.
//
// Example:
//   twoSumSorted([2, 7, 11, 15], 9)  → [1, 2]
//   twoSumSorted([2, 3, 4], 6)       → [1, 3]
//   twoSumSorted([-1, 0], -1)        → [1, 2]
// -----------------------------------------------------------------------------
function twoSumSorted(numbers: number[], target: number): number[] {
  throw new Error("TODO");
}

test("twoSumSorted [2,7,11,15] target 9", twoSumSorted([2, 7, 11, 15], 9), [1, 2]);
test("twoSumSorted [2,3,4] target 6", twoSumSorted([2, 3, 4], 6), [1, 3]);
test("twoSumSorted [-1,0] target -1", twoSumSorted([-1, 0], -1), [1, 2]);
test("twoSumSorted [1,2,3,4,5] target 9", twoSumSorted([1, 2, 3, 4, 5], 9), [4, 5]);
test("twoSumSorted negatives [-3,-1,0,2,4] target -1", twoSumSorted([-3, -1, 0, 2, 4], -1), [1, 3]);

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
