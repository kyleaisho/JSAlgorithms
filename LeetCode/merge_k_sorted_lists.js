/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

const insertNode = (node, root, back) => {
    if (!root) {
        root = node;
        back = node;
    } else {
        back.next = node;
        back = node;
    }
    
    return [root, back];
}

var mergeKLists = function(lists, root = null, back = null) {
    if (!lists.length) return root;
    
    // Grab the front of each list, compare and then pull off the node
    // which is the smallest
    let smallest = Number.POSITIVE_INFINITY;
    let smallestIdx = 0;
    for (let i = 0; i < lists.length; i++) {
        const node = lists[i];
        
        if (node && node.val < smallest) {
            smallest = node.val;
            smallestIdx = i;
        }
    }
    
    // Now we have the smallest value lets remove it from the list
    // and append it to the new one
    const node = lists[smallestIdx];
    // console.log(node)
    if (!node) return root;
    
    // Delete the root of that list
    lists[smallestIdx] = node.next;
    
    // If that list is now empty we need to do maintenance on the original array
    if (!node.next) {
        lists = lists.filter(node => !!node);
    }
    
    // Insert the smallest node
    [ root, back ] = insertNode(node, root, back);
    

    
    return mergeKLists(lists, root, back);
};