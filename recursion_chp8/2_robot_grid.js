/**
 * Imagine a robot sitting in the upper left corner of a grid with r rows and c columns
 * the robot can only move in two directions, right and down, but certain cells are
 * off-limits, the robot cannot step on them. Design and algorithm to find a path for
 * the robot from the top left to the bottom right
 * 
 */

/**
 * I - 2D array
 * O - array of grid coordinates for the path
 * C - Some coordinates are off limits and cannot be used
 * E - There is no path
 */

 const example = [
     [0, 0, 1],
     [0, 1, 1],
     [0, 0, 0],
 ];

const getPath = (grid, row = 0, col = 0, path = []) => {
    if (row === grid.length - 1 && col === grid[0].length) {
        return true;
    }
    
    const currRow = grid[row] || [];
    const square = currRow[col];

    if (square !== 0) {
        return false
    }

    if (square === 0) {
        // choose
        path.push({ row, col });

        // explore
        const res = getPath(grid, row + 1, col, path) || // down
                    getPath(grid, row, col + 1, path);   // right

        // unchose
        if (!res) {
            path.pop();
        }

        return res;
    }
};

const path = [];
getPath(example, 0, 0, path);
console.log(path);