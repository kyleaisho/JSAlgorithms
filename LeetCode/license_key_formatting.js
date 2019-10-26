/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var licenseKeyFormatting = function(s, k) {
    const raw = s.replace(/-/g, '').toUpperCase();
    let length = raw.length;
    const chunks = [];
    
    while (length > 0) {
        chunks.unshift(raw.substring(length - k, length))
        length -= k;
    }
    
    return chunks.join('-')
};

console.log(licenseKeyFormatting("5F3Z-2e-9-w",
4))