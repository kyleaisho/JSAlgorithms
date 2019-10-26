
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s, map = new Map()) {
    let longest = '';
    // return isPalindrome("bb", map)
    for (let i = 0; i < s.length; i++) {
        for (let end = s.length - 1; end >= i; end--) {
            const sub = s.substring(i, end + 1);
            
            if (isPalindrome(sub, map)) {
                longest = longest.length >= sub.length ? longest : sub;
            };
        }
    }
    
    return longest;
};

const isPalindrome = (s, map, count = 0) => {
    if (s.length < 2) return true;
    if (map.has(s)) return map.get(s)
    
    if (!map.has(s)) {
        const start = s[0];
        const end = s[s.length -1];
        if (start === end) {
            const isP = isPalindrome(s.substring(1, s.length - 1), map, count + 1)
            
            map.set(s, isP, map, count + 1)
        } else {
            map.set(s, false);
        }
    }
    
    return map.get(s);
}

console.log(longestPalindrome('cbbd'));