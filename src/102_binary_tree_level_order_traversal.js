/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
export const levelOrder = function (root) {
  // special case: no root
  if (!root || root.val === undefined) return [];

  const trees = [root];
  const nodes = [];

  return exec(trees, nodes);
};

const exec = (trees, nodes) => {
  if (trees.length === 0) return nodes;

  const level_nodes = [];
  const next_level_trees = [];
  for (const tree of trees) {
    level_nodes.push(tree.val);
    if (tree.left) next_level_trees.push(tree.left);
    if (tree.right) next_level_trees.push(tree.right);
  }
  nodes.push(level_nodes);
  return exec(next_level_trees, nodes);
};
