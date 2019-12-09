const createNode = (val) => ({
    val,
    left: null,
    right: null,
});

const treeFromArray = (arr) => {
    if (arr.length === 0) return null;
    if (arr.length === 1) return createNode(arr[0]);

    const mid = Math.floor(arr.length / 2);
    const node = createNode(arr[mid]);

    node.left = treeFromArray(arr.slice(0, mid));
    node.right = treeFromArray(arr.slice(mid + 1));

    return node;
};

const findTreeHeight = (root) => {
    if (!root) return 0;

    return 1 + Math.max(
        findTreeHeight(root.left),
        findTreeHeight(root.right)
    );
}; 

module.exports = {
    findTreeHeight,
    treeFromArray,
};