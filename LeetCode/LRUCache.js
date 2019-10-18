/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cap = capacity;
    this.list = new DLL();
    this.cache = {};
};

LRUCache.prototype.evict = function() {
    if (this.cap > 0) return;

    const node = this.list.delete(this.list.back);
    
    if (node) {
        delete this.cache[node.key];
    }

    this.cap++;
}

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    const node = this.cache[key];
    
    if (!node) return -1;
    
    this.list.moveToStart(node);
    return node.val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    this.evict();
    
    const node = new Node(value, key);
    this.list.insert(node);
    this.cache[key] = node;
    this.cap--;
};

function Node(val, key) {
    this.val = val;
    this.key = key
    this.next = this.prev = null;
}

function DLL(node) {
    this.root = node || null;
    this.back = this.root;
    
    this.insert = function(node) {
        if (!node) return;

        const oldRoot = this.root;
        this.root = node;
        node.next = oldRoot;
        if (!this.back) this.back = node;
        if (oldRoot) oldRoot.prev = node;
    }
    
    this.delete = function(node) {
        if (!node) return;
        
        const prev = node.prev || {};
        const next = node.next || {};
        
        prev.next = next;
        next.prev = prev;
        
        if (node === this.back) {
            this.back = node.prev;
        }
        
        return node;
    }
    
    this.moveToStart = function(node) {
        if (!node) return;
        
        this.insert(this.delete(node));
    }
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const commands = ["LRUCache","get","put","get","put","put","get","get"]

const params = [[2],[2],[2,6],[1],[1,5],[1,2],[1],[2]];

let lru;
commands.forEach((c, i) => {
    if (c === "LRUCache") {
        lru = new LRUCache(...params[i]);
    } else {
        if (c === "put") lru.put(...params[i]);
        else console.log(lru.get(...params[i]));
    }
});