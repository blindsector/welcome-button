const fs = require("fs");
const path = require("path");

function readList(file) {
  return fs.readFileSync(file, "utf-8")
    .split("\n")
    .map(w => w.trim().toLowerCase())
    .filter(w => w.length > 2);
}

// много проста функция за “изрязване” на корени
function extractRoot(word) {
  return word
    .replace(/(ам|ям|ах|ях|аш|яш|ат|ят|а|я|и|е|о)$/,"")
    .replace(/(ът|та|то|те|ия|ие|ци|зи)$/,"");
}

function makePairs(list) {
  let roots = [...new Set(list.map(extractRoot))];
  roots.sort(() => Math.random() - 0.5);

  let half = Math.floor(roots.length / 2);
  let map = {};

  for (let i = 0; i < half; i++) {
    map[roots[i]] = roots[i + half];
    map[roots[i + half]] = roots[i];
  }
  return map;
}

const verbs = readList("input/verbs.txt");
const nouns = readList("input/nouns.txt");
const directs = readList("input/direct.txt");

const verbRoots = makePairs(verbs);
const nounRoots = makePairs(nouns);

let directWords = {};
directs.forEach(w => directWords[w] = w.split("").reverse().join(""));

let output = `const verbRoots = ${JSON.stringify(verbRoots, null, 2)};\n\n`;
output += `const nounRoots = ${JSON.stringify(nounRoots, null, 2)};\n\n`;
output += `const directWords = ${JSON.stringify(directWords, null, 2)};\n\n`;

output += `
const reverseVerbRoots = Object.fromEntries(Object.entries(verbRoots).map(([k,v]) => [v,k]));
const reverseNounRoots = Object.fromEntries(Object.entries(nounRoots).map(([k,v]) => [v,k]));
const reverseDirectWords = Object.fromEntries(Object.entries(directWords).map(([k,v]) => [v,k]));
`;

fs.writeFileSync("output/dictionary.js", output);
console.log("✅ Dictionary generated!");
