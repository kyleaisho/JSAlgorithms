var threeSum = function(nums) {
    const result = [];
    
    if (nums.length < 3) {
        return result;
    }
    
    nums = nums.sort((a, b) => a - b );
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            break;
        }
        if (nums[i] === nums[i - 1]) {
            continue;
        }
		
        let j = i + 1;
        let k = nums.length - 1;
        
        while (j < k) {
            const sum = nums[i] + nums[j] + nums[k];
            
            if (sum === 0) {
                result.push([nums[i], nums[j], nums[k]]);
                
                while (nums[j] === nums[j + 1]) j++;
                while (nums[k] === nums[k - 1]) k--;

                j++;
                k--;
            } else if (sum < 0) {
                j++;
            } else {
                k--;
            }
        }
    }
    
    return result;
}

const arr = [-2,0,1,1,2];
console.log(threeSum(arr))