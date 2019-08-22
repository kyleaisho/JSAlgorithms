/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const board = new Board(n);
    const boards = [];
    _solveQueens(board, 0, boards);
    console.log(boards.length)
    return boards;
};

function indent(n) {
    return " ".repeat(n);
}

function _solveQueens(board, col, boards = []) {
    // console.log(indent(col) + `Board: ${board}, Col: ${col}`);
    // Base Case
    if (col >= board.size) {
        if (board.queensMap.length === board.size) {
            boards.push(board.copy());
            board.reset();
        }
    } else {
        // Recursive step
        for (let row = 0; row < board.size; row++) {
            if (!board.isSafe(row, col)) continue;
            
            // Choose
            board.place(row, col);
            
            // explore
            _solveQueens(board, col + 1, boards);
            
            // Un-choose
            board.remove(row, col);
        }
    }
    return boards;
}

function Board(n) {
    this.size = n;
    this.reset();
}

Board.prototype = {
    place: function(row, col) {
        const str = this.board[row];
        this.board[row] = str.substr(0, col) + 'Q' + str.substr(col + 1);
        this.queensMap.push({ row, col })
    },
    
    remove: function(row, col) {
        this.board[row] = '.'.repeat(this.size);
        this.queensMap = this.queensMap.filter((q) => row !== q.row && col !== q.col);
    },

    isSafe: function(row, col) {
        const isRowSafe = !this.board[row].includes('Q');
        const isColSafe = this.board.every(row => row.charAt(col) !== 'Q');
        const isDiagonalSafe = this.queensMap.every((q) => {
            const deltaRow = Math.abs(row - q.row);
            const deltaCol = Math.abs(col - q.col);

            return deltaRow - deltaCol;
        })
        
        return isRowSafe && isColSafe && isDiagonalSafe;
    },

    reset: function() {
        this.board = [];
        this.queensMap = [];

        for (let i = 0; i < this.size; i++) {
            this.board.push('.'.repeat(this.size));
        }
    },

    copy: function() {
        const copyBoard = this.board.map(row => row);
        return copyBoard;
    }
}

solveNQueens(4).forEach(b => {
    console.log('[');
    b.forEach(r => console.log(r))
    console.log(']');
})