/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n, memo = {}) {
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(i);
  }

  return _numTrees(n, {});
};

const _numTrees = function(n, memo) {
  console.log(`${'  '.repeat(n - 3)}_numTrees(${n}, ${memo})`);
  let result = 0;

  function helper(num, idx) {
    const leftNumbers = idx - 1;
    const rightNumbers = num - idx;

    memo[leftNumbers] = memo[leftNumbers] || _numTrees(leftNumbers, memo);
    memo[rightNumbers] = memo[rightNumbers] || _numTrees(rightNumbers, memo);

    result += memo[leftNumbers] * memo[rightNumbers];
  }

  for (let i = 0; i < n; i++) {
    helper(i);
  }

  return result;
};

console.log(numTrees(3));
