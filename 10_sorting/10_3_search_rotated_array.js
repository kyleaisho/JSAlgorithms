function isRotated(arr, low, high) {
  return arr[low] > arr[high];
}

function findIndex(arr, n, low, high) {
  console.log(`findIndex(${low}, ${high})`);
  if (low >= high) {
    return -1;
  }

  const mid = Math.floor((low + high) / 2);
  const midVal = arr[mid];

  if (midVal === n) {
    return mid;
  }

  if (!isRotated(arr, low, high)) {
    if (n < midVal) {
      return findIndex(arr, n, low, mid - 1);
    } else {
      return findIndex(arr, n, mid + 1, high);
    }
  } else {
    // figure out which side n should go on
    if (n < midVal && n >= arr[low]) {
      //go left
      return findIndex(arr, n, low, high - 1);
    } else {
      // go right
      return findIndex(arr, n, low + 1, high);
    }
  }
}

const a = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14];
const b = [10, 14, 15, 16, 19, 20, 25, 1, 3, 4, 5, 7];
const c = [7, 10, 14, 15, 16, 19, 20, 21, 22, 25, 1, 3, 4, 5];
// const ai = findIndex(a, 10, 0, a.length - 1);
// const bi = findIndex(b, 10, 0, b.length - 1);
const ci = findIndex(c, 25, 0, c.length - 1);
// console.log(a[ai]);
// console.log(b[bi]);
console.log(c[ci]);
