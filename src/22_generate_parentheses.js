/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
  let words = [{ str: '', open: n, close: n }];
  console.log('words', words);

  while (words[0].str.length < 2 * n) {
    const new_words = [];
    words.forEach(w => {
      const x = add_parentheses(w); // array
      new_words.push(...x);
    });
    words = new_words;
    console.log('words', words);
  }

  return words.map(i => i.str);
};

const add_parentheses = ({ str, open, close }) => {
// if open === close --> use only open
// if open < close : use any
// if open > close: error

  if (open === close && open > 0) return [{ str: str + '(', close, open: open - 1 }];
  if (open < close) {
    const result = [];
    // use open
    if (open > 0) result.push({ str: str + '(', close, open: open - 1 });

    // use close
    if (close > 0) result.push({ str: str + ')', close: close - 1, open });
    return result;
  }

  return [{ str, open, close }];
};

const result = generateParenthesis(3);
console.log(result);
