const { Node } = require('./Node');
const { SinglyLinkedList } = require('./SinglyLinked');

describe('Linked list', () => {
  it('Creates a node', () => {
    const node = new Node('data');

    expect(node instanceof Node).toBe(true);
    expect(node.getData()).toEqual('data');
    expect(node.getNext()).toBeNull();
    expect(node.getPrev()).toBeNull();
  });

  describe('SinglyLinked', () => {
    const listOfData = ['a', 'b', 'c', 'd'];
    let ll;

    beforeEach(() => {
      ll = new SinglyLinkedList(listOfData);
    });

    it('search returns null for elements not found', () => {
      const { curr } = ll.search('g');

      expect(curr).toBeFalsy();
    });
    
    it('search returns node for element found', () => {
      const { curr } = ll.search('c');

      expect(curr.getData()).toEqual('c');
    });

    it('remove an element from the list', () => {
      const node = ll.remove('b');

      expect(node.getData()).toEqual('b');
      expect(ll.toArray()).toEqual(['d', 'c', 'a'])
    });
  });

  xdescribe('DoublyLinked', () => {});
});
