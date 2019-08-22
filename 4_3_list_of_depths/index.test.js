
const { treeFromArray, findTreeHeight } = require('../utilities/Tree');
const { createDepthLists } = require('./index');

describe('List of Depths', () => {
    it('has a depth of 2', () => {
        const root = treeFromArray([1,2,3]);
        const list = [];
        createDepthLists(root, list);
        expect(findTreeHeight(root)).toEqual(list.length);
    })

    it('has a depth of 4', () => {
        const root = treeFromArray([1,2,3,4,5,6,7,8,9,11,12]);
        const list = [];
        createDepthLists(root, list);
        expect(findTreeHeight(root)).toEqual(list.length);
    })
})