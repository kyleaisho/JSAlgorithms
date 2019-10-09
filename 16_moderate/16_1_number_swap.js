/**
 * Write a function to swap numbers in place without tmp variables
 * 
 * 1. you have 2 variables which are ints
 * 2. The end result should be a = b and b = a
 * 
 * To do this we need a way to convert between a and b, if we know the difference
 * between the two numbers we can translate between them
 */


 // Numbers are pass by value so in JS the outer scope wont change
 // but the algorithm works the same
 function swap(a, b) {
     // Store the diff in a, we still haven't lost
     // the value a since b + a === original A
     a = a - b;
     b = b + a;
     a = b - a;
 }
