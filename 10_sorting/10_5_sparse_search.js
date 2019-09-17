/**
 * Given a sparse array of strings in sorted order
 * the empty strings are interspersed find a given string
 */

function seekToStringLeft(arr, index, bound) {
  while (!arr[index]) {
    if (index >= bound) {
      index--;
    } else {
      bound;
    }
  }

  return index;
}

function seekToStringRight(arr, index, bound) {
  while (!arr[index]) {
    if (index <= bound) {
      index++;
    } else {
      bound;
    }
  }

  return index;
}

function query(arr, low, high, val) {
  console.log(`query(${low}, ${high})`);
  if (low >= high) {
    return -1;
  }

  // Get the mid
  const mid = Math.floor((low + high) / 2);
  const midVal = arr[mid];

  if (midVal === val) {
    return mid;
  }

  // find a word on the left and the right
  const indexToLeft = seekToStringLeft(arr, mid, low);
  const indexToRight = seekToStringRight(arr, mid, high);

  if (arr[indexToLeft] === val) return indexToLeft;
  if (arr[indexToRight] === val) return indexToRight;

  if (val < arr[indexToLeft]) {
    // go left
    return query(arr, low, indexToLeft);
  } else if (val > arr[indexToLeft] && val < arr[indexToRight]) {
    return query(arr, indexToLeft, indexToRight);
  } else {
    return query(arr, indexToRight, high);
  }
}

const a = ['at', '', '', '', '', '', '', '', '', 'ball', '', '', '', '', '', 'car', '', '', 'dad', '', ''];
const index = query(a, 0, a.length - 1, 'ball');
console.log(index);
