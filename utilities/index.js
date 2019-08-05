const compareMatrix = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b)) {
        return a === b;
    } else {
        let out = true;
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            if (out) {
                out = compareMatrix(a[i], b[i]);
            } else {
                return false;
            }
        }
        return out;
    }
};

module.exports = {
    compareMatrix: compareMatrix
}