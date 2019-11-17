
 // Definition for a binary tree node.
 function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
* @param {number[]} preorder
* @param {number[]} inorder
* @return {TreeNode}
*/
var buildTree = function(preorder, inorder) {
  // Use the post order to decide the root
  // The after having the root us in order to seperate the L and R sub children
  if (!preorder.length) return null;
  
  const root = new TreeNode(preorder.shift());
  
  const leftIn = [];
  const leftPre = [];
  const rightIn = [];
  const rightPre = [];
  const left = {};
  
  for (let i = 0, found = false; i < inorder.length; i++) {
      if (inorder[i] === root.val) {
          found = true;
          continue;
      }
      
      if (found) {
          rightIn.push(inorder[i]);
      } else {
          left[inorder[i]] = true;
          leftIn.push(inorder[i]);
      }
  }
                                            
  for (let i = 0; i < preorder.length; i++) {
      if (left[preorder[i]]) {
          leftPre.push(preorder[i]);
      } else {
          rightPre.push(preorder[i]);
      }
  }
  
  root.left = buildTree(leftPre, leftIn);
  root.right = buildTree(rightPre, rightIn);
  
  return root;
};