/**
 * Rank from Stream: Imagine you are reading in a stream of integers.
 * Periodically, you wish to be able to look up the rank of a
 * number x (the number of values less than or equal to x).
 * Implement the data structures and algorithms to support these operations.
 * That is, implement the method track (in t x),
 * which is called when each number is generated,
 * and the method getRankOfNumber(int x) ,
 * which returns the number of values less than
 * or equal to X (not including x itself).
 */

/**
 * Build a BST.
 * Have each node keep track of the size of
 * its left subtree. As elements are inserted
 * to the left of a node we can increment the the leftsize of the
 * current node
 *
 * To get the rank of a number query the tree
 * Each time you go left do nothing (you're smaller)
 * Each time you go right increment the rank 1 + leftSize of the node
 * When you find number return + leftsize
 */
/*
                5
          1           9
            4       7   13
          4   5
        3   

*/

function createNode(num) {
  return {
    num,
    left: null,
    right: null,
    leftHeight: 0
  };
}

function Streams() {
  this.root = null;
}

Streams.prototype = {
  insert: function(num, node) {
    node = node || this.root;
    if (!this.root) {
      this.root = createNode(num);
    } else {
      while (node) {
        parent = node;
        if (num <= node.num) {
          // go left and increment current node
          node.leftHeight += 1;
          if (node.left) {
            node = node.left;
          } else {
            // If there is no left child
            // add one and exit
            node.left = createNode(num);
            node = null;
          }
        } else {
          if (node.right) {
            node = node.right;
          } else {
            // If there is no right child add one
            // and exit
            node.right = createNode(num);
            node = null;
          }
        }
      }
    }
  },

  getRankOfNumber(num, node) {
    if (!this.root) {
      return -1;
    }

    if (!node) {
      return 0;
    }

    if (node.num === num) {
      return node.leftHeight;
    }

    if (num > node.num) {
      return 1 + node.leftHeight + this.getRankOfNumber(num, node.right);
    } else {
      return this.getRankOfNumber(num, node.left);
    }
  }
};

const a = [5, 1, 4, 4, 5, 9, 7, 13, 3];
const s = new Streams();
a.forEach(x => s.insert(x));

console.log(`${s.getRankOfNumber(1, s.root)} === 0`);
console.log(`${s.getRankOfNumber(3, s.root)} === 1`);
console.log(`${s.getRankOfNumber(4, s.root)} === 3`);
