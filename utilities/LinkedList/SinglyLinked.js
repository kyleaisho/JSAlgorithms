const { Node } = require('./Node');

function SinglyLinkedList(elements) {
  if (!elements) return;
  if (!Array.isArray(elements)) {
    elements = [elements];
  }

  elements.map(this.insert.bind(this));
}

SinglyLinkedList.prototype.insert = function(data) {
  const node = new Node(data);
  const tmp = this._root;

  this._root = node;
  node.setNext(tmp);
};

SinglyLinkedList.prototype.insertAtEnd = function(data) {
  const node = new Node(data);

  if (!this._root) {
    this._root = new Node(data);
    return;
  }

  const { prev: endNode } = this.search(null, true);

  endNode.setNext(node);
};

SinglyLinkedList.prototype.search = function(data, findEnd = false) {
  if (!this._root) throw new Error('Empty list');

  let prev = this._root;
  let curr = this._root.getNext();

  const updatePointers = () => {
    prev = curr;
    curr = curr.getNext();
  }

  while (curr) {
    if (!findEnd && curr.getData() === data) {
      break;
    }

    updatePointers();
  }

  return { curr, prev };
};

SinglyLinkedList.prototype.remove = function(data) {
  if (!this._root) return null;

  const { prev, curr } = this.search(data);
  
  if (!curr) {
    return null;
  }

  prev.setNext(curr.getNext());

  return curr;
}

SinglyLinkedList.prototype.toArray = function() {
  const arr = [];
  let node = this._root;

  while (node) {
    arr.push(node.getData());
    node = node.getNext();
  }

  return arr;
}

SinglyLinkedList.prototype.print = function() {
  const arr = this.toArray().map(e => `[${e}] -> `);
  console.log(arr.join(''))
};

module.exports = {
  SinglyLinkedList
};
