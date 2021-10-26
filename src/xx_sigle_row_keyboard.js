const time = (keyboard, word) => {
  const map = {};
  let i = 0;
  for (const char of keyboard) {
    map[char] = i;
    i += 1;
  }

  let t = 0;
  let finger = 0;
  for (const char of word) {
    const char_at = map[char];
    t += Math.abs(finger - char_at);
    finger = char_at;
  }
  return t;
};

const keyboard = 'abcdefghijklmnopqrstuvwxyz';
const words = [
  'pretto',
  'happy',
  'jassi',
  'azazadlfndfldnsdlnfldasnlnsdflnfdlfndlfdnfsdlfnlfnsdlfndflsdnflsdfnsdlfndslfndlfsnflsdnfsdlfnsdlfndf'
];

words.forEach(word => {
  const result = time(keyboard, word);
  console.log(word, ' --> ', result);
});
