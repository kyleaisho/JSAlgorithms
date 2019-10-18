function getFactorial(n) {
    let prod = 1;

    while (n > 0) prod *= n--;

    return prod;
} 

console.log(getFactorial(10))