
var oddEvenJumps = function(A) {
    const memo = new Map();
    
    let total = 0;
    
    for (let i = 0; i < A.length; i++) {
        total += _jump(A.slice(i), 1, memo)
    }
    
    return total;
};

function _jump(arr, n, memo) {
    console.l
    if (arr.length === 1) return 1;
    if (arr.length < 1) return 0;
    
    const isOdd = n % 2 !== 0;
    const key = `${arr.length}_${isOdd}`;
    
    if (!memo.has(key)) {
        let idx = arr.length;
        
        if (isOdd) {
            // go to the next jump such that
            // 1. the next spot is <= current val
            // 2. it is the smallest of the remaining values that is valid
            let smallest = Number.POSITIVE_INFINITY;
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] <= arr[0] && arr[i] < smallest) {
                    smallest = arr[i];
                    idx = i;
                }
            }
        } else {
            // go to the next jump spot
            // 1. the next val is >= current val
            // 2. it is the largest such possible value
            let largest = Number.NEGATIVE_INFINITY;
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] >= arr[0] && arr[i] > largest) {
                    largest = arr[i];
                    idx = i;
                }
            }
        }
        
        const val =  _jump(arr.slice(idx), n + 1, memo);
        memo.set(key, val);
    }
    
    return memo.get(key);
}
const arr = [2,3,1,1,4];
console.log(oddEvenJumps(arr))