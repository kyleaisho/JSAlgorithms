const MIN = Number.NEGATIVE_INFINITY;
const MAX = Number.POSITIVE_INFINITY;

function isBST(root, min = MIN, max = MAX) {
    if(!root) return true;
    if (root.data > max || root.data < min) return false;

    return isBST(root.left, root.data, max) && 
           isBST(root.right, min, root.data);
}