/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    const x = nums1.length;
    const y = nums2.length;
    
    let low = 0;
    let high = x;
    
    while (low <= high) {
        const partitionX = Math.floor((low + high) / 2);
        const partitionY = Math.floor((x + y + 1) / 2) - partitionX;
        
        const maxLeftX = (partitionX === 0) ? Number.NEGATIVE_INFINITY : nums1[partitionX - 1];
        const minRightX = (partitionX === x) ? Number.POSITIVE_INFINITY : nums1[partitionX];
        const maxLeftY = (partitionY === 0) ? Number.NEGATIVE_INFINITY : nums2[partitionY - 1];
        const minRightY = (partitionY === y) ? Number.POSITIVE_INFINITY : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            // median found
            return (x + y) % 2 === 0 ?
                (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2 :
                Math.max(maxLeftX, maxLeftY);
        }
        
        if (maxLeftX > minRightY) {
            // too far to the right
            high = partitionX - 1;
        } else {
            low = partitionX + 1;
        }
    }
    throw 'fuck'
}

// const arr1 = [1,3,8,9,15];
// const arr2 = [7,11,18,19,21,25];
const arr1 = [1,3];
const arr2 = [2];

console.log(findMedianSortedArrays(arr1, arr2))