import { nounMap, verbMap } from "./semanticExtras.js"

const reverse = obj => Object.fromEntries(Object.entries(obj).map(([k,v]) => [v,k]))

const reverseNouns = reverse(nounMap)
const reverseVerbs = reverse(verbMap)

function transform(word, map) {
  const clean = word.toLowerCase().replace(/[.,!?]/g, "")
  const punct = word.match(/[.,!?]$/)?.[0] || ""
  return (map[clean] || word) + punct
}

export function encodeText(text) {
  return text.split(" ").map(w => transform(transform(w, nounMap), verbMap)).join(" ")
}

export function decodeText(text) {
  return text.split(" ").map(w => transform(transform(w, reverseNouns), reverseVerbs)).join(" ")
}
