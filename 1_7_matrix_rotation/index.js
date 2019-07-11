const getCoords = (row, col) => ({ row, col });

const getPoints = (n, i, j) => {
    const a_row = i;

    // With each iteration of i we want the column
    // to start further to the right
    const a_col = i + j;
    
    // B's row is A's column and thats the pattern
    // for all these points
    // B col starts at the end of the matrix and decreases wrt
    // to the outer loop. Going from n - 1 - 0 -> n - 1 - 1 -> n - 1 - 2 -> ...
    const b_col = n - 1 - i;

    // Just like before B's column becomes C's row
    // C's column starts at the bottom right corner which is m[n-1][n-1]
    // and it moves wrt to i and j such that with each new iteration of the loop
    const c_col = n - 1 - j - i;

    // Same as before D's row is C's column calculation, and D's column
    // is A's row calculation, each coordinate calculation is use twice as
    // we move around the matrix
    // We dont need a new variable but it makes the commenting easier
    const d_col = a_row;
    
    const a = getCoords(a_row, a_col);
    const b = getCoords(a_col, b_col);
    const c = getCoords(b_col, c_col);
    const d = getCoords(c_col, d_col);

    return { a, b, c, d };
}

const swap = (m) => (a, b) => {
    const t = m[b.row][b.col];
    m[b.row][b.col] = m[a.row][a.col];
    m[a.row][a.col] = t;
};

/* 

A, B, C and D are the corners and on each iteration
the layers get smaller

| A 0 1 0 B |
| 0 1 1 1 0 |
| 1 0 1 1 1 |
| 0 0 1 1 0 |
| D 1 1 1 C |

Second iteration of the outer loop
| 1 0 1 0 1 |
| 1 A 1 B 0 |
| 1 0 1 1 1 |
| 1 B 1 C 0 |
| 1 0 1 0 1 |

*/
const rotateMatrix = (m) => {
    const n = m.length;
    const swapM = swap(m);

    // We only have to go half way down since on each iteration
    // we are running operations on the top and bottom of the layer
    for (let i = 0; i < Math.floor(n/2); i++) {
        // This loop condition is more complicated
        // We are trying to determing how many operations are performed
        // in the inner loop, since the layers get smaller with each outer
        // loop 'tick' we can look at the work w.r.t n and i
        /*
            5x5
            #  n  i
            4  5  0
            2  5  1
            1  5  2

            n doesn't change but i increments by 1 each time, the relation between the
            difference in the number of operations and i is 2 * i, this makes sense since with
            each iteration of i we move down a layer. In a 5x5 matrix we do 4 units of work at
            layer 0, we do half as much work at layer 1 (5x5 -> 3/3) and at layer 2 we do one unit
            of work (3x3 -> 1x1)
        */
        for (let j = 0; j < (n - 1) - 2 * i; j++) {
            const { a, b, c, d } = getPoints(n, i, j);

            swapM(a, b);
            swapM(a, c);
            swapM(a, d);
        }
    }

    return m;
};


const compareMatrix = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b)) {
        return a === b;
    } else {
        let out = true;
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            if (out) {
                out = compareMatrix(a[i], b[i]);
            } else {
                return false;
            }
        }
        return out;
    }
};


console.log(
    compareMatrix(rotateMatrix([[1, 2], [3, 4]]), [[3, 1], [4, 2]]),
    compareMatrix(rotateMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [[7, 4, 1], [8, 5, 2], [9, 6, 3]]),
    compareMatrix(rotateMatrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]),
        [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]),
    compareMatrix(rotateMatrix([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]),
        [[21, 16, 11, 6, 1], [22, 17, 12, 7, 2], [23, 18, 13, 8, 3], [24, 19, 14, 9, 4], [25, 20, 15, 10, 5]]),
    compareMatrix(rotateMatrix([]), []),
    compareMatrix(rotateMatrix([[]]), [[]]),
    compareMatrix(rotateMatrix([[1]]), [[1]])
);