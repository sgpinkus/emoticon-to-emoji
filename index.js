const emoticon = require('emoticon');


const emoticons = Object.fromEntries(emoticon // Flat hash of emoticon -> emoji.
    .map(spec => spec.emoticons.map(code => [code, spec.emoji])).flat()
    .sort((a, b) => a[0].length > b[0].length ? 1 : a[0].length === b[0].length ? 0 : -1));
const tree = buildTree(); // Emoticon prefix tree. TODO: stash this on build.


/**
 * Greedily replace emoticons with emoji symbols, using `tree` to aid lookup.
 */
function replaceEmoticons(text, boundary = /\s/, padSpaceAfter = false) {
  let active = true;
  let matches = [];
  text = Array.from(text);

  for (let i = 0; i < text.length; i++) {
    let c = text[i];
    // console.debug(`prefix=${text.slice(0,i)}, c=${c}, active=${active}`);
    if(c.match(boundary)) {
      active = true;
      continue;
    }
    if(active) {
      let level = tree;
      let currentMatch;
      let s = i;

      while(level[c] && i < text.length) {
        level = level[c];
        if(level['match']) {
          currentMatch = level['match'];
        }
        i++;
        c = text[i];
      }
      if(currentMatch) {
        matches.push([s, i, currentMatch]);
        active = true;
        i--;
        continue;
      }
    }
    active = false;
  }

  for(let m of matches.reverse()) {
    text.splice(m[0], m[1] - m[0], m[2] + (padSpaceAfter ? ' ' : ''));
  }
  return text.join('');
}


function buildTree() {
  const tree = {};
  for (let [emoticon, emoji] of Object.entries(emoticons).reverse()) {
    mergeTree(tree, emoticon, emoji);
  }
  return tree;
}


function mergeTree(s, t, u) {
  t = Array.from(t);
  var [c, r] = [t[0], t.slice(1)]
  s[c] = s[c] || {};
  if(!r.length) {
    s[c] = { ...s[c], ...{ 'match': u } };
  } else {
    s[c] = mergeTree(s[c], r, u)
  }
  return s;
}

module.exports = { replaceEmoticons, emoticons, tree };
