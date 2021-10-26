/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const words_map = array_to_map(strs); // {eat:true, tea: true, tan:true, ate: true}
  const groups = []

  while (Object.keys(words_map).length) {
    groups.push(rearrange(words_map))
  }

  return groups;

};

const array_to_map = (arr) => {
  const map = {}
  for (const item of arr) {
    map[item] = true;
  }
  return map;
}

const is_anagram = (word1, word2) => {
  if (word1.length !== word2.length) return false;
  const map = array_to_map(word1)
  for (const char of word2) {
    if (!map[char]) return false;
  }
  return true;
}

const rearrange = (words_map) => {
  
  const current_word = Object.keys(words_map)[0]
  console.log('words_map', words_map, current_word)
  delete words_map[current_word]

  const group = [current_word]


  for (const word of Object.keys(words_map)) {
    // tan => ['n','a', 't']
    const match = is_anagram(current_word, word)
    if (match && (current_word.length === word.length)) {
      group.push(word)
      delete words_map[word]
    }
  }
  console.log('group',group)
  return group;
}

console.log(groupAnagrams(['","']))