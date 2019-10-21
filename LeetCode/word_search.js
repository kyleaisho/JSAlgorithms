/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const path = word.split('');

  return _findWord(board, path);
};

const findCoordsForLetter = (board, letter) => {
  const coords = [];

  board.forEach((row, rIdx) =>
    row.forEach((cell, cIdx) => {
      if (cell === letter) coords.push({ row: rIdx, col: cIdx });
    })
  );

  return coords;
};

const getKey = (row, col) => `${row}_${col}`;

const isSafe = ({ row, col }, board) => {
  const r = board[row] || [];
  const cell = r[col];

  return !!cell;
};

const explore = (board, { row, col }, path, visited = {}) => {
  if (path.length < 1) return true;
  if (!isSafe({ row, col }, board)) return false;
  // if (visited[getKey(row, col)]) return false;

  const cell = board[row][col];
  board[row][col] = null;
  if (cell === path[0]) {
    path.shift();
    return (
      explore(board, { row: row - 1, col }, path, visited) || // up
      explore(board, { row: row + 1, col }, path, visited) || // down
      explore(board, { row, col: col - 1 }, path, visited) || // left
      explore(board, { row, col: col + 1 }, path, visited)
    ); // right
  }
  board[row][col] = cell;
  return false;
};

const _findWord = (board, path) => {
  const firstLetter = findCoordsForLetter(board, path[0]);

  return firstLetter.some(start => explore(board, start, path.slice()));
};

const board = [['C', 'A', 'A'], ['A', 'A', 'A'], ['B', 'C', 'D']];
const path = 'AAB';

console.log(exist(board, path));
