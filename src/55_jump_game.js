/**
 * // T.C = High
 * @param {number[]} nums
 * @return {boolean}
 */
export const canJump1 = function (nums) {
  const end = String(nums.length - 1);

  const move = (i) => {
    const k = Number(i);
    const moves = Math.min(nums[k], nums.length - k - 1);
    const pos = [];
    for (let j = 1; j <= moves; j++) pos.push(String(k + j));
    return pos;
  };

  let pos = ['0'];
  let reachable = 0;

  while (pos.length > 0) {
    console.log('pos -->', pos);
    const new_pos = {};

    pos.forEach(p => {
      const x = move(p);
      console.log(`move, ${p}`, x);
      x.forEach(i => {
        if (i === end) {
          // return true;
          reachable += 1;
          // break;
        } else {
          new_pos[i] = true;
        }
      });
    });

    pos = Object.keys(new_pos);
  }

  return reachable > 0;
};

/**
 * Recursive with memo
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump2 = function (nums) {
  const e = nums.length - 1;
  const memo = {};

  const run = (s) => {
    if (s in memo) return memo[s];
    if (s === e) return true;

    const moves = Math.min(nums[s], e - s);

    for (let i = 1; i <= moves; i++) {
      const possible = run(s + i);
      if (possible) {
        memo[s] = true;
        return true;
      }
    }
    memo[s] = false;
    return false;
  };

  return run(0);
};

const numbers = [3, 2, 1, 0, 4];
const result = canJump2(numbers);
console.log('result --> ', result);
