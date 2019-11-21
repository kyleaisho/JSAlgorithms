/**
 * // Definition for a Node.
 * function Node(val,left,right,next) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 *    this.next = next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
function connect(root) {
    _connect(root);
    return root;
}

var _connect = function(node) {
    // Use the invariant for the top-down approach
    // that at any level your parent has already connected you to your
    // siblings
    let last = { next: null };
    const { left } = node || {};
    
    while (node) {
        const { left, right } = node;
        
        last.next = left;
        
        if (left) {
            left.next = right;
        }
        if (!right) {
            break;
        }
        
        last = right;
        node = node.next;
    }
    
    left && _connect(left);
};