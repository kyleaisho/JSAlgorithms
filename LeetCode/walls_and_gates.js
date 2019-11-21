/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
const inf = 2147483647;
var wallsAndGates = function(rooms) {
    const q = [];
    
    for (let row = 0; row < rooms.length; row++) {
        const r = rooms[row];
        
        for (let col = 0; col < r.length; col++) {
            if (r[col] === 0) q.push({ row, col });
        }
    }
    
    // Do BFS from each of the start positions
    while (q.length) {
        const tile = q.shift();
        const dist = rooms[tile.row][tile.col];
        const neighbors = getNeighbors(rooms, tile);
        
        // Mark all the neighbors
        neighbors.forEach(({ row, col }) => rooms[row][col] = dist + 1);
        
        q.push(...neighbors);
    }
};

function isValid(board, { row, col }) {
    return row > -1 && row < board.length &&
        col > -1 && col < board[0].length &&
        board[row][col] === inf;
}

function getNeighbors(board, { row, col }) {
    return [
        { row: row + 1, col: col },
        { row: row - 1, col: col },
        { row: row, col: col + 1 },
        { row: row, col: col - 1 },
    ].filter((tile) => isValid(board, tile));
}