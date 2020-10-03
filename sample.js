var fs = require('fs');
var { replaceEmoticons } = require('./index.js');
console.log(replaceEmoticons(String(fs.readFileSync('./sample.txt'))));
