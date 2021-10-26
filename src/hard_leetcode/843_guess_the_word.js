const make_master = (secret) => {
  return {
    guess: (word) => match(word, secret)
  };
};

const findSecretWord = function (words, master) {
  const tried = [];

  for (let i = 0; i < 10; i++) {
    const idx = random(0, words.length - 1);
    const word = words[idx];
    const score = master.guess(word);
    tried.push({ word, score });
    if (score === 6) {
      console.log(`took ${tried.length} tries`);
      return true;
    } else words = words.filter(i => (match(i, word) === score));
  }
  console.log('tried\n', JSON.stringify(tried, null, 2));
  return false;
};

const match = (word1, word2) => {
  let score = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] === word2[i]) score += 1;
  }
  return score;
};

const random = (min = 0, max = 1) => Math.floor((Math.random() * (max - min + 1)) + min);

/*
// EXPLAINED
const random = (min = 0, max = 1) => {
  // min = 2, max = 7, diff = 5
  const r1 = Math.random(); // 0, 0.99999999999999999
  const r2 = r1 * (max - min + 1); // 0, 5.999999999999999999
  const r3 = r2 + min; // 2, 7.999999999999999
  const r4 = Math.floor(r3); // 2, 7
  return r4;
};
*/

const cases = [
  {
    input: ['acckzz', 'ccbazz', 'eiowzz', 'abcczz'],
    secret: 'acckzz'
  },
  {
    input: [
      'gaxckt', 'trlccr', 'jxwhkz', 'ycbfps', 'peayuf', 'yiejjw',
      'ldzccp', 'nqsjoa', 'qrjasy', 'pcldos', 'acrtag', 'buyeia',
      'ubmtpj', 'drtclz', 'zqderp', 'snywek', 'caoztp', 'ibpghw',
      'evtkhl', 'bhpfla', 'ymqhxk', 'qkvipb', 'tvmued', 'rvbass',
      'axeasm', 'qolsjg', 'roswcb', 'vdjgxx', 'bugbyv', 'zipjpc',
      'tamszl', 'osdifo', 'dvxlxm', 'iwmyfb', 'wmnwhe', 'hslnop',
      'nkrfwn', 'puvgve', 'rqsqpq', 'jwoswl', 'tittgf', 'evqsqe',
      'aishiv', 'pmwovj', 'sorbte', 'hbaczn', 'coifed', 'hrctvp',
      'vkytbw', 'dizcxz', 'arabol', 'uywurk', 'ppywdo', 'resfls',
      'tmoliy', 'etriev', 'oanvlx', 'wcsnzy', 'loufkw', 'onnwcy',
      'novblw', 'mtxgwe', 'rgrdbt', 'ckolob', 'kxnflb', 'phonmg',
      'egcdab', 'cykndr', 'lkzobv', 'ifwmwp', 'jqmbib', 'mypnvf',
      'lnrgnj', 'clijwa', 'kiioqr', 'syzebr', 'rqsmhg', 'sczjmz',
      'hsdjfp', 'mjcgvm', 'ajotcx', 'olgnfv', 'mjyjxj', 'wzgbmg',
      'lpcnbj', 'yjjlwn', 'blrogv', 'bdplzs', 'oxblph', 'twejel',
      'rupapy', 'euwrrz', 'apiqzu', 'ydcroj', 'ldvzgq', 'zailgu',
      'xgqpsr', 'wxdyho', 'alrplq', 'brklfk'
    ],
    secret: 'hbaczn'
  },
  {
    input: ['mjpsce', 'giwiyk', 'slbnia', 'pullbr', 'ezvczd', 'dwkrmt', 'qgzebh', 'wvhhlm', 'kqbmny', 'zpvrkz', 'pdwxvy', 'gilywa', 'gmrrdc', 'vvqvla', 'rmjirt', 'qmvykq', 'mhbmuq', 'unplzn', 'qkcied', 'eignxg', 'fbfgng', 'xpizga', 'twubzr', 'nnfaxr', 'skknhe', 'twautl', 'nglrst', 'mibyks', 'qrbmpx', 'ukgjkq', 'mhxxfb', 'deggal', 'bwpvsp', 'uirtak', 'tqkzfk', 'hfzawa', 'jahjgn', 'mteyut', 'jzbqbv', 'ttddtf', 'auuwgn', 'untihn', 'gbhnog', 'zowaol', 'feitjl', 'omtiur', 'kwdsgx', 'tggcqq', 'qachdn', 'dixtat', 'hcsvbw', 'chduyy', 'gpdtft', 'bjxzky', 'uvvvko', 'jzcpiv', 'gtyjau', 'unsmok', 'vfcmhc', 'hvxnut', 'orlwku', 'ejllrv', 'jbrskt', 'xnxxdi', 'rfreiv', 'njbvwj', 'pkydxy', 'jksiwj', 'iaembk', 'pyqdip', 'exkykx', 'uxgecc', 'khzqgy', 'dehkbu', 'ahplng', 'jomiik', 'nmcsfe', 'bclcbp', 'xfiefi', 'soiwde', 'tcjkjp', 'wervlz', 'dcthgv', 'hwwghe', 'hdlkll', 'dpzoxb', 'mpiviy', 'cprcwo', 'molttv', 'dwjtdp', 'qiilsr', 'dbnaxs', 'dbozaw', 'webcyp', 'vftnkr', 'iurlzf', 'giqcfc', 'pcghoi', 'zupyzn', 'xckegy'],
    secret: 'vftnkr'
  },
  {
    input: [
      'abcdef', 'acdefg', 'adefgh', 'aefghi', 'afghij', 'aghijk', 'ahijkl',
      'aijklm', 'ajklmn', 'aklmno', 'almnoz', 'anopqr', 'azzzzz'
    ],
    secret: 'azzzzz'
  }
];

const run = (logger = console) => {
  const results = cases.map((c, idx) => {
    const master = make_master(c.secret);
    const result = findSecretWord(c.input, master);
    const data = { result, expected: true };
    const pass = result === true;
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
