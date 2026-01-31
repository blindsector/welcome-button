// ================== ВХОД: ПРИЛАГАТЕЛНИ ==================
const adjectivesText = `

градски селски столичен провинциален местен чуждестранен национален международен глобален регионален публичен частен личен обществен служебен официален неофициален формален неформален писмен устен цифров аналогов ръчен автоматичен електронен механичен хартиен пластмасов метален дървен стъклен каменен текстилен кожен гумен течен твърд газообразен плътен рехав дебел тънък широк тесен дълбок плитък висок нисък къс дълъг прав крив остър тъп гладък грапав мек твърд еластичен чуплив здрав крехък стабилен нестабилен подвижен неподвижен гъвкав твърдолинеен бърз бавен моментален постепенен рязък плавен внезапен неочакван чест рядък обичаен необичаен временен вечен краткотраен дълготраен ранен късен навременен закъснял ежедневен седмичен месечен годишен сезонен сутрешен вечерен нощен дневен празничен делничен работен почивен платен безплатен евтин скъп изгоден неизгоден печеливш губещ успешен неуспешен ефективен неефективен полезен безполезен вреден безопасен опасен рисков надежден ненадежден точен неточен ясен неясен прост сложен лесен труден възрастен непълнолетен старинен античен средновековен бъдещен древен първичен вторичен главен второстепенен краен междинен общ частичен цялостен отделен единичен множествен колективен индивидуален въображаем реален виртуален физически психически емоционален морален законен незаконен етичен неетичен културен духовен материален финансов икономически политически социален образователен научен технически медицински военен граждански религиозен светски



`;

// ================== ПОМОЩНИ ФУНКЦИИ ==================

function makeUnique(word, used) {
  let w = word;
  let i = 1;
  while (used.has(w)) {
    w = word + i;
    i++;
  }
  used.add(w);
  return w;
}

function feminine(adj) {
  if (adj.endsWith("ен")) return adj.slice(0, -2) + "на";
  if (adj.endsWith("ък")) return adj.slice(0, -2) + "ка";
  return adj + "а";
}

function neuter(adj) {
  if (adj.endsWith("ен")) return adj.slice(0, -2) + "но";
  if (adj.endsWith("ък")) return adj.slice(0, -2) + "ко";
  return adj + "о";
}

function plural(adj) {
  if (adj.endsWith("ък")) return adj.slice(0, -2) + "ки";
  if (adj.endsWith("ен")) return adj.slice(0, -2) + "ни";
  return adj + "и";
}

function defMascFull(adj) { return adj + "ът"; }
function defMascShort(adj) { return adj + "ия"; }
function defFem(adj) { return feminine(adj) + "та"; }
function defNeut(adj) { return neuter(adj) + "то"; }
function defPl(adj) { return plural(adj) + "те"; }

function comparative(adj) { return "по-" + adj; }
function superlative(adj) { return "най-" + adj; }

// ================== ОБРАБОТКА ==================

const base = adjectivesText.trim().split(/\s+/);
let used = new Set();
let dict = [];

for (let i = 0; i < base.length - 1; i += 2) {
  let a = base[i];
  let b = base[i + 1];

  const formsA = [
    a, feminine(a), neuter(a), plural(a),
    defMascFull(a), defMascShort(a), defFem(a), defNeut(a), defPl(a),
    comparative(a), superlative(a),
    comparative(feminine(a)), superlative(feminine(a)),
    comparative(neuter(a)), superlative(neuter(a)),
    comparative(plural(a)), superlative(plural(a))
  ];

  const formsB = [
    b, feminine(b), neuter(b), plural(b),
    defMascFull(b), defMascShort(b), defFem(b), defNeut(b), defPl(b),
    comparative(b), superlative(b),
    comparative(feminine(b)), superlative(feminine(b)),
    comparative(neuter(b)), superlative(neuter(b)),
    comparative(plural(b)), superlative(plural(b))
  ];

  for (let j = 0; j < formsA.length; j++) {
    let key = makeUnique(formsA[j], used);
    let val = makeUnique(formsB[j], used);
    dict.push(`  "${key}": "${val}"`);
  }
}

// ================== ИЗХОД ==================

console.log("const generatedAdjectiveDictionary = {");
console.log(dict.join(",\n"));
console.log("};");
