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
  "място": "руинник",
  "град": "руиноград",
  "къща": "скривалище",
  "магазин": "разменялка",
  "път": "прашник",
  "нощ": "тъмник",
  "ден": "прашенец",
  "работа": "ровене",
  "помощ": "подсилек",
  "бягство": "изпарилка",
  "страх": "страхилка",
  "надежда": "искрица"
};

const reverseDictionary = {};
for (let key in dictionary) {
  reverseDictionary[dictionary[key]] = key;
}

const suffixes = ["ец", "ак", "ник", "лка", "ица", "илка"];

function mutateWord(word) {
  let suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return word.slice(0, -1) + suffix;
}

function preserveCase(original, transformed) {
  if (original[0] === original[0].toUpperCase()) {
    return transformed.charAt(0).toUpperCase() + transformed.slice(1);
  }
  return transformed;
}

function encodeText() {
  let text = document.getElementById("plainText").value;

  let encoded = text.replace(/[А-Яа-я]+/g, word => {
    let lower = word.toLowerCase();

    if (dictionary[lower]) {
      return preserveCase(word, dictionary[lower]);
    }

    if (word.length > 5 && Math.random() < 0.45) {
      return preserveCase(word, mutateWord(lower));
    }

    return word;
  });

  document.getElementById("codedText").value = encoded;
}

function decodeText() {
  let text = document.getElementById("codedText").value;

  let decoded = text.replace(/[А-Яа-я]+/g, word => {
    let lower = word.toLowerCase();

    if (reverseDictionary[lower]) {
      return preserveCase(word, reverseDictionary[lower]);
    }

    return word;
  });

  document.getElementById("plainText").value = decoded;
}
