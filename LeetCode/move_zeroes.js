/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let left = 0;
    let right = 0;
    
    while (left < nums.length) {
        if (right < nums.length - 1 && nums[right] === 0) {
            right++;
        } else if (nums[left] === 0 && nums[right] !== 0) {
            swap(nums, left, right);
            left++;
        } else {
            left++;
        }
    }
};

const swap = (nums, p1, p2) => {
    const tmp = nums[p1];
    nums[p1] = nums[p2];
    nums[p2] = tmp;
}

console.log(moveZeroes([0,1,0,3,12]));