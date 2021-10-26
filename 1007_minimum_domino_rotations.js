/**
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */
const minDominoRotations = (tops, bottoms) => {
  // bottoms => [5,2,6,2,2,3]
  // tops    => [2,1,2,4,2,2]

  // strategy: 
  const faces = tops.length;
  const top = {}; // S = O(n)
  for (let i = 0; i < faces; i++) {
    const v = tops[i]
    if (!top[v]) top[v] = { indices: {}, top: 0, bottom: 0, total: 0 }
    top[v].indices[i] = true;
    top[v].top += 1;
    top[v].total += 1;
    if (top[v].total === faces) return 0;
  }

  let min_rotations = null;

  for (let i = 0; i < faces; i++) {
    const v = bottoms[i]
    if (top[v]) {
      if (!top[v].indices[i]) top[v].total += 1; // avoid duplicates

      top[v].indices[i] = true;
      top[v].bottom += 1;

      
      if (top[v].total === faces) {
        const rotations = faces - Math.max(top[v].bottom, top[v].top)
        if(min_rotations === null || rotations < min_rotations) min_rotations = rotations;
      }
    }
  }

  return min_rotations === null ? - 1: min_rotations
};


const _tops = [2, 1, 2, 4, 2, 2]
const _bottoms = [5, 2, 6, 2, 3, 2]
const result = minDominoRotations(_tops, _bottoms);
console.log(`result --> `, result)