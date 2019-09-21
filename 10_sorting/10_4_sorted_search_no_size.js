function Listy() {
  this.list = [];
}

Listy.prototype.elementAt = function(index) {
  return Number.isNaN(this.list[index]) ? -1 : this.list[index];
};

function _lenBetween(listy, left, right) {
  const mid = Math.floor((left + right) / 2);
  const midVal = listy.elementAt(mid);
  const midNeighbor = listy.elementAt(mid + 1);

  if (midVal !== -1 && midNeighbor === -1) {
    return mid + 1; // 0 index length is 1 greater than curr index
  }

  if (midVal === -1) {
    // too far, go left
    _lenBetween(listy, left, mid - 1);
  } else {
    // go right
    _lenBetween(listy, mid + 1, right);
  }
}

function len(listy, index = 0) {
  const curr = listy.elementAt(index);

  // if (curr !== -1 && listy.elementAt(index + 1) === -1) {
  //   return index + 1; // length is one greater than the curr index since its 0 indexed
  // }

  if (curr === -1) {
    /**
     * This means index / 2 was a valid entry and the size lies between these two
     */
    return _lenBetween(listy, index / 2, index);
  } else {
    return len(listy, index * 2);
  }
}
