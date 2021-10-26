/*
Given an array of integers, split it into two arrays such that difference b/w sum of two arrays is minimum
*/

const split = (arr = []) => {
  const e = arr.length - 1;

  const run = (y, s) => {
    if (s > e) return Math.abs(y);
    // go left
    const d1 = run(y + arr[s], s + 1);
    // go right
    const d2 = run(y - arr[s], s + 1);

    return Math.min(d1, d2);
  };

  return run(0, 0);

  //  l - r = Y
  //  (l + x) - r = Y + x
  //  l - (r + x) = Y - x
};

const nums = [1, 2, 3, 4, 5];
const result = split(nums);
console.log('result --> ', result);

// [1,2,3,4,5]

/*
L = []    R = []

i = 0, v = 1 ==> L=2, R=0, D=2
i = 1, v = 2 ==> L/R  L=2, R=0, D=2
i = 2, v = 3 ==> L=2, R=0, D=2
i = 3, v = 4 ==> L=2, R=0, D=2
i = 4, v = 5 ==> L=2, R=0, D=2

*/
