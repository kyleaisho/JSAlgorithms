/**
 * Perform binary search on a sorted matrix
 * the matrix
 */

function coordToIndex(row, col, numOfCols) {
  return row * numOfCols + col;
}

function indexToCoord(index, numCols) {
  const row = Math.floor(index / numCols);
  const col = index % numCols;

  return { row, col };
}

function _bs(arr, val, low, high, numCols, depth = 0) {
  // console.log(`${' '.repeat(depth)}bs(low: ${low}, high: ${high})`);
  if (arr.length === 0) {
    return null;
  }

  const mid = Math.floor((low + high) / 2);
  const { row, col } = indexToCoord(mid, numCols);
  const midVal = arr[row][col];

  if (midVal === val) {
    return { row, col };
  }

  const midIndex = coordToIndex(row, col, numCols);

  if (val < midVal) {
    // go left
    return _bs(arr, val, low, midIndex - 1, numCols, depth + 1);
  } else {
    // go right
    return _bs(arr, val, midIndex + 1, high, numCols, depth + 1);
  }

  return { row, col };
}

function bsMatrix(arr, val) {
  const rows = arr.length;
  const cols = arr[0].length;
  return _bs(arr, val, 0, rows * cols - 1, cols);
}

const m = [[3, 5, 7, 9], [13, 15, 17, 19], [23, 25, 27, 29]];
console.log(bsMatrix(m, 27));
