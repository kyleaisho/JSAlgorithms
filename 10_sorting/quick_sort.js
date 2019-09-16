function swap(a, idx1, idx2) {
  const tmp = a[idx1];
  a[idx1] = a[idx2];
  a[idx2] = tmp;
}

function quicksort(arr, left, right) {
  if (!arr.length) return arr;

  left = left || 0;
  right = right || arr.length - 1;

  const pivotIdx = Math.floor((arr.length - 1) / 2);
  const pivot = arr[pivotIdx];

  while (left < right) {
    while (arr[left] <= pivot && left < pivotIdx) left++;
    while (arr[right] >= pivot && right > pivotIdx) right--;

    if (arr[left] > arr[right]) {
      swap(arr, left, right);
      left++;
      right--;
    }
  }

  const leftArray = arr.slice(0, pivotIdx);
  const rightArray = arr.slice(pivotIdx + 1);

  return (
    quicksort(leftArray)
      // .concat([pivot])
      .concat(arr[pivotIdx], quicksort(rightArray))
  );
}

const a = [2, 4, 1, 7, 5, 2, 9, 7];
quicksort(a);
console.log(a);
