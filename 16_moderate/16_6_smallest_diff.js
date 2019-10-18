function getSmallestPair(arr1, arr2) {
    arr1.sort((a,b) => a-b);
    arr2.sort((a,b) => a-b);

    // Modified merge when you would merge B calculate the difference with A instead
    // Keep the minimum differences
    let i = 0;
    let j = 0;
    let diff = [];
    while (i < arr1.length && j < arr2.length) {
        const a = arr1[i];
        const b = arr2[j];

        if (a === b) return [a, b];
        if (a > b) {
            if (!diff.length) {
                diff = [a, b];
            } else {
                diff = diff[0] - diff[1] < a - b ? diff : [a, b];
            }
            j++;
        } else {
            //would be negative, increment a
            i++;
        }
    }

    return diff;
}

const a = [1,3,15,11,236];
const b = [23,127,235,19,8];

console.log(getSmallestPair(a, b));