import { nounMap, verbMap } from "./semanticExtras.js";

// обръщаме речниците за разкодиране
const reverseNounMap = Object.fromEntries(
  Object.entries(nounMap).map(([k, v]) => [v, k])
);

const reverseVerbMap = Object.fromEntries(
  Object.entries(verbMap).map(([k, v]) => [v, k])
);

// запазва главна буква
function preserveCase(original, transformed) {
  if (original[0] === original[0].toUpperCase()) {
    return transformed.charAt(0).toUpperCase() + transformed.slice(1);
  }
  return transformed;
}

// маха пунктуация за проверка
function cleanWord(word) {
  return word.toLowerCase().replace(/[.,!?]/g, "");
}

// връща пунктуацията
function getPunctuation(word) {
  const match = word.match(/[.,!?]+$/);
  return match ? match[0] : "";
}

// =======================
// 🔐 КОДИРАНЕ
// =======================
export function encodeText(text) {
  return text
    .split(" ")
    .map(word => {
      const clean = cleanWord(word);
      const punct = getPunctuation(word);

      let replaced =
        nounMap[clean] ||
        verbMap[clean] ||
        clean;

      replaced = preserveCase(word, replaced);
      return replaced + punct;
    })
    .join(" ");
}

// =======================
// 🔓 РАЗКОДИРАНЕ
// =======================
export function decodeText(text) {
  return text
    .split(" ")
    .map(word => {
      const clean = cleanWord(word);
      const punct = getPunctuation(word);

      let replaced =
        reverseNounMap[clean] ||
        reverseVerbMap[clean] ||
        clean;

      replaced = preserveCase(word, replaced);
      return replaced + punct;
    })
    .join(" ");
}
