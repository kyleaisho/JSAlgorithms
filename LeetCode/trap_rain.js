/**
 * @param {number[]} height
 * @return {number}
 */

function Node(index, height) {
  this.index = index;
  this.next = new Array(height);
}

function getWater(node1, node2) {
  return node2.index - node1.index - 1;
}

var trap = function(height) {
  const nodes = build(height);
  return calculateWater(nodes);
};

const build = heights => {
  const nodes = new Array(heights.length);
  const unlinked = {};
  // Use a structure similar to a skip list with pointers
  // to the next node with the same height

  // Build the nodes
  for (let i = 0; i < heights.length; i++) {
    const height = heights[i];

    if (height === 0) continue;

    const node = new Node(i, height);

    // check to see if this node matches
    // any of the unmatched previous node pointers
    for (let j = 0; j < height; j++) {
      const prevNodeIndex = unlinked[j];
      if (isNaN(prevNodeIndex)) {
        continue;
      } else {
        // Get the previous node that has not been
        // matched at this height
        const prevNode = nodes[prevNodeIndex];
        // Set that node at its height pointing to this node
        prevNode.next[j] = node;
        delete unlinked[j];
      }
    }

    // Keep a reference to this node for
    // each of its heights so we can refer
    // back to it
    for (let j = 0; j < height; j++) {
      unlinked[j] = i;
    }

    nodes[i] = node;
  }

  return nodes;
};

const calculateWater = nodes => {
  // Walk along the nodes calculating the difference
  let water = 0;

  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];

    if (!node) continue;

    node.next.forEach(nextNode => {
      if (nextNode) {
        water += nextNode.index - node.index - 1;
      }
    });
  }

  return water;
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));