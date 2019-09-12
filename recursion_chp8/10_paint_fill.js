const canvas1 = [
    [1,1,2],
    [2,1,1],
    [1,1,4]
];

/**
 * Given a point into a 2D array and a color (number) to fill, fill all
 * the points which are the same color as the initial point which can
 * be reached by moving one point up, down, left, right
 */

 function fill(row, col, color, startingColor, canvas) {
    
     // Check for bounds
     if (row < 0 || row > canvas.length - 1 || col < 0 || col > canvas[0].length - 1) {
         // row and col out of bounds
         return;
     } else {
         // Check for current color is different
         let point = canvas[row][col];
         startingColor = Number.isInteger(startingColor) ? startingColor : point;
         if (point !== color && point === startingColor) {
             // Color point
             startingColor = canvas[row][col];
             canvas[row][col] = color
    
             // recurse in the four directions
             fill(row + 1, col, color, startingColor, canvas); // down
             fill(row - 1, col, color, startingColor, canvas); // up
             fill(row, col + 1, color, startingColor, canvas); // right
             fill(row, col - 1, color, startingColor, canvas); // left
         }
     }

 }

 console.log(canvas1);
 fill(0, 1, 3, null, canvas1);
 console.log(canvas1);