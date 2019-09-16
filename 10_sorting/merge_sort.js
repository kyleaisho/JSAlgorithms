function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const arr1 = mergeSort(arr.slice(0, mid));
  const arr2 = mergeSort(arr.slice(mid));

  return merge(arr1, arr2);
}

function merge(a, b) {
  const buf = [];

  while (a.length && b.length) {
    const v1 = a[0];
    const v2 = b[0];

    // if (Number.isNaN(v1)) {
    //   buf.push(b.shift());
    // } else if (Number.isNaN(v2)) {
    //   buf.push(a.shift());
    // } else {
    if (v1 <= v2) {
      buf.push(a.shift());
    } else {
      buf.push(b.shift());
    }
    // }
  }

  // return buf;
  return a.length ? [...buf, ...a] : [...buf, ...b];
}

console.log(mergeSort([2, 4, 1, 7, 5, 2, 9, 7]));
