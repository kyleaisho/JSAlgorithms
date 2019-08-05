/**
 * Given a binary tree, design an algorithm which creates a linked list of all the
 * nodes at each depths
 */

/**
 * Since we are dealing with 'each depth' binary search makes the most sense
 * since it deals with an entire depth before moving on. We will then use an
 * ancillary array to keep track of the roots for each depth
 */

const LL = require('../utilities/LinkedList/SinglyLinked');
