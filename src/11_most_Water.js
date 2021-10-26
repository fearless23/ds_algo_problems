
export const maxArea2 = function (H) {
  // T.C => O(n^2)
  let max_area = 0;

  for (let i = 0; i < H.length - 1; i++) {
    for (let j = i + 1; j < H.length; j++) {
      max_area = Math.max(Math.min(H[i], H[j]) * (j - i), max_area);
    }
  }

  return max_area;
};

const maxArea = function (H) {
  let l = 0;
  let r = H.length - 1;
  let max_area = 0;

  while (l < r) {
    max_area = Math.max(max_area, Math.min(H[l], H[r]) * (r - l));
    // If left height is bigger we will keep it, bcz it will give better height, move right
    // and vice-versa for right height
    if (H[l] > H[r]) r -= 1;
    else l += 1;
  }

  return max_area;
};

const numbers = [1, 8, 6, 2, 5, 4, 8, 3, 7];
const result = maxArea(numbers);
console.log('result --> ', result);
