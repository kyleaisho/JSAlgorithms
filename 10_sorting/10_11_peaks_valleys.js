/**
 * The algorithm will work by examing the array
 * in groups of 3 in each group of 3 it will make
 * sure there is a peak surrounded by 2 valleys
 *
 *  0, 1, 2 -> 0, 2, 1 (by swapping the biggest into the middle)
 *
 * [9, 1, 0, 4, 8, 7]
 *
 * [9, 1, 0] -> [1, 9, 0]
 *
 * [0, 4, 8] -> [0, 8, 4]
 *
 * [1, 9, 0, 8, 4]
 */

function swap(arr, iA, iB) {
  const tmp = arr[iA];
  arr[iA] = arr[iB];
  arr[iB] = tmp;
}

function maxIndex(arr, ia, ib, ic) {
  if (arr[ia] >= arr[ib] && arr[ia] >= arr[ic]) {
    return ia;
  } else {
    return arr[ib] >= arr[ic] ? ib : ic;
  }
}

function pv(arr) {
  if (arr.length < 3) return arr;

  for (let i = 1; i + 1 < arr.length; i += 2) {
    const biggest = maxIndex(arr, i - 1, i, i + 1);

    if (biggest !== i) {
      swap(arr, i, biggest);
    }
  }

  return arr;
}

console.log(pv([9, 1, 0, 4, 8, 7]));
console.log(pv([5, 3, 1, 2, 3]));
