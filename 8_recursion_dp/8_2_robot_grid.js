
function path(g) {
    const path = [];

    function _path(grid, r, c, path = []) {
        if (r >= grid.length || c >= grid[0].length) return false;
        if (grid[r][c] === 1) return false;
        
        if (r === grid.length - 1 && c === grid[0].length - 1) {
            path.push({ row: grid.length - 1, col: grid[0].length - 1 })
            return true;
        }
        
        path.push({ row: r, col: c });

        const result = _path(grid, r + 1, c, path) || _path(grid, r, c + 1, path);

        if (!result) {
            path.pop(); 
        }

        return result;
    }

    _path(g, 0, 0, path)

    return path;
}

const grid1 = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
];

const grid2 = [
    [0,0,1],
    [0,1,1],
    [0,0,0],
];

const grid3 = [
    [0,0,0],
    [0,1,0],
    [0,1,0],
];

console.log(path(grid2));