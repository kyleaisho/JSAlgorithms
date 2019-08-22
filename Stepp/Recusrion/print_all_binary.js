function printAllBinary(n, s = '') {
    if (n === 0) {
        console.log(s);
    }
    else {
        printAllBinary(n - 1, s + '0');
        printAllBinary(n - 1, s + '1');
    }
}

printAllBinary(5)