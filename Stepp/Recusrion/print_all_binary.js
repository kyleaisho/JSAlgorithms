function printAllBinary(n,  strings = [], s = '') {
    if (n === 0) {
        strings.push(s);
    }
    else {
        printAllBinary(n - 1, strings, s + '0');
        printAllBinary(n - 1, strings, s + '1');
    }
}

(function() {
    const strings = [];
    printAllBinary(5, strings);
    strings.forEach(s => console.log(s));
}())