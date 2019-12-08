/**
 * @param {string[]} logs
 * @return {string[]}
 */
var reorderLogFiles = function(logs) {
    const letLogs = [];
    const digLogs = [];
    
    logs.forEach((log) => {
        if (isDigitLog(log)) {
            digLogs.push(log);
        } else {
            letLogs.push(log);
        }
    });
    
    // Organize letLogs lexicographicall
    letLogs.sort((a, b) => {
        const first = a.slice(a.indexOf(' ') + 1);
        const second = b.slice(b.indexOf(' ') + 1);
        
        return first < second ? -1 : 1;
    })
    
    return [...letLogs, ...digLogs];
};

function isDigitLog(str) {
    const body = str.slice(str.indexOf(' ') + 1);
    
    return /\d/.test(body[0])
}