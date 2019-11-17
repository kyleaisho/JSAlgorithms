Heap.prototype = {
  insert(node) {
    this._heap.push(node);
    this.bubbleUp(this._heap.length - 1);
  },

  getParentIndex(idx) {
    return Math.floor(idx / 2);
  },

  bubbleUp(idx) {
    const parentIdx = this.getParentIndex(idx);
    const { val: curr } = this._heap[idx];
    const { val: parent } = this._heap[parentIdx];

    if (curr < parent) {
      // swap the two and call again with new poistion
      this.swap(idx, parentIdx);
      this.bubbleUp(parentIdx);
    }
  },

  getChildren(k) {
    // Children are located at 2*k and 2*k+1
    const left = this._heap[2 * k];
    const right = this._heap[2 * k + 1];

    return { left, right };
  },

  bubbleDown(k) {
    const { left = { val: Number.POSITIVE_INFINITY }, right = { val: Number.POSITIVE_INFINITY } } = this.getChildren(k);

    const { val: curr } = this._heap[k];
    const leftChild = 2 * k;

    const next = left.val < right.val ? leftChild : leftChild + 1;
    const { val: nextVal } = this._heap[next];

    if (curr > nextVal) {
      this.swap(k, next);
      this.bubbleDown(next);
    }
  },

  swap(idx1, idx2) {
    const tmp = this._heap[idx1];
    this._heap[idx1] = this._heap[idx2];
    this._heap[idx2] = tmp;
  },

  deleteMin() {
    if (this._heap.length <= 2) {
      return this._heap.pop();
    }

    const last = this._heap.pop();
    const min = this._heap[1];
    this._heap[1] = last;
    this.bubbleDown(1);

    return min;
  }
};

const