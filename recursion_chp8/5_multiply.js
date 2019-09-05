const testCases = [
    [0, 0, 0],
    [0, 1, 0],
    [10, 2, 20],
    [11, 11, 121],
]

function _multiply(num, times) {
    if (times < 1) {
        return 0;
    } else {
        return num + _multiply(num, times - 1);
    }
}

/**
 * The general thought with this is that since we can use
 * any arithmetic operators except for * we can leverage division
 * and bit shifting to accomplish the same thing but try and get to
 * a O (log s)
 */
function fasterMultiply(largest, times) {
    if (times < 1) return 0;
    if (times === 1) return largest;

    // Count the first half of the numbers
    // and we'll double it
    const half = times >> 1;
    const halfProduct = fasterMultiply(largest, half);

    if (times % 2 === 0) {
        // In the even case we can just double the half product
        return halfProduct + halfProduct;
    } else {
        // In the odd case we would be off by largest
        // so in this case we can add it back on at the end
        // 5 >> 1 === 2 (not 2.5) so instead we treat it as
        // (4 >> 1) + times so we can double the half prod and then
        // just add the odd man out
        return halfProduct + halfProduct + largest;
    }
}

function tailOpt(num, times, acc = 0) {
    if (times < 1) return acc;

    return tailOpt(num, times - 1, acc + num);
}

/**
 * This takes O(s) time where s is the smaller
 * of the two numbers
 */
function multiply(num1, num2, cb) {
    const largest = Math.max(num1, num2);
    const smallest = Math.min(num1, num2);

    return cb(largest, smallest);
}

function test(cb) {
    testCases.forEach((testCase) => {
        const answer = multiply(testCase[0], testCase[1], cb)
        console.assert(answer === testCase[2], `${testCase[0]}*${testCase[1]} does not equal ${answer}`);
    });
}

test(_multiply);
test(tailOpt);
test(fasterMultiply);