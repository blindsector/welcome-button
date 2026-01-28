const dictionary = {
  "пари": "бурканец",
  "план": "рецептак",
  "среща": "вечерник",
  "полиция": "градинарец",
  "проблем": "мъглец",
  "опасност": "тъмнилка",
  "храна": "папаница",
  "вода": "мокрилка",
  "оръжие": "гърмялка",
  "кола": "бръмчалка",
  "гориво": "миризлилка",
  "тайна": "шептилка",
  "информация": "слухалка",
  "човек": "оцелялец",
  "приятел": "дружак",
  "враг": "грабак",
  "град": "руиноград",
  "път": "прашник",
  "нощ": "тъмник",
  "ден": "прашенец",
  "помощ": "подсилек"
};

const reverseDictionary = {};
for (let key in dictionary) reverseDictionary[dictionary[key]] = key;

function preserveCase(original, transformed) {
  if (original[0] === original[0].toUpperCase()) {
    return transformed.charAt(0).toUpperCase() + transformed.slice(1);
  }
  return transformed;
}

function randomSuffix(word) {
  const suffixes = ["ец","ак","ник","лка","ица","илка"];
  return word + suffixes[Math.floor(Math.random()*suffixes.length)];
}

function encodeText() {
  let text = document.getElementById("plainText").value;

  let encoded = text.replace(/[А-Яа-я]+/g, word => {
    let lower = word.toLowerCase();

    if (dictionary[lower]) return preserveCase(word, dictionary[lower]);

    if (word.length > 6 && Math.random() < 0.4)
      return preserveCase(word, randomSuffix(lower));

    return word;
  });

  document.getElementById("codedText").value = encoded;
  localStorage.setItem("codedText", encoded);
}

function decodeReply() {
  let text = document.getElementById("replyInput").value;

  let decoded = text.replace(/[А-Яа-я]+/g, word => {
    let lower = word.toLowerCase();
    if (reverseDictionary[lower]) return preserveCase(word, reverseDictionary[lower]);
    return word;
  });

  document.getElementById("decodedText").value = decoded;
}

function copyCoded() {
  navigator.clipboard.writeText(document.getElementById("codedText").value);
}

function copyDecoded() {
  navigator.clipboard.writeText(document.getElementById("decodedText").value);
}

function clearPlain() {
  document.getElementById("plainText").value = "";
}

window.onload = () => {
  const saved = localStorage.getItem("codedText");
  if (saved) document.getElementById("codedText").value = saved;
};
