/**
 * Given a binary tree, design an algorithm which creates a linked list of all the
 * nodes at each depths
 */

const { SinglyLinkedList } = require('../utilities/LinkedList/SinglyLinked');

function createDepthLists(root, list, depth = 0) {
    if (!root) {
        return;
    }

    while (!list[depth]) {
        list.push(new SinglyLinkedList());
    }

    const ll = list[depth];

    ll.insertAtEnd(root.data);

    createDepthLists(root.left, list, depth + 1);
    createDepthLists(root.right, list, depth + 1);
}

module.exports = {
    createDepthLists,
};
