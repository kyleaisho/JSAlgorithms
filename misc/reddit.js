/**
 * Given a list of child -> parent ids
 * Create a list of root nodes where and nodes nested deeper than
 * 5 levels is converted into a root
 
 (1) -> (2) -> (3) -> (4) -> (6) -> (7) -> (8)
                       |
                      (5)

 (9)
 */
const { isEqual } = require('lodash')

function createMapping(listNodes) {
    const map = {};

    for (let i = 0; i < listNodes.length; i++) {
        const [ id, parent ] = listNodes[i];

        if (!map[parent]) {
            map[parent] = [];
        }
        if (!map[id]) {
            map[id] = [];
        }

        map[parent].push(id);
    }

    const roots = map[null];

    for (let i = 0; i < roots.length; i++) {
        flatten(map, roots[i], 0, 1);
    }

    return map[null];
}

function flatten(map, parent, index, depth) {
    const nodes = map[parent];
    if (!parent || !nodes) return;

    if (depth > 5) {
        map[parent] = nodes.slice(0, index - 1);
        map[null].push(...nodes.slice(index - 1));
        return;
    }

    while (nodes.length + depth > 5) {
        map[null].push(nodes.shift());
    }

    nodes.forEach((child, i) => {
        flatten(map, child, i, depth + nodes.length);
    });
}

 const listNodes = [
     [2,1],
     [3,2],
     [4,3],
     [5,4],
     [6,4],
     [7,6],
     [8, 7],
     [1, null],
     [9, null]
 ];

 const listNodes2 = [
    [2,1],
    [3,2],
    [4,3],
    [11,3],
    [12,3],
    [5,4],
    [6,4],
    [7,6],
    [8, 7],
    [13, 7],
    [14, 7],
    [1, null],
    [9, null]
];

console.log(createMapping(listNodes))
console.assert(isEqual(createMapping(listNodes), [1,9,7]), 'Not equal');
console.log(createMapping(listNodes2))
console.assert(isEqual(createMapping(listNodes2), [ 1, 9, 4, 8, 13 ]), 'Not equal');