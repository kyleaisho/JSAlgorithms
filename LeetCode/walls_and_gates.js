/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
const inf = 2147483647;
var wallsAndGates = function(rooms) {
  for (let i = 0; i < rooms.length; i++) {
    const row = rooms[i];

    for (let j = 0; j < row.length; j++) {
      if (row[j] === 0) {
        console;
        mapDistances(rooms, i, j);
      }
    }
  }
};

const getCell = (board, row, col) => {
  const r = board[row] || [];
  const cell = r[col] || null;

  return { cell, r: row, c: col };
};

const getKey = (r, c) => r + '-' + c;

const mapDistances = (board, row, col, distance = 1, map = {}) => {
  map[getKey(row, col)] = true;
  const neighbors = [
    getCell(board, row + 1, col),
    getCell(board, row, col + 1),
    getCell(board, row - 1, col),
    getCell(board, row, col - 1)
  ];
  const neighborsToRecurse = neighbors.filter(({ r, c }) => !map[getKey(r, c)]);
  const neighBorsToDistance = neighbors.filter(({ cell }) => cell > 0);

  neighBorsToDistance.forEach(({ cell, r, c }) => {
    if (row === 0 && col === 0) {
      console.log(board, Math.min(distance, cell));
    }
    board[r][c] = Math.min(distance, cell);
  });

  neighborsToRecurse.forEach(({ r, c }) => {
    mapDistances(board, r, c, distance + 1, map);
  });
};
