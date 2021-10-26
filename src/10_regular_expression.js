/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function (s, p) {
  const operations = get_operations(p);

  let poss = [s];

  for (const ops of operations) {
    const x = {};
    poss.forEach(str => {
      const new_poss = do_ops(str, ops);

      new_poss.forEach(i => {
        x[i] = true;
      });
    });
    poss = Object.keys(x);
  }
  return poss.some(i => i === '');
};

// HELPERS
const get_operations = (p) => {
  const operations = [];
  for (let i = 0; i < p.length; i++) {
    const char = p[i];

    if (char === '.') {
      if (i + 1 < p.length) {
        const next_el = p[i + 1];
        if (next_el === '*') {
          operations.push('DOT_STAR');
          i += 1;
        } else operations.push('DOT');
      } else {
        operations.push('DOT');
      }
    } else {
      if (i + 1 < p.length) {
        const next_el = p[i + 1];
        if (next_el === '*') {
          operations.push({ char, star: true });
          i += 1;
        } else operations.push({ char, star: false });
      } else {
        operations.push({ char, star: false });
      }
    }
  }
  return operations;
};
const do_ops = (str, ops) => {
  if (ops === 'DOT') return dot(str);
  else if (ops === 'DOT_STAR') return dot_star(str);
  else {
    if (ops.star) return c_star(str, ops.char);
    else return char_only(str, ops.char);
  }
};
const c_star = (s, c) => {
  const possibilities = [s];
  let curr = s;
  for (const char of s) {
    if (char !== c) break;
    curr = curr.slice(1);
    possibilities.push(curr);
  }

  return possibilities;
};
const dot_star = (s) => {
  const possibilities = [s];
  let curr = s;
  for (let i = 0; i < s.length; i++) {
    curr = curr.slice(1);
    possibilities.push(curr);
  }
  return possibilities;
};
const dot = (s) => s === '' ? [] : [s.slice(1)];
const char_only = (s, c) => s[0] !== c ? [] : [s.slice(1)];

// const str = "aab"
// const reg = "c*a*b"

// const str = "a"
// const reg = "ab*"

const str = 'ab';
const reg = '.*c';

const result = isMatch(str, reg);
console.log('result --> ', result);

// this solution works great :)
