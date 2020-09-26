const assert = require('assert');
const { expect } = require('chai');
const { replaceEmoticons } = require('./index');

const tests = [
  ['=\',-[=\',-[ :+[:) :):);) `:)`.', '😭😭 :+[:) 😃😃😉 `:)`.'],
  ['What :/?? I </3 wor:Ds :D!', 'What 😕?? I 💔 wor:Ds 😄!'],
  [']=-D]=-D]=-D]=-D]=-Dx-Px-Dx-Px-D:):):)', '😈😈😈😈😈😝😆😝😆😃😃😃'],
  ['Hey, <<3>> xxx-DDD it\'s 12:30:00 wh00p!', 'Hey, <<3>> xxx-DDD it\'s 12:30:00 wh00p!'],
];

for(let [t, e] of tests) {
  let a = replaceEmoticons(t);
  console.log(t, '===', a);
  expect(a).equals(e);
}
