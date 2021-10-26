const kthGrammar = (n, k) => {
  if (n === 1) return 0;
  if(n===2){
    if(k===1) return 0;
    if(k===2) return 1;
  }

  const l = Math.pow(2, n - 1);
  
  let i = k;
  let side = 'normal';
  if (k > l / 2) {
    i = k - l / 2;
    side = 'reverse';
  }

  // find ith index in n-1
  // console.log(`n:${n}, l: ${l}, i:${i}`)
  console.log(`row:${n} pos=${k} ==> ${side} of row:${n-1} pos=${i}`)
  const y = kthGrammar(n - 1, i);
  let z = 0;
  if (y === 0) z = (side === 'reverse' ? 1 : 0);
  if (y === 1) z = (side === 'reverse' ? 0 : 1);

  console.log(`row:${n} pos=${k} ==> ${side} of row:${n-1} pos=${i}, y=${y}, z=${z}`)
  return z;
};


console.log(kthGrammar(4,5))