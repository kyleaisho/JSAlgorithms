/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    let string = '';

    function buildString(node) {
        if (!node) {
            string += 'null,';
        } else {
            string += node.val + ',';
            buildString(node.left);
            buildString(node.right);
        }
    }

    buildString(root);

    return string;
};

function TreeNode(val, left = null, right = null) {
 this.val = val;
 this.left =left;
 this.right = right;
}
/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    let nodes = data.split(',');
    
    return _des(nodes);
};

function _des(arr) {
    const val = arr.shift();
    if (arr.length < 1 || val === 'null') return null;
    
    const node = new TreeNode(val);
    node.left = _des(arr);
    node.right = _des(arr);
    
    return node;
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */