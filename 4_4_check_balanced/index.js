const { findTreeHeight } = require('../utilities/Tree');

const isBalanced = (root) => {
    if (!root) return true;

    return Math.abs(findTreeHeight(root.left) - findTreeHeight(root.right)) < 1;
}

module.exports = {
    isBalanced,
};