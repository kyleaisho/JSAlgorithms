function Heap() {
  this._heap = [null];
}

Heap.prototype = {
  insert(val) {
    this._heap.push(val);
    this.bubbleUp(this._heap.length - 1);
  },

  getParentIndex(idx) {
    return Math.floor(idx / 2);
  },

  bubbleUp(idx) {
    const parentIdx = this.getParentIndex(idx);
    const curr = this._heap[idx];
    const parent = this._heap[parentIdx];

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
    const { left = Number.POSITIVE_INFINITY, right = Number.POSITIVE_INFINITY } = this.getChildren(k);

    const curr = this._heap[k];
    const leftChild = 2 * k;

    const next = left < right ? leftChild : leftChild + 1;

    if (curr > this._heap[next]) {
      this.swap(k, next);
      this.bubbleDown(next);
    }

    // if (right !== undefined && right !== null && curr > left) {
    // } else if (right !== undefined && right !== null && curr > right) {
    //   this.swap(k, leftChild + 1);
    //   this.bubbleDown(leftChild + 1);
    // }
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
