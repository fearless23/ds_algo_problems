/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function (nums) {
  let groups = [];

  let g = nums[0];
  let group_positive = nums[0] >= 0;
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    const num_positve = num >= 0;
    if (group_positive === num_positve) {
      // same group
      g += num;
    } else {
      // change
      groups.push(g);
      // reset
      g = num;
      group_positive = num >= 0;
    }
  }
  groups.push(g);

  // console.log(groups)
  if (groups[0] < 0) groups = groups.slice(1);
  if (groups[groups.length - 1] < 0) groups = groups.slice(0, groups.length);

  let max_sum = 0;
  for (let i = 0; i < groups.length; i = i + 2) {
    let n = groups[i];

    // forwards
    for (let j = i + 1; j < groups.length; j = j + 2) {
      const next_two_sum = groups[j] + groups[j + 1];
      if (next_two_sum >= 0) n += next_two_sum;
      else break;
    }
    // backwards
    for (let k = i - 1; k < 0; k = k - 2) {
      const prev_two_sum = groups[k] + groups[k - 1];
      if (prev_two_sum >= 0) n += prev_two_sum;
      else break;
    }

    if (n > max_sum) max_sum = n;
  }

  return max_sum;
};

console.log(maxSubArray([5, 4, -1, 7, 8]));
