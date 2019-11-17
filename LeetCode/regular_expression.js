/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  // Initialize the DP array
  const DP = getDPArray(s, p);

  // At position 0, 0 we are dealing with
  // an empty string and an empty pattern
  // this case is true
  DP[0][0] = true;

  // Fill out the top row starting from 1
  for (let i = 1; i < DP[0].length; i++) {
    const char = p[i - 1];
    if (char === '*') {
      DP[0][i] = DP[0][i - 2];
    } else {
      DP[0][i] = false;
    }
  }

  // fill out first column
  // always false for an empty pattern
  for (let i = 1; i < DP.length; i++) {
    DP[i][0] = false;
  }

  /**
   * Rules:
   * 1. If the character at s[i] and p[j] match OR p[j] is a '.'
   *    then the result is whatever s[i - 1] and s[j - 1] was
   * 2. If p[j] is '*' this means 0 or more of the previous character
   *      if DP[i][j - 2] (same row but two characters back)
   *        treat it as 0 of the previous is true then this is true
   *      if s[i] is matching p[j - 1] (this is the 1 or more occurances)
   *         take the row just above
   *
   *        0 occurances
   *          x | a *
   *        x   |
   *        a F |    <- F because 'a' !== 'x'
   *        - - -
   *
   *        1 or more occurances
   *          x a *|
   *        x T F T| <- true because there is 0 or more occurances of 'a'
   *        - - - -
   *        a     T
   */
  for (let rowIdx = 1; rowIdx < DP.length; rowIdx++) {
    const row = DP[rowIdx];
    const sChar = s[rowIdx - 1];

    for (let colIdx = 1; colIdx < row.length; colIdx++) {
      const pChar = p[colIdx - 1];

      if (sChar === pChar || pChar === '.') {
        // Characters match then use the diagonla to get the previous match
        DP[rowIdx][colIdx] = DP[rowIdx - 1][colIdx - 1];
      } else if (pChar === '*') {
        // 0 matches of the previous character
        if (DP[rowIdx][colIdx - 2]) {
          DP[rowIdx][colIdx] = DP[rowIdx][colIdx - 2];
        } else {
          const zeroOrMoreChar = p[colIdx - 2];
          // if the current string character matches the preceeding
          // pattern character then we can set the value to the previous
          // match excluding our new character
          if (sChar === zeroOrMoreChar) {
            DP[rowIdx][colIdx] = DP[rowIdx - 1][colIdx];
          } else {
            DP[rowIdx][colIdx] = false;
          }
        }
      } else {
        DP[rowIdx][colIdx] = false;
      }
    }
  }

  console.log(DP);
  return DP[s.length][p.length];
};

const getDPArray = (s, p) => {
  const DP = [];
  for (let i = 0; i <= s.length; i++) {
    DP[i] = new Array(p.length + 1).fill(null);
  }

  return DP;
};

console.log(isMatch('xaabyc', 'xa*b.c'));
