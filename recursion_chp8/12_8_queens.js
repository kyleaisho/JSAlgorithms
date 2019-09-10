function genBoard() {
  const board = [];
  for (let i = 0; i < 8; i++) {
    board.push(new Array(8).fill('-'));
  }
  return board;
}

function placeAt(col, row, board) {
  board[row][col] = 'Q';
}

function removeAt(col, row, board) {
  board[row][col] = '-';
}

function isRowSafe(row, board) {
  return board[row] && board[row].every(cell => cell !== 'Q');
}

function upAndLeft(col, row, board) {
  if (!isInBounds(col, row, board)) return true;
  if (board[row][col] === 'Q') return false;

  return upAndLeft(col - 1, row - 1, board);
}

function upAndRight(col, row, board) {
  if (!isInBounds(col, row, board)) return true;
  if (board[row][col] === 'Q') return false;

  return upAndRight(col + 1, row - 1, board);
}

function downAndRight(col, row, board) {
  if (!isInBounds(col, row, board)) return true;
  if (board[row][col] === 'Q') return false;

  return downAndRight(col + 1, row + 1, board);
}

function downAndLeft(col, row, board) {
  if (!isInBounds(col, row, board)) return true;
  if (board[row][col] === 'Q') return false;

  return downAndLeft(col - 1, row + 1, board);
}

function isDiagonalSafe(col, row, board) {
  return (
    upAndLeft(col, row, board) &&
    upAndRight(col, row, board) &&
    downAndRight(col, row, board) &&
    downAndLeft(col, row, board)
  );
}

function isInBounds(col, row) {
  return col >= 0 && row >= 0 && col < 8 && row < 8;
}

function isSafe(col, row, board) {
  return isInBounds(col, row, board) && isRowSafe(row, board) && isDiagonalSafe(col, row, board);
}

function queens(col, board) {
  // base case
  if (col > 7) {
    console.log(board);
  } else {
    for (let row = 0; row < board.length; row++) {
      if (isSafe(col, row, board)) {
        // Choose
        placeAt(col, row, board);

        // Explore
        queens(col + 1, board);

        // Un-choose
        removeAt(col, row, board);
      }
    }
  }
}

queens(0, genBoard());
