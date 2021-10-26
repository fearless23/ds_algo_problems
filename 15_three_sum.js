const log = (...args) => {
  console.log(...args)
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  
  nums = nums.sort((a, b) => a - b)
  const next_index = (i) => {
    const num = nums[i];
    let ni = i + 1;
    while (nums[ni] === num) {
      ni += 1;
    }
    return ni;
  }
  const triplets = []

  let start = [{ sum: 0, nums: [], i: 0 }]

  while (start.length > 0) {
    const new_poss = []
    start.forEach(x => {
      if (x.i < nums.length) {
        const num = nums[x.i];
        const next_i = next_index(x.i)
        if (x.nums.length < 2) {
          const p1 = { sum: x.sum + num, nums: [...x.nums, num], i: next_i };
          const p2 = { sum: x.sum, nums: x.nums, i: next_i };
          new_poss.push(p1, p2)
        }
        if (x.nums.length === 2) {
          if (x.sum + num === 0) triplets.push([...x.nums, num])
          new_poss.push({ sum: 0, nums: [], i: x.i + 1 })

          const p2 = { sum: x.sum, nums: x.nums, i: next_i };
          new_poss.push(p2)
        }
      }
    })
    start = new_poss;
  }

  return triplets;
};
// Binary Search - Better and easy
const threeSum2 = function (nums) {
  // Base Cases  
  if (nums.length < 3) return [];
  
  // Initially sort the array
  nums = nums.sort((a, b) => a - b)
  
  // check if first number > 0, then rest will be also > 0, so not possible to find triplets
  if(nums[0] > 0) return []  

  const next_index = (i) => {
    let ni = i + 1;
    while (nums[ni] === nums[i]) {
      ni += 1;
    }
    return ni;
  }

  const triplets = []

  // length = 6 [a,b,c,d,e,f], max i = 3 ==> i < 4
  for (let i = 0; i < nums.length - 2; i++) {
    // length = 6 [a,b,c,d,e,f], max j = 4 ==> i < 5
    for (let j = i + 1; j < nums.length - 1; j++) {
      const target = -1 * (nums[i] + nums[j])

      // search for target in j+1 to j max (sorted) ==> Regular Binary Search
      let left = j + 1;
      let right = nums.length - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const mid_num = nums[mid];
        if(mid_num === target){
          // found a solution
          triplets.push([nums[i], nums[j], nums[mid]])
          break; // break while loop
        }
        else if (mid_num > target){
          // solution lies in first half
          right = mid - 1;
        }
        else{
          // solution lies in second half
          left = mid + 1;
        }
      }

      // After running Binary Search, we can get a solution or may be not
      // in all the cases, move j to next integer
      // if nums[j] = 1, then move j to a position new_j such that nums[new_j] !== 1
      // i.e jump over same values, as we tried with nums[i], nums[j]
      j = next_index(j) - 1; // we have j++ in loop, so thats why subtract 1
    }
    i = next_index(i) - 1; // we have j++ in loop, so thats why subtract 1
  }

  return triplets;
};


const numbers = [-1, 0, 1, 2, -1, -4]
const result = threeSum2(numbers)
console.log('result --> ', result)