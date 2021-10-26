/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
  const add = add_num(nums);
  const final = [[]];
  let latest = [{ arr: [], last: -1 }];

  for (let l = 1; l < nums.length; l++) {
    const n = [];
    latest.forEach(k => {
      add(k).forEach(x => {
        n.push(x);
        final.push(x.arr);
      });
    });
    latest = n;
  }
  final.push(nums);
  return final;
};

const add_num = (nums) => ({ arr, last }) => {
  // arr = [1,2], last = 2
  const next = [];
  for (let i = last + 1; i < nums.length; i++) {
    next.push({ arr: [...arr, nums[i]], last: i });
  }
  return next;
};

const numbers = [1, 2, 3];
const result = subsets(numbers);
console.log('result --> ', result);
