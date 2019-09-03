/**
 * Given an array of integers find a magic index
 * where i === a[i]
 */

const getMagicNumber = (arr) => {
    return _getMagicNumber(arr, 0, arr.length - 1);
}

const _getMagicNumber = (arr, start, end) => {
    // There is no value on this side
    if (start > end) return -1;

    // Calculate mid and check for the magic number
    // if we found it then return
    const mid = Math.floor((start + end) / 2);
    const midVal = arr[mid];
    if (mid === midVal) return mid;

    // At this point no mid is found, we arent sure if
    // it is left or right, since the question only cares if we 
    // find one magic number lets check the left side first and if
    // we find one we will stop, if not we can search the right

    // For the left side we either move the mid val by 1
    // or move to the midval since it is in sorted order
    const leftEnd = Math.min(midVal, mid - 1);
    const left = _getMagicNumber(arr, start, leftEnd);
    if (left > 0) return left;

    // do the same but to the right if the left fails
    const rightStart = Math.max(midVal, mid + 1);
    return _getMagicNumber(arr, rightStart, end);
};

console.assert(getMagicNumber([1,2,3,5,6,6,6,7]) === 6, "Found");
console.assert(getMagicNumber([1,2,3,5,6,7,8,9]) === -1, "Not Found");
 