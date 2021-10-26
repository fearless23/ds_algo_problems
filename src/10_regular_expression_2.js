// same solution with recursion
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function (s, p) {
  const operations = get_operations(p);
  console.log('operations ->', operations);
  const last = operations.length - 1;

  const xxx = (start, str) => {
    const ops = operations[start];
    const msg = { ops, str };
    if (str === '') {
      console.log(msg, 'str === \'\'', true);
      return true;
    }
    if (start > last) {
      console.log(msg, 'start > last', true);
      return false;
    }

    if (ops === 'DOT') {
      const result = xxx(start + 1, str.slice(1));
      console.log(msg, 'ops === \'DOT\'', result);
      return result;
    } else if (ops === 'DOT_STAR') {
      console.log(msg, 'ops === \'DOT_STAR\'', true);
      return true;
    } else {
      const c = ops.char; // char can be removed n times;
      if (ops.star) {
        const match = xxx(start + 1, str);
        if (match) {
          console.log(msg, `c:${c}, c_star 0 times`, true);
          return true;
        }

        // remove n times
        let xx = str;
        let t = 0;
        while (xx[0] === c) {
          t += 1;
          xx = xx.slice(1);
          const match = xxx(start + 1, xx);
          if (match) {
            console.log(msg, `c:${c}, c_star ${t} times`, true);
            return true;
          }
        }
        console.log(msg, `c:${c}, c_star no match`, false);
        return false;
      } else {
        if (str[0] === c) {
          const result = xxx(start + 1, str.slice(1));
          console.log(msg, `c:${c}, char_only char_matched and removed`, result);
          return result;
        } else {
          console.log(msg, `c:${c}, char only no match`, false);
          return false;
        }
      }
    }
  };

  return xxx(0, s);
};

// char* --> any no of chars
// .     --> any single char
// .*    --> any char, any times
// char  --> remove char

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

const str = 'aab';
const reg = 'c*a*b';

// const str = "aa"
// const reg = "a*"

const result = isMatch(str, reg);
console.log('result --> ', result);

// this solution has issues with DOT_STAR :)
