function genBoard() {
    const board = [];
    for (let i = 0; i < 8; ++i) {
        board.push(new Array(8).fill('-'));
    }

    return board;
}

function queens() {
    const board = genBoard();
    _queens(0, 0, board);
}

function printBoard(board) {
    console.log(board);
}

function rowIsSafe(row, board) {
    return board[row].every(s => s !== 'Q');
}

function diagonalIsSafe(col, row, board) {
    if (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
        return true
    }
    if (board[row][col] === 'Q') {
        return false;
    }

    return diagonalIsSafe(col - 1, row - 1, board) &&
           diagonalIsSafe(col - 1, row + 1, board) &&
           diagonalIsSafe(col + 1, row + 1, board) &&
           diagonalIsSafe(col + 1, row - 1, board);
}

function isSafe(col, row, board) {
    return diagonalIsSafe(col, row, board) && rowIsSafe(row, board);
}

function placeQueen(col, row, board) {
    board[row][col] = 'Q';
}

function removeQueen(col, row, board) {
    board[row][col] = '-';
}
const indent = (n) => '  '.repeat(n);
function _queens(col, row, board) {
    console.log(`${indent} _queens(${col}, ${row})`)
    if (col >= 7) {
        printBoard(board);
    } else if (isSafe(col, row, board)) {
        for (let i = row; i < 8; i++) {
            // Choose
            placeQueen(col, i, board);

            // Explore
            _queens(col + 1, i, board);
    
            // Un-choose
            removeQueen(col, i, board);
        }
    }
}

queens();