const { compareMatrix } = require('../utilities');
/**
 * Given a matrix write an algorithm such that 
 * if an element in an MxN matrix is 0, 
 * it's entire row and column are set to zero
 */

const zeroRow = (m, row) => {
    m[row] = m[row].map(() => 0);
};

const zeroColumn = (m, col) => {
    for (let row = 0; row < m.length; row++) {
        m[row][col] = 0;
    }
}

const zeroMatrix = (m) => {
    // Use the first row and column to indicate which of the
    // rows and columns need to be zeroed out
    // Use 2 variables to indicate if the first row/col themselves
    // need to be zeroed out
    let firstRow = false;
    let firstCol = false;

    for (let row = 0; row < m.length; ++row) {
        for (let col = 0; col < row.length; ++col) {
            const cell = m[row][col];
            if (cell === 0) {
                // If the cell is in the first column
                // or row, mark the columnn/row for 0ing
                if (row === 0) {
                    firstRow = true;
                }
                if (col === 0) {
                    firstCol = true;
                }
        
                // Mark the row or column for 0ing using the
                // first row/column to mark
                m[0][col] = 0;
                m[row][0] = 0;
            }
        }
    }

    // Zero out rows and columns other than the first ones
    const rowsToZero = m[0];
    const colsToZero = m.map(row => row[0]);

    for (let i = 1; i < rowsToZero.length; i++) {
        if (rowsToZero[i] === 0) {
            zeroRow(m, i);
        }
    }

    for (let i = 1; i < colsToZero.length; i++) {
        if (colsToZero[i] === 0) {
            zeroColumn(m, i);
        }
    }

    // Zero out the first row and column if needed
    if (firstRow) {
        zeroRow(m, 0);
    }

    if (firstCol) {
        zeroColumn(m, 0);
    }

    return m;
 };


 const empty = [[]];
 const zero = {
     input: [
        [1,0,1],
        [2,1,1],
        [0,2,3]
    ],
    expected: [
        [0,0,0],
        [0,0,1],
        [0,0,0]
    ]
};

console.log(compareMatrix(zeroMatrix(empty), empty))
console.log((compareMatrix(zeroMatrix(zero.input), zero.expected)))