const _ = require('lodash');
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.ll = new DoublyLinkedList();
    this.map = new Map();
    this.capacity = capacity;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    const node = this.map.get(key);

    if (node) {
        this.ll.touch(node);

        return node.val;
    } else {
        return -1;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    if (this.map.has(key)) {
        const node = this.map.get(key);
        node.val = value;
        this.ll.touch(node);
        return;
    }
    if (this.capacity < 1) this.evict();

    const node = new Node(value, key);
    this.ll.insert(node);
    this.map.set(key, node);

    this.capacity -= this.capacity > 0 ? 1 : 0;
};

LRUCache.prototype.evict = function () {
    const node = this.ll.deleteLast();
    this.map.delete(node.key);
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

function Node(val, key) {
    this.val = val;
    this.key = key;
    this.prev = null;
    this.next = null;
}

function DoublyLinkedList() {
    this.front = null;
    this.back = null;
}

DoublyLinkedList.prototype = {
    insert(node) {

        if (!this.root) {
            this.root = node;
            this.back = node;
        } else {
            // Keep the root in a tmp variable
            const tmp = this.root;

            // Move the new node to the front of the list
            this.root = node;

            // Update the next to point to the old root
            this.root.next = tmp;

            // update the old root's prev to point to the new root
            tmp.prev = this.root;

            // this.back will not need to be adjusted
        }
    },

    deleteLast() {
        return this.delete(this.back);
    },

    delete(node) {
        if (!node) return node;

        if (node === this.root) {
            this.root = null;
            this.back = null;
        } else if (node === this.back) {
            this.back = this.back.prev;
        } else {
            node.prev.next = node.next
        }

        return node;
    },

    touch(node) {
        this.insert(this.delete(node));
    }
}

const commands = ["LRUCache", "put", "put", "put", "put", "put", "get", "put", "get", "get", "put", "get", "put", "put", "put", "get", "put", "get", "get", "get", "get", "put", "put", "get", "get", "get", "put", "put", "get", "put", "get", "put", "get", "get", "get", "put", "put", "put", "get", "put", "get", "get", "put", "put", "get", "put", "put", "put", "put", "get", "put", "put", "get", "put", "put", "get", "put", "put", "put", "put", "put", "get", "put", "put", "get", "put", "get", "get", "get", "put", "get", "get", "put", "put", "put", "put", "get", "put", "put", "put", "put", "get", "get", "get", "put", "put", "put", "get", "put", "put", "put", "get", "put", "put", "put", "get", "get", "get", "put", "put", "put", "put", "get", "put", "put", "put", "put", "put", "put", "put"]
const args = [[10], [10, 13], [3, 17], [6, 11], [10, 5], [9, 10], [13], [2, 19], [2], [3], [5, 25], [8], [9, 22], [5, 5], [1, 30], [11], [9, 12], [7], [5], [8], [9], [4, 30], [9, 3], [9], [10], [10], [6, 14], [3, 1], [3], [10, 11], [8], [2, 14], [1], [5], [4], [11, 4], [12, 24], [5, 18], [13], [7, 23], [8], [12], [3, 27], [2, 12], [5], [2, 9], [13, 4], [8, 18], [1, 7], [6], [9, 29], [8, 21], [5], [6, 30], [1, 12], [10], [4, 15], [7, 22], [11, 26], [8, 17], [9, 29], [5], [3, 4], [11, 30], [12], [4, 29], [3], [9], [6], [3, 4], [1], [10], [3, 29], [10, 28], [1, 20], [11, 13], [3], [3, 12], [3, 8], [10, 9], [3, 26], [8], [7], [5], [13, 17], [2, 27], [11, 15], [12], [9, 19], [2, 15], [3, 16], [1], [12, 17], [9, 1], [6, 19], [4], [5], [5], [8, 1], [11, 7], [5, 2], [9, 28], [1], [2, 2], [7, 4], [4, 22], [7, 24], [9, 26], [13, 28], [11, 26]]

function run(arr = []) {
    let cache;
    commands.forEach((command, i) => {
        const arg = args[i];
        if (command === 'get') {
            arr.push(cache.get(...arg));
        } else if (command === 'put') {
            cache.put(...arg);
            arr.push(null)
        } else {
            cache = new LRUCache(...arg);
            arr.push(null);
        }
    });

    return arr;
}

const ans = run()
console.log(ans)
// ["LRUCache","put","put","put","put","put","get","put","get","get","put","get","put","put","put","get","put","get","get","get","get","put","put","get","get","get","put","put","get","put","get","put","get","get","get","put","put","put","get","put","get","get","put","put","get","put","put","put","put","get","put","put","get","put","put","get","put","put","put","put","put","get","put","put","get","put","get","get","get","put","get","get","put","put","put","put","get","put","put","put","put","get","get","get","put","put","put","get","put","put","put","get","put","put","put","get","get","get","put","put","put","put","get","put","put","put","put","put","put","put"]
// [[10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]]
// [null,null,null,null,null,null,-1,null,19,17,null,-1,null,null,null,-1,null,-1,5,-1,12,null,null,3,5,5,null,null,1,null,-1,null,30,5,30,null,null,null,-1,null,-1,24,null,null,18,null,null,null,null,14,null,null,-1,null,null,-1,null,null,null,null,null,-1,null,null,24,null,4,29,30,null,12,-1,null,null,null,null,29,null,null,null,null,17,22,-1,null,null,null,24,null,null,null,20,null,null,null,29,-1,-1,null,null,null,null,20,null,null,null,null,null,null,null]
// [null,null,null,null,null,null,-1,null,19,17,null,-1,null,null,null,-1,null,-1,5,-1,12,null,null,3,5,5,null,null,1,null,-1,null,30,5,30,null,null,null,-1,null,-1,24,null,null,18,null,null,null,null,-1,null,null,18,null,null,-1,null,null,null,null,null,18,null,null,-1,null,4,29,30,null,12,-1,null,null,null,null,29,null,null,null,null,17,22,18,null,null,null,-1,null,null,null,20,null,null,null,-1,18,18,null,null,null,null,20,null,null,null,null,null,null,null]