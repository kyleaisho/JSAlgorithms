/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    const visited = {};
    const isVisitOk = isVisitable(grid, visited);
    let count = 0;
    
    const explore = (row, col) => {
        if (!isVisitOk(row, col)) return;
        
        visited[getKey(row, col)] = true;
        
        explore(row - 1, col); // up
        explore(row + 1, col); // down
        explore(row, col - 1); // left
        explore(row, col + 1); // right
    };
    
    grid.forEach((row, rIdx) => row.forEach((_, cIdx) => {
        
        if (isVisitOk(rIdx, cIdx)) {
            count++;
            explore(rIdx, cIdx);
        }
    }));
    
    return count;
};

const getKey = (row, col) => `${row}_${col}`;

const isVisitable = (grid, visited) => (row, col) => {
    const _row = grid[row];
    const cell = _row && _row[col];
    
    if (!cell) return false;
    
    return cell !== "0" && !visited[getKey(row, col)]
}

const map = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
]

console.log(numIslands(map));