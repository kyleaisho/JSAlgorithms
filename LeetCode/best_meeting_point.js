/**
 * @param {number[][]} grid
 * @return {number}
 */
var minTotalDistance = function(grid) {
  const people = getPeople(grid);

  return minDistance(grid, people.length, people);
};

const getKey = (row, col) => `${row}_${col}`;

const getNext = (row, col, grid) => {
  return [
    { row: row + 1, col },
    { row: row - 1, col },
    { row, col: col + 1 },
    { row, col: col - 1 },
    { row: row + 1, col: col + 1 },
    { row: row - 1, col: col + 1 },
    { row: row + 1, col: col - 1 },
    { row: row - 1, col: col - 1 }
  ].filter(({ row, col }) => {
    const r = grid[row] || [];
    return Number.isInteger(r[col]);
  });
};

const createEntry = () => ({ cost: null, visitors: 0 });

const markInMap = (cost, key, map) => {
  if (!map[key]) map[key] = createEntry();

  const entry = map[key];
  entry.visitors++;

  entry.cost = entry.cost || 0;
  entry.cost += cost;
};

const hasMeet = (map, numPeople) => {
  return Object.values(map).find(({ visitors }) => visitors === numPeople);
};

const minDistance = (grid, numPeople, peeps, map = {}, cost = 0) => {
  if (hasMeet(map, numPeople)) {
    return Object.values(map).reduce((acc, curr) => Math.min(acc, curr), Number.INFINITY);
  }

  const next = [];

  for (let i = 0; i < peeps.length; i++) {
    const { row, col } = peeps[i];
    next.push(...getNext(row, col, grid));

    markInMap(cost, getKey(row, col), map);
  }

  return minDistance(grid, numPeople, next, map, cost + 1);
};

const getPeople = grid => {
  const peeps = [];

  grid.forEach((r, row) =>
    r.forEach((c, col) => {
      if (c === 1) peeps.push({ row, col });
    })
  );

  return peeps;
};

const grid = [[1, 0, 0, 0, 1], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0]];

console.log(minTotalDistance(grid));
