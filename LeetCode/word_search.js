/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const starts = [];
  
  board.forEach((r, row) => r.forEach((c, col) => {
      if (c === word[0]) {
          starts.push([ row, col ])
      }
  }))
  return starts.some((coords) => {
      return _exist(board, ...coords, word.split(''), 0)
  });
};

const _exist = (board, row, col, letters, index) => {
  if (index >= letters.length) return true;
  if (row < 0 || row >= board.length || col < 0 || col > board[0].length) return false;
  
  const letter = letters[index];
  const boardLetter = board[row][col]
  if (letter !== boardLetter) return false;
  
  // Choose
  board[row][col] = null;
  
  // Explore
  const found = _exist(board, row + 1, col, letters, index + 1) ||
      _exist(board, row - 1, col, letters, index + 1) ||
      _exist(board, row, col + 1, letters, index + 1) ||
      _exist(board, row, col - 1, letters, index + 1);
  
  // Unchoose
  board[row][col] = boardLetter;
  
  return found;
}