/**
 * @param {number[]} fruits
 * @return {number}
*/
const totalFruit = function (fruits) {
  let len = 0;

  let l = 0;

  let f1 = fruits[0];
  let f2 = null;

  while (l < fruits.length) {
    let e = fruits.length - 1;
    // start from left, until you find 3rd distinct
    for (let i = l + 1; i < fruits.length; i++) {
      const f = fruits[i];
      if (f !== f1) {
        if (f2 === null) f2 = f;
        else {
          if (f !== f2) {
            // found 3rd distinct fruit at i
            // count from l to i
            e = i - 1;
            break;
          }
        }
      }
    }

    // find length b/w l and e
    len = Math.max(e - l + 1, len);

    if (e === fruits.length - 1) break;

    // start from e, set left pointer where you find first distinct value and > l
    while (fruits[e] === fruits[e - 1] && e > l) {
      e -= 1;
    }

    l = e;
    f1 = fruits[e];
    f2 = null;
  }

  return len;
};

const cases = [
  { input: [0, 1, 2, 2], output: 3 },
  { input: [1, 2, 1], output: 3 },
  { input: [1, 2, 3, 2, 2], output: 4 },
  { input: [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4], output: 5 }
];

const run = (logger = console) => {
  const results = cases.map((c, idx) => {
    const result = totalFruit(c.input);
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
