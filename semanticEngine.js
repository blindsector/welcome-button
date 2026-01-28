import { nounMap, verbMap } from "./semanticDictionary.js";
import { adjMap, phraseMap, variationMap } from "./semanticExtras.js";

// =======================
// 🔁 ОБРАТНИ РЕЧНИЦИ
// =======================
const reverse = obj => Object.fromEntries(Object.entries(obj).map(([k,v])=>[v,k]));

const reverseNounMap = reverse(nounMap);
const reverseVerbMap = reverse(verbMap);
const reverseAdjMap  = reverse(adjMap);
const reversePhraseMap = reverse(phraseMap);

const reverseVariationMap = {};
for (const key in variationMap) {
  variationMap[key].forEach(v => reverseVariationMap[v] = key);
}

// =======================
// 🎲 RANDOM HELPER
// =======================
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// =======================
// 🔐 ENCODE
// =======================
export function encodeText(text) {
  let result = text.toLowerCase();

  // Първо цели фрази
  for (const phrase in phraseMap) {
    const regex = new RegExp("\\b" + phrase + "\\b", "gi");
    result = result.replace(regex, phraseMap[phrase]);
  }

  const words = result.split(/(\s+|[,.!?])/g);

  return words.map(word => {
    const clean = word.toLowerCase();

    if (variationMap[clean]) return getRandom(variationMap[clean]);
    if (nounMap[clean]) return nounMap[clean];
    if (verbMap[clean]) return verbMap[clean];
    if (adjMap[clean]) return adjMap[clean];

    return word;
  }).join("");
}

// =======================
// 🔓 DECODE
// =======================
export function decodeText(text) {
  let result = text.toLowerCase();

  for (const phrase in reversePhraseMap) {
    const regex = new RegExp("\\b" + phrase + "\\b", "gi");
    result = result.replace(regex, reversePhraseMap[phrase]);
  }

  const words = result.split(/(\s+|[,.!?])/g);

  return words.map(word => {
    const clean = word.toLowerCase();

    if (reverseVariationMap[clean]) return reverseVariationMap[clean];
    if (reverseNounMap[clean]) return reverseNounMap[clean];
    if (reverseVerbMap[clean]) return reverseVerbMap[clean];
    if (reverseAdjMap[clean]) return reverseAdjMap[clean];

    return word;
  }).join("");
}
