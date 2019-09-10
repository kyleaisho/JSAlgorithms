const coins = [25, 10, 5, 1];

function getNum(n, coinsToTest = coins) {
  if (n < 0) {
    return 0;
  }
  if (n < 5) {
    return 1;
  }

  return coinsToTest.reduce((acc, curr, idx) => {
    return acc + getNum(n - curr, coinsToTest.slice(idx));
  }, 0);
}

console.log(getNum(25));
