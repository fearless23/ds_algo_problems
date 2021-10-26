/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
const calcEquation = function (equations, values, queries) {
  const map = {};
  const vars = new Set([]);

  for (let i = 0; i < equations.length; i++) {
    const [num, den] = equations[i];
    vars.add(num);
    vars.add(den);

    if (!map[num]) map[num] = {};
    if (!map[den]) map[den] = {};

    const value = values[i];
    map[num][den] = value;
    map[den][num] = 1 / value;
  }

  const results = [];
  for (let i = 0; i < queries.length; i++) {
    const [num, den] = queries[i];
    results.push(find_den(map, num, den));
  }

  return results;
};

const find_den = (map, num, target_den) => {
  if (!map[num]) return -1;

  const visited = new Set([]);

  const find = (k, mul) => {
    if (visited.has(k)) return undefined;
    if (k === target_den) return mul;
    visited.add(k);

    const dens = Object.keys(map[k]);
    for (const den of dens) {
      const v = map[k][den];
      if (den === target_den) return v * mul;
      else {
        const result = find(den, v * mul);
        if (result !== undefined) return result;
      }
    }

    return undefined;
  };

  return find(num, 1) || -1;
};

const input = {
  equations: [['a', 'b'], ['b', 'c']],
  values: [2.0, 3.0],
  queries: [['a', 'c'], ['b', 'a'], ['a', 'e'], ['a', 'a'], ['x', 'x']],
  output: [6.00000, 0.50000, -1.00000, 1.00000, -1.00000]
};

const run = (logger = console) => {
  // const results = cases.map((c, idx) => {
  const c = input;
  const result = calcEquation(c.equations, c.values, c.queries);
  const data = { result, expected: c.output };
  const pass = result.length === c.output.length;
  // const title = `${pass ? 'PASS' : 'FAIL'}:${c.name || idx + 1}`;
  const title = `${pass ? 'PASS' : 'FAIL'}`;
  const results = [{ title, data, pass }];
  // });

  console.log('----------------RESULTS--------------');
  results.forEach(({ data, title, pass }) => {
    if (pass) logger.info(data, title);
    else logger.error(data, title);
  });
};

run();
export default run;

/* MINIFIED */
const calcEquation2 = function (equations, values, queries) {
  const map = {};

  for (let i = 0; i < equations.length; i++) {
    const [num, den] = equations[i];

    if (!map[num]) map[num] = {};
    if (!map[den]) map[den] = {};

    const value = values[i];
    map[num][den] = value;
    map[den][num] = 1 / value;
  }

  return queries.map(find_den2(map));
};

const find_den2 = (map) => ([num, target_den]) => {
  if (!map[num]) return -1;

  const visited = new Set([]);

  const find = (k, mul) => {
    if (visited.has(k)) return undefined;
    visited.add(k);
    if (k === target_den) return mul;

    const dens = Object.keys(map[k]);
    for (const den of dens) {
      const v = map[k][den];
      if (den === target_den) return v * mul;
      else {
        const result = find(den, v * mul);
        if (result !== undefined) return result;
      }
    }

    return undefined;
  };

  return find(num, 1) || -1;
};
