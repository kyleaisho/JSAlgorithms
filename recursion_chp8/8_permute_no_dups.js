function permute(s) {
  const container = [];

  const map = generateMap(s.split(''));
  _permute(map, container, s.length);

  return container;
}

/**
 * Generate a map which has the unique characters
 * as keys and the values are the count of times that character is seen
 */
function generateMap(arr) {
  return arr.reduce((acc, curr) => {
    if (!acc[curr]) acc[curr] = 0;

    acc[curr] += 1;

    return acc;
  }, {});
}

/**
 * In the worst case this is no better than O(n!)
 * this is becausr there are n! permutations so we have to generate
 * all of them
 *
 * This will perform better in the cases where the characters are
 * not all uniqe and we don't want duplicates. In the case of
 * "aaaaaaaaaaaa" there is only one unique permutation but 12! =~ 500 million
 */
function _permute(s, container, len, tmp = []) {
  /**
   * Since we can't just count until the original string is
   * 0 with the map count of characters we keep a reference to
   * the original strings length. By definition the permutation
   * should be the same length. So when the tmp buffers length
   * is the same we are done.
   */
  if (len === tmp.length) {
    // The string is the same length
    // as the original
    container.push(tmp.join(''));
  } else {
    /**
     * The algorithms works like this:
     *  - At each level of recursion we iterate over the map of characters
     *  - If a character still has a value > 0 we explore using that character
     *  appended to the buffer.
     *  - To mark this character as being used we decrement its count in the map
     *  - Recurse with the current char decremented
     *  - Unchoose by incrementing and removing from the buffer
     *
     */
    Object.keys(s).forEach(c => {
      if (s[c] > 0) {
        // Choose
        s[c] -= 1;
        tmp.push(c);

        // explore
        _permute(s, container, len, tmp);

        // unchoose
        s[c] += 1;
        tmp.pop();
      }
    });
  }
}

permute('AAAAAAAAAAAAAAAA').forEach(s => console.log(s));
