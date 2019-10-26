/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
function getHint(secret, guess) {
    var map = new Array(10).fill(0);
    var A = 0;
    var B = 0;
      
    for (i = 0; i < secret.length; i++) {
      if (secret[i] === guess[i]) A++;
        
      else {
        map[secret[i]]++;
        B += map[secret[i]] <= 0 ? 1 : 0;
        map[guess[i]]--;
        B += map[guess[i]] >= 0 ? 1 : 0;
      }
    }
    return A + 'A' + B + 'B';
  }

console.log(getHint("2962",
"7236"))