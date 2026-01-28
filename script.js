const dictionary = {
  "пари":"бурканец",
  "план":"рецептак",
  "среща":"вечерник",
  "проблем":"мъглица",
  "опасност":"тъмняк",
  "полиция":"градинарец",
  "човек":"оцелялник",
  "приятел":"дружак",
  "враг":"гадинец",
  "град":"руинак",
  "кола":"бръмчалка",
  "оръжие":"гърмялник",
  "вода":"мокрилка",
  "храна":"манджак",
  "път":"прашилка",
  "нощ":"тъмнилка",
  "ден":"жегалник",
  "работа":"далаверак",
  "информация":"слухец",
  "тайна":"скривалица",
  "място":"точка",
  "сигнал":"знакалник",
  "помощ":"подкрепник"
};

const reverseDictionary = {};
for (let key in dictionary) {
  reverseDictionary[dictionary[key]] = key;
}

let chatHistory = [];

function preserveCase(original, transformed) {
  if (original[0] === original[0].toUpperCase()) {
    return transformed.charAt(0).toUpperCase() + transformed.slice(1);
  }
  return transformed;
}

function encodeWord(word){
  let lower = word.toLowerCase();

  if(dictionary[lower]){
    return preserveCase(word, dictionary[lower]);
  }

  // Случайна наставка, но пазим основата
  if(word.length > 6 && Math.random() < 0.35){
    return preserveCase(word, lower + "ник");
  }

  return word;
}

function decodeWord(word){
  let lower = word.toLowerCase();

  // Първо проверяваме пълно съвпадение в речника
  if(reverseDictionary[lower]){
    return preserveCase(word, reverseDictionary[lower]);
  }

  // После махаме изкуствените наставки
  const suffixes = ["ник","ец","ак","ка"];
  for(let suf of suffixes){
    if(lower.endsWith(suf) && lower.length > suf.length + 2){
      let base = lower.slice(0, -suf.length);
      return preserveCase(word, base);
    }
  }

  return word;
}

function encodeText(){
  let input = document.getElementById("plainText").value;
  if(!input.trim()) return;

  let encoded = input.replace(/[А-Яа-я]+/g, encodeWord);

  chatHistory.push("🧠 Ти: " + input);
  chatHistory.push("🔒 Кодирано: " + encoded);

  document.getElementById("codedText").value = chatHistory.join("\n\n");
  document.getElementById("plainText").value = "";
}

function decodeReply(){
  let input = document.getElementById("replyInput").value;
  if(!input.trim()) return;

  let decoded = input.replace(/[А-Яа-я]+/g, decodeWord);

  chatHistory.push("🤖 Отговор (код): " + input);
  chatHistory.push("💬 Разкодирано: " + decoded);

  document.getElementById("decodedText").value = chatHistory.join("\n\n");
  document.getElementById("replyInput").value = "";
}

function copyCoded(){
  navigator.clipboard.writeText(document.getElementById("codedText").value);
}

function copyDecoded(){
  navigator.clipboard.writeText(document.getElementById("decodedText").value);
}

function clearChat(){
  chatHistory = [];
  document.getElementById("codedText").value = "";
  document.getElementById("decodedText").value = "";
}
