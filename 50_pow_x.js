/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
 var myPow = function(x, n) {
  // return Math.pow(x,n)
  if(n === 0) return 1;
  if(n > 0) return x * myPow(x, n-1)
  if(n < 0) return 1 / myPow(x,-1*n)
};


console.log(myPow(2,11))