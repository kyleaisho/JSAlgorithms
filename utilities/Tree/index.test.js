const { findTreeHeight, treeFromArray } = require('./index');

describe('findTreeHeight', () => {
    it('on a balanced tree', () => {
        const root = treeFromArray([1,2,3,4,5]);
    
        expect(findTreeHeight(root)).toEqual(3);
    });
});