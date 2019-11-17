

var oddEvenJumps = function(A) {
    let memo = new Map();
    
    let res = 0;
    
    for(let i = 0; i < A.length; i++) {
        res += next(i, true, memo);
    }
    return res;
};

const next = (idx, num, memo) => {
    const isEven = num % 2 === 0;
    const key = `${idx} ${isEven}`;

    // If the value is already cached return that
    if (memo.has(key)) return memo.get(key);
    
    // If we reach the end of the array the jump sequence is successfull
    if (idx == A.length - 1) {
        return 1;
    }
    
    // If we jump beyond the array this was not successfull
    if (idx >= A.length) {
        return 0;
    }
    
    let res = 0;
    if (isEven) {
        let largestValue = -Infinity,
            nextPosition = null
        
        for (let i = idx + 1; i < A.length; i++) {
            if(A[idx] >= A[i]) {
                if(A[i] > largestValue) {
                    nextPosition = i
                    largestValue = A[i]
                }
            }
        }
        
        if(nextPosition != null) {
            res += next(nextPosition, num + 1, memo)
        }
    } else {
        let smallestValue = Infinity,
            nextPosition = null
        
        for(let i = idx + 1; i < A.length; i++) {
            if(A[idx] <= A[i]) {
                if(A[i] < smallestValue) {
                    nextPosition = i
                    smallestValue = A[i]
                }
            }
        }
        
        if (nextPosition != null) {
            res += next(nextPosition, num + 1, memo)
        }
    }
    
    memo.set(key, res);

    return res;
}

const arr = [2,3,1,1,4];
console.log(oddEvenJumps(arr))