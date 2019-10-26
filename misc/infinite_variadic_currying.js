
/**
 * Top leve curry function
 */
function curry(fn) {

    // Currying wrapper this is used to
    // recursively call to build up return functions
    function _curry(n, args) {

        // Either return the original function
        // or recursively return the outer function
        return function(...nums) {
            if (n - nums.length < 1) {
                return fn(...args, ...nums);
            }

            return _curry(n - nums.length, [...args, ...nums]);
        }
    }

    return _curry(fn.length, []);
}


const infiniteCurry = (fn) => {
    const next = (args) => {
        return (...vals) => {
            if (vals.length < 1) return fn(...args);
            return next([...args, ...vals])
        }
    }

    return next([]);
}
