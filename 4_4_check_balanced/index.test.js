const { treeFromArray } = require('../utilities/Tree');
const { isBalanced } = require('./index');

describe('Balanced', () => {
    it('has a depth of 4', () => {
        const root = treeFromArray([1,2,3,4,5,6,7,8,9,11,12]);
        expect(isBalanced(root)).toBe(true);
    })
});

describe('Not Balanced', () => {
    it('has a depth of 4', () => {
        const root = treeFromArray([4,1,5,2,7,3,9,5,3,4,5,19]);
        root.right = treeFromArray([4,1,5,2,7,3,9,5,3,4,5,19]);
        expect(isBalanced(root)).toBe(false);
    })
});