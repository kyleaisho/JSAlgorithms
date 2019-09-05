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

function tailOpt(num, times, acc = 0) {
    if (times < 1) return acc;

    return tailOpt(num, times - 1, acc + num);
}

function multiply(num1, num2) {
    const largest = Math.max(num1, num2);
    const smallest = Math.min(num1, num2);

    return tailOpt(largest, smallest);
}

testCases.forEach((testCase) => {
    const answer = multiply(testCase[0], testCase[1])
    console.assert(answer === testCase[2], `${testCase[0]}*${testCase[1]} does not equal ${answer}`);
});