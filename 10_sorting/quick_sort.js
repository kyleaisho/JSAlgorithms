function swap(a, i1, i2) {
  const tmp = a[i1];
  a[i1] = a[i2];
  a[i2] = tmp;
}

/**
 * Select the last element to be the pivot
 * Keep two pointers firsthigh and left incrementer
 * 
 * First high increments when the current value is less than the pivot
 * it should represent the fist index which has a value greater than the pivot
 * 
 * The last step in the algorithm after the swaps is to swap the pivot
 * into the firsthigh index and move firsthigh's value to the end, this
 * keeps the invariant that eveything to the right of the pivot is > and everything
 * to the left is <
 */
function partition(a, l, h) {
  let p = h;
  let firsthigh = l;

  for (let i = l; i < h; i++) {
    if (a[i] < a[p]) {
      swap(a, i, firsthigh);
      firsthigh++;
    }
  }

  swap(a, firsthigh, p);

  return firsthigh;
}


function qsort(a, l, h) {
  if (l < h) {
    const p = partition(a, l, h);
    qsort(a, l, p - 1);
    qsort(a, p + 1, h);
  }
}

const arr = [ 4, 1, 2, 5, 9, 2, 9, 7];
qsort(arr, 0, arr.length - 1);
console.log(arr);