function findInOrderSuccessor(node) {
    if (node === null) return node;

    if (node.right) return leftMost(node.right);

    // Move back up the tree until we're to the left of our parent
    let parent = node.parent;
    let current = node;

    while (parent && current !== parent.right) {
        current = parent
        parent = parent.parent;
    }

    return parent;
}

function leftMost(node) {
    while (node) {
        node = node.left;
    }

    return node;
}