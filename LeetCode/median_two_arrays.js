/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length < 3 && nums2.length < 3) {
        return median(mergeSorted(nums1, nums2));
    }

    if (nums1.length < 1) return median(nums2);
    if (nums2.length < 1) return median(nums1);
    
    const mid1 = Math.floor((nums1.length - 1) / 2);
    const mid2 = Math.floor((nums2.length - 1) / 2);
    const median1 = median(nums1);
    const median2 = median(nums2);
    
    if (median1 === median2) return median1;
    
    if (median1 < median2) {
        return findMedianSortedArrays(nums1.slice(mid1), nums2.slice(0, mid2 + 1));
    } else {
        return findMedianSortedArrays(nums1.slice(0, mid1 + 1), nums2.slice(mid2));
    }
};

const median = (arr) => {
    const mid = Math.floor((arr.length - 1) / 2);
    
    if (arr.length % 2 === 0) {
        // even
        const right = mid + 1;

        return (arr[mid] + arr[mid + 1]) / 2;
    } else {
        return arr[mid];
    }
}

const getResult = (nums1, nums2) => {
    const merge = mergeSorted(nums1, nums2);
    return median(merge);
};

const mergeSorted = (nums1, nums2) => {
    const ret = [];
    
    while (nums1.length && nums2.length) {
        if (nums1[0] <= nums2[0]) {
            ret.push(nums1.shift());
        } else {
            ret.push(nums2.shift());
        }
    }
    
    if (nums1.length) {
        nums1.forEach(n => ret.push(n));
    } else {
        nums2.forEach(n => ret.push(n));
    }
    
    return ret;
}

const arr1 = [1,2];
const arr2 = [1,2,3];

console.log(findMedianSortedArrays(arr1, arr2))