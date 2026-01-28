const baseDictionary = {
  "пари":"буркан","план":"рецепта","среща":"вечеря","полиция":"градинар",
  "проблем":"мъгла","опасност":"тъмница","информация":"слух",
  "човек":"оцеляло","приятел":"дружка","враг":"гадина",
  "град":"руина","кола":"бръмчалка","оръжие":"гърмяло",
  "вода":"мокро","храна":"манджа","път":"прашилка",
  "нощ":"тъмно","ден":"жега","помощ":"подкрепа",
  "работа":"далавера","говоря":"приказвам","отивам":"мятам се",
  "идвам":"доклатя се","чакам":"вися","взимам":"гепя",
  "давам":"бутам","правя":"майсторя","мисля":"умувам"
};

const suffixes = ["ец","ак","ник","лка","ица","уша","онка"];
const reverseDictionary = {};

function buildDictionaries(){
  for(let key in baseDictionary){
    let coded = baseDictionary[key] + suffixes[Math.floor(Math.random()*suffixes.length)];
    reverseDictionary[coded] = key;
    baseDictionary[key] = coded;
  }
}
buildDictionaries();

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

    if (baseDictionary[lower]) {
      return preserveCase(word, baseDictionary[lower]);
    }

    // 60% шанс да маскира дълга дума
    if (word.length > 5 && Math.random() < 0.6) {
      return preserveCase(word, lower + suffixes[Math.floor(Math.random()*suffixes.length)]);
    }

    return word;
  });

  document.getElementById("codedText").value = encoded;
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
