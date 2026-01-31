const fs = require("fs");
const path = require("path");

// === НАСТРОЙКИ ===
const INPUT_FILE = path.join(__dirname, "../data/adjectives.txt");
const OUTPUT_FILE = path.join(__dirname, "../output/dictionary.js");

// === ЧЕТЕНЕ НА ДУМИ ===
let wordsRaw = fs.readFileSync(INPUT_FILE, "utf8");

let words = wordsRaw
  .split(/\s+/)
  .map(w => w.trim().toLowerCase())
  .filter(Boolean);

// === МАХАМЕ ДУБЛИКАТИ ===
let uniqueWords = [...new Set(words)];

if (uniqueWords.length !== words.length) {
  console.log("⚠️ Имаш повтарящи се думи. Премахнах ги автоматично.");
}

if (uniqueWords.length % 2 !== 0) {
  console.error("❌ Броят думи трябва да е четен, за да се образуват двойки.");
  process.exit(1);
}

// === ГЕНЕРИРАНЕ НА ФОРМИ (опростена логика) ===
function generateForms(word) {
  let forms = new Set();

  forms.add(word); // основна

  if (word.endsWith("ен") || word.endsWith("ен")) {
    let root = word.slice(0, -2);
    forms.add(root + "на");
    forms.add(root + "но");
    forms.add(root + "ни");
    forms.add(root + "ният");
    forms.add(root + "ния");
    forms.add(root + "ната");
    forms.add(root + "ното");
    forms.add(root + "ните");
  }

  if (word.endsWith("ък")) {
    let root = word.slice(0, -2);
    forms.add(root + "ка");
    forms.add(root + "ко");
    forms.add(root + "ки");
    forms.add(root + "кия");
    forms.add(root + "ката");
    forms.add(root + "кото");
    forms.add(root + "ките");
  }

  return [...forms];
}

// === СГЛОБЯВАНЕ НА ДВОЙКИ ===
let dictionary = {};
let used = new Set();

for (let i = 0; i < uniqueWords.length; i += 2) {
  let w1 = uniqueWords[i];
  let w2 = uniqueWords[i + 1];

  let forms1 = generateForms(w1);
  let forms2 = generateForms(w2);

  forms1.forEach(f1 => {
    forms2.forEach(f2 => {
      if (used.has(f1) || used.has(f2)) {
        console.error(`❌ Думата вече участва в друга двойка: ${f1} / ${f2}`);
        process.exit(1);
      }
      dictionary[f1] = f2;
      dictionary[f2] = f1;
      used.add(f1);
      used.add(f2);
    });
  });
}

// === ЗАПИС НА ФАЙЛА ===
let output = "const dictionary = {\n";

Object.entries(dictionary).forEach(([k, v]) => {
  output += `  "${k}": "${v}",\n`;
});

output += "};\n\nexport default dictionary;\n";

fs.writeFileSync(OUTPUT_FILE, output, "utf8");

console.log("✅ Речникът е генериран успешно!");
console.log("📁 Файл:", OUTPUT_FILE);

