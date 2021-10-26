/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = (candidates, target) => {
  const add = add_to_combo(candidates, target);
  // candidates = [2,3,6,7] => infinite 2`s, 3`s, 6`s , 7`s
  let combos = [{ combo: [], sum: 0, last: 0 }];
  const final = [];
  while (combos.length > 0) {
    const new_combos = [];
    combos.forEach(c => {
      const j = add(c);
      final.push(...j.final);
      new_combos.push(...j.combos);
    });
    combos = new_combos;
  }
  return final;
};

const add_to_combo = (candidates, target) => ({ combo, sum, last }) => {
  // return new possible combos
  // combo: [2,3]
  // sum: 5
  // target: 7
  // add any one of the candidate
  const combos = [];
  const final = [];
  for (let i = last; i < candidates.length; i++) {
    const candidate = candidates[i];
    const new_combo = [...combo, candidate];
    if (sum + candidate < target) combos.push({ combo: new_combo, sum: sum + candidate, last: i });
    if (sum + candidate === target) final.push(new_combo);
  }
  return { final, combos };
};

const run = () => {
  // const result = combinationSum([2, 3, 5], 8)
  const result = combinationSum([2], 1);
  console.log(result);
};

export default run;
