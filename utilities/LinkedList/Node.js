function Node(data) {
  this._data = data;
  this._next = null;
  this._prev = null;
}

Node.prototype.getData = function() {
  return this._data;
};
Node.prototype.getNext = function() {
  return this._next;
};
Node.prototype.getPrev = function() {
  return this._prev;
};
Node.prototype.setNext = function(node) {
  this._next = node;
};
Node.prototype.setPrev = function(node) {
  this._prev = node;
};

module.exports = {
  Node
};
