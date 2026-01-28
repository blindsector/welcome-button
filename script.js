// === БАЗОВ РЕЧНИК (можеш да добавяш още) ===
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

// === ОБРАТЕН РЕЧНИК ===
const reverseDictionary = {};
for (let key in dictionary) {
  reverseDictionary[dictionary[key]] = key;
}

// === НАСТАВКИ ЗА АЛГОРИТМИЧНО КОДИРАНЕ ===
const suffixes = ["ец", "ак", "ник", "лка", "ица", "илка"];

// === ПРОСТО РАНДОМ КОДИРАНЕ НА ДУМА КОЯТО Я НЯМА В РЕЧНИКА ===
function mutateWord(word) {
  if (word.length < 4) return word;

  let suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return word.slice(0, word.length - 1) + suffix;
}

// === КОДИРАНЕ ===
function encodeText() {
  let text = document.getElementById("plainText").value.toLowerCase();
  let words = text.split(/\b/);

  let encoded = words.map(w => {
    let clean = w.trim();

    if (dictionary[clean]) return dictionary[clean];

    if (/^[а-яa-z]+$/i.test(clean) && clean.length > 5 && Math.random() < 0.35) {
      return mutateWord(clean);
    }

    return w;
  });

  document.getElementById("codedText").value = encoded.join("");
}

// === РАЗКОДИРАНЕ ===
function decodeText() {
  let text = document.getElementById("codedText").value.toLowerCase();
  let words = text.split(/\b/);

  let decoded = words.map(w => {
    let clean = w.trim();

    if (reverseDictionary[clean]) return reverseDictionary[clean];

    return w;
  });

  document.getElementById("plainText").value = decoded.join("");
}
