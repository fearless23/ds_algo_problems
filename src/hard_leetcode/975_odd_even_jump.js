const log = (...args) => {
  // console.log(...args);
};
/**
 * @param {number[]} arr
 * @return {number}
*/
const oddEvenJumps = function (arr) {
  let good = 0;
  const indices = [];
  for (let i = 0; i < arr.length; i++) {
    const x = make_jumps(arr, i);
    if (x) {
      indices.push(i);
      good += 1;
    }
  }
  console.log(indices);
  return good;
};

const make_jumps = (arr, start) => {
  log(`--------------START (${start})-----------------------------`);
  const target = arr.length - 1;

  let pos = start;
  let jump = 1;

  while (pos !== target) {
    log(`JUMP #${jump}`, arr[pos]);
    if (jump % 2 === 0) {
      const mx = even_jump(arr, pos);
      log(`odd jump, max from ${pos + 1} = ${mx}`);
      if (mx === undefined) {
        log('--------------END no mx-----------------------------');
        return false;
      } else {
        pos = mx;
        jump += 1;
      }
    } else {
      // ODD JUMP
      const sm = odd_jump(arr, pos);
      log(`odd jump, min from ${pos + 1} = ${sm}`);
      if (sm === undefined) {
        log('--------------END no sm-----------------------------');
        return false;
      } else {
        pos = sm;
        jump += 1;
      }
    }
  }

  log('--------------END all ok -----------------------------');
  return true;
};

const odd_jump = (arr, s) => {
  const val = arr[s]; // more than this, but smallest arr[i]

  let indices = [];
  let min = Infinity;
  for (let i = s + 1; i < arr.length; i++) {
    if (arr[i] >= val) {
      if (arr[i] === min) indices.push(i);
      if (arr[i] < min) {
        indices = [];
        min = arr[i];
        indices.push(i);
      }
    }
  }
  return indices[0];
};

const even_jump = (arr, s) => {
  const val = arr[s]; // less than this, but largest
  let indices = [];
  let max = -Infinity;
  for (let i = s + 1; i < arr.length; i++) {
    if (arr[i] <= val) {
      if (arr[i] === max) indices.push(i);
      if (arr[i] > max) {
        indices = [];
        max = arr[i];
        indices.push(i);
      }
    }
  }
  return indices[0];
};

const cases = [
  { input: [10, 13, 12, 14, 15], output: 2 },
  { input: [2, 3, 1, 1, 4], output: 3 },
  { input: [5, 1, 3, 4, 2], output: 3 },
];

const run = (logger = console) => {
  const results = cases.map((c, idx) => {
    const result = oddEvenJumps(c.input);
    const data = { result, expected: c.output };
    const pass = result === c.output;
    const title = `${pass ? 'PASS' : 'FAIL'}:${c.name || idx + 1}`;
    return { title, data, pass };
  });

  console.log('----------------RESULTS--------------');
  results.forEach(({ data, title, pass }) => {
    if (pass) logger.info(data, title);
    else logger.error(data, title);
  });
};

// run();
export default run;

/*
hard problem as per leetcode
// NOTES: cracked in first go;
*/

/* MINIFIED VERSION (removed comments, notes etc ) FOR BETTER SPEED */
/**
 * @param {number[]} arr
 * @return {number}
 */
const oddEvenJumps_min = function (arr) {
  const jump = (start) => {
    const target = arr.length - 1;

    let pos = start;
    let jump = 1;

    while (pos !== target) {
      if (jump % 2 === 0) {
        const mx = even_jump(pos);
        if (mx === undefined) return false;
        else {
          pos = mx;
          jump += 1;
        }
      } else {
        // ODD JUMP
        const sm = odd_jump(pos);
        if (sm === undefined) return false;
        else {
          pos = sm;
          jump += 1;
        }
      }
    }
    return true;
  };

  const odd_jump = (s) => {
    const val = arr[s]; // more than this, but smallest arr[i]

    let indices = [];
    let min = Infinity;
    for (let i = s + 1; i < arr.length; i++) {
      if (arr[i] >= val) {
        if (arr[i] === min) indices.push(i);
        if (arr[i] < min) {
          indices = [];
          min = arr[i];
          indices.push(i);
        }
      }
    }
    return indices[0];
  };

  const even_jump = (s) => {
    const val = arr[s]; // less than this, but largest
    let indices = [];
    let max = -Infinity;
    for (let i = s + 1; i < arr.length; i++) {
      if (arr[i] <= val) {
        if (arr[i] === max) indices.push(i);
        if (arr[i] > max) {
          indices = [];
          max = arr[i];
          indices.push(i);
        }
      }
    }
    return indices[0];
  };

  let good = 0;
  for (let i = 0; i < arr.length; i++) {
    if (jump(i)) good += 1;
  }
  return good;
};
