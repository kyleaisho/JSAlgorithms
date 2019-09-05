/**
 * Return the powerset of a set
 * Powerset is the set of all sets including the
 * current set and the empty set
 * 
 */

/**
 * To complete this we will use recursive backtracking
 * The algorithm will be:
 *  1. Create a container
 *  2. choose a member of the set and remove them from the set
 *  3. recursively explore with that member added to the container AND
 *      with that member not added to the container
 *  4. When all items have been chosen (i.e. the input set is empty) add the
 *      container into the set of sets
 */

 function getPowerSet(set, powerSet, tmp = []) {
    if (set.length === 0) {
        powerSet.push(tmp);
    } else {
        // Choose
        const item = set.pop();
        
        // explore without the item
        getPowerSet(s, powerSet, tmp.slice());
    
        // explore with the item
        tmp.push(item)
        getPowerSet(s, powerSet, tmp.slice());
    
        // unchose
        set.push(item);
        tmp.pop();
    }

 }

 const s = ['Jane', 'Bob', 'Matt', 'Sara'];
 const powerSet =[];
getPowerSet(s, powerSet);
console.log(powerSet);