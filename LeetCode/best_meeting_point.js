/**
 * @param {number[][]} grid
 * @return {number}
 */
var minTotalDistance = function(grid) {
  const people = getPeople(grid);

  return minDistance(grid, people.length, people);
};

const getKey = (row, col) => `${row}_${col}`;

const getNext = (row, col, grid, visited) => {
  return [
    { row: row + 1, col, visited },
    { row: row - 1, col, visited },
    { row, col: col + 1, visited },
    { row, col: col - 1, visited },
  ].filter(({ row, col }) => {
    const r = grid[row] || [];
    return Number.isInteger(r[col]) && !visited[getKey(row, col)];
  });
};

const createEntry = () => ({ cost: null, visitors: 0 });

const markInMap = (cost, key, map) => {
  if (!map[key]) map[key] = createEntry();
  
  const entry = map[key];
  console.log(`${'  '.repeat(cost)} coord: ${key} visitors: ${entry.visitors}`);
  entry.visitors++;

  entry.cost = entry.cost || 0;
  entry.cost += cost;
};

const hasMeet = (map, numPeople) => {
  return Object.values(map).find(({ visitors }) => visitors === numPeople);
};

const minDistance = (grid, numPeople, peeps, map = {}, cost = 0) => {
  if (hasMeet(map, numPeople)) {
    return Object.values(map).filter(location => location.visitors === numPeople).reduce((acc, curr) => Math.min(acc, curr.cost), Number.MAX_SAFE_INTEGER)
  }

  const next = [];

  for (let i = 0; i < peeps.length; i++) {
    const { row, col, visited } = peeps[i];

    if (visited[getKey(row, col)]) continue;

    visited[getKey(row, col)] = true;

    next.push(...getNext(row, col, grid, visited));

    markInMap(cost, getKey(row, col), map);
  }

  return minDistance(grid, numPeople, next, map, cost + 1);
};

const getPeople = grid => {
  const peeps = [];

  grid.forEach((r, row) =>
    r.forEach((c, col) => {
      if (c === 1) peeps.push({ row, col, visited: {} });
    })
  );

  return peeps;
};

const grid = [[1,0,0,0,1],[0,0,0,0,0],[0,0,1,0,0]];

console.log(minTotalDistance(grid));
