var gameOfLife = function(board) {
  for (let r = 0; r < board.length; r++) {
    const row = board[r];
    const newRow = row.slice();

    for (let col = 0; col < row.length; col++) {
      newRow[col] = getNextState(board, r, col);
    }

    board[r] = newRow;
  }
};

const isSafe = (board, row, col) => {
  const r = board[row] || [];

  return Number.isInteger(r[col]);
};

const getNeighbors = (board, row, col) => {
  const neighbors = [];
  const pushIfSafe = (r, c) => {
    isSafe(board, r, c) && neighbors.push(board[r][c]);
  };

  pushIfSafe(row - 1, col);
  pushIfSafe(row + 1, col);
  pushIfSafe(row, col - 1);
  pushIfSafe(row, col + 1);
  pushIfSafe(row - 1, col - 1);
  pushIfSafe(row + 1, col - 1);
  pushIfSafe(row - 1, col + 1);
  pushIfSafe(row + 1, col + 1);

  return neighbors;
};

const getNextState = (board, row, col) => {
  const neighbors = getNeighbors(board, row, col);
  const alive = neighbors.filter(c => c === 1).length;

  if (alive < 2) {
    return 0;
  }
  if (alive === 3 && board[row][col] === 0) {
    return 1;
  }
  if (alive === 2 || alive === 3) {
    return board[row][col];
  }
  if (alive > 3) {
    return 0;
  }

  return 0;
};

const b = [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]];
gameOfLife(b);
console.log(b);
console.log([[0, 0, 0], [1, 0, 1], [0, 1, 1], [0, 1, 0]]);
