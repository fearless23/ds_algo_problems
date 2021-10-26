//  Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  const root = preorder[0]
  const tree_root = new TreeNode(root)

  if (preorder.length === 1) return tree_root;

  // inorders
  const i = inorder.indexOf(root)
  const left_tree_inorder = inorder.slice(0, i)
  const right_tree_inorder = inorder.slice(i + 1)

  // preorders
  const j = left_tree_inorder.length;
  const left_tree_preorder = preorder.slice(1, 1 + j)
  const right_tree_preorder = preorder.slice(1 + j)

  if (left_tree_preorder.length > 0) tree_root.left = buildTree(left_tree_preorder, left_tree_inorder)
  if (right_tree_preorder.length > 0) tree_root.right = buildTree(right_tree_preorder, right_tree_inorder)
  return tree_root;
};

const pre = [1, 2, 3]
const inn = [3, 2, 1]
const tree = buildTree(pre, inn)
console.log('tree --> ', JSON.stringify(tree, null, 2))