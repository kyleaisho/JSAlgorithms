/**
 *
 * This is another one where leetcode runs out of memory for recursion
 */

/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function(startTime, endTime, profit) {
  const jobs = createJobs(startTime, endTime, profit);

  return getMaxProfit(jobs, 0, {});
};

const getKey = ({ start, end, profit }) => start + '_' + end + '_' + profit;

function getMaxProfit(jobs, lastEnd, memo) {
  if (jobs.length === 0) return 0;

  // Get the next job which starts after the next one end
  const idx = jobs.findIndex(({ start }) => start >= lastEnd);
  // If there are no more jobs then return 0
  if (!jobs[idx]) return 0;

  const job = jobs[idx];
  const key = getKey(job);

  if (!memo[key]) {
    const { start, end, profit } = job;
    const filteredJobs = jobs.filter((_, i) => i !== idx);

    const withJ = profit + getMaxProfit(filteredJobs, end, memo);
    const withoutJ = getMaxProfit(filteredJobs, lastEnd, memo);

    memo[key] = Math.max(withJ, withoutJ);
  }

  return memo[key];
}

const createJobs = (startTime, endTime, profit) => {
  return startTime.map((start, i) => ({ start, end: endTime[i], profit: profit[i] })).sort((a, b) => a.start - b.start);
};
