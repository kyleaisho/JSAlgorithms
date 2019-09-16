const coins = [25, 10, 5, 1];

function getKey(n, arr) {
  return `${n}_${arr.join('-')}`;
}

function getNum(n, coinsToTest = coins, memo = {}) {
  // console.log(`${'  '.repeat(4 - coinsToTest.length)} ${Object.keys(memo)}`);
  const key = getKey(n, coinsToTest);
  if (memo[key] !== undefined) {
    return memo[key];
  }

  if (n < 0) {
    return 0;
  }
  if (n < 5) {
    return 1;
  }
  if (coinsToTest.length === 1 && coinsToTest[0] === 1) {
    return 1;
  }

  memo[key] = coinsToTest.reduce((acc, curr, idx) => {
    return acc + getNum(n - curr, coinsToTest.slice(idx), memo);
  }, 0);

  return memo[key];
}

console.log(getNum(259000));
