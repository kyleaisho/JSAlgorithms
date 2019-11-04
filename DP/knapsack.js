// Bottom up solution
const solveKnapsack = (profits, weights, capacity) => {
  const dp = new Array(profits.length);

  for (let i = 0; i < profits.length; i++) {
    dp[i] = new Array(capacity + 1).fill(0);
  }

  for (let i = 0; i <= capacity; i++) {
    dp[0][i] = weights[0] > i ? 0 : weights[0];
  }

  for (let i = 1; i < dp.length; i++) {
    const cap = dp[i];
    for (let capacity = 1; capacity < cap.length; capacity++) {
      const weight = weights[i];

      if (weight > capacity) {
        // if the current weight doesn't fit, then
        // the max profit is the previous value
        dp[i][capacity] = dp[i - 1][capacity];
      } else {
        const prev = dp[i - 1][capacity - 1];
        const curr = profits[i] + dp[i - 1][capacity - weight];

        dp[i][capacity] = Math.max(prev, curr);
      }
    }
  }

  return dp[profits.length - 1][capacity];
};

var profits = [1, 6, 10, 16];
var weights = [1, 2, 3, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);
