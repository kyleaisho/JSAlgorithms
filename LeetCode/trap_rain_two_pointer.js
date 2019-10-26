/**
 * @param {number[]} height
 * @return {number}
 */

var trap = function(heights) {
    let left = 0;
    let right = heights.length - 1;
    let leftMax = Number.NEGATIVE_INFINITY;
    let rightMax = Number.NEGATIVE_INFINITY
    let water = 0;
    
    while (left < right) {
        const leftHeight = heights[left];
        const rightHeight = heights[right];
        
        if (leftHeight < rightHeight) {
            if (leftHeight >= leftMax) {
                leftMax = leftHeight;
            } else {
                water += leftMax - leftHeight;
            }
            
            left++;
        } else {
            if (rightHeight >= rightMax) {
                rightMax = rightHeight;
            } else {
                water += rightMax - rightHeight;
            }
            
            right--;
        }
    }
    
    return water;
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));