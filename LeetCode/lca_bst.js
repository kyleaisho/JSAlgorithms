/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  const low = Math.min(p.val, q.val);
  const high = Math.max(p.val, q.val);

  return lca(root, low, high);
};

const hasSplit = (node, low, high) => {
  const split = low < node.val && high > node.val;
  const oneNodeMatch = node.val === low || node.val === high;

  return split || oneNodeMatch;
};

const lca = (node, low, high) => {
  if (!node) return null;

  if (hasSplit(node, low, high)) {
    return node;
  }

  const nextNode = low < node.val ? node.left : node.right;

  return lca(nextNode, low, high);
};
