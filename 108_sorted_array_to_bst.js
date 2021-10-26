// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}
/**
* @param {number[]} nums
* @return {TreeNode}
*/
var sortedArrayToBST = function (nums) {
  // const full_rows = nearestPowerOf2(nums.length) // these rows will be filled

  if (nums.length === 0) return null; // ??

  const { mid, lesser, larger } = divide_at_middle(nums)
  const tree = new TreeNode(mid)
  tree.left = sortedArrayToBST(lesser)
  tree.right = sortedArrayToBST(larger)
  return tree;

};

const nearestPowerOf2 = (x) => {
  const l = Math.log(x) / Math.log(2);
  return Math.floor(l);
}

const divide_at_middle = (nums) => {
  const m = Math.floor(nums.length / 2)
  const mid = nums[m];
  const lesser = nums.slice(0, m);
  const larger = nums.slice(m + 1);
  return { mid, lesser, larger }
}

const arr = [-10,-3,0,5,9]
const result = sortedArrayToBST(arr)
console.log(`result --> `, JSON.stringify(result, null, 2))

