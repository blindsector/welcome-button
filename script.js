function encodeText() {
    let text = document.getElementById("inputText").value;

    const dictionary = {
        "дай": "брацо",
        "давам": "брачо",
        "видя": "крамуля",
        "видим": "крамуля",
        "направя": "тречко",
        "направим": "тречко",
        "каже": "луфни",
        "отида": "зурна",
        "взема": "мъкна",
        "сложа": "шляпна",
        "натисна": "цъкна",
        "напиша": "драсна",
        "пратя": "фръкна",
        "вляза": "шмугна",
        "изляза": "изшляпа",
        "промяна": "завърт",
        "проверя": "преслушам",
        "реша": "намисля",
        "измисля": "измисля",

        "човек": "пичага",
        "хора": "пичаги",
        "жена": "кака",
        "мъж": "батка",
        "приятел": "дружко",
        "приятели": "дружки",

        "работа": "мота",
        "задача": "врътка",
        "идея": "хрумка",
        "план": "схемичка",
        "тайно": "шушу",
        "секретно": "шушу",
        "чат": "бърборене",
        "говоря": "дудна",
        "пиша": "драскам",
        "мисля": "умувам"
    };

    let words = text.split(" ");

    let translated = words.map(word => {
        let cleanWord = word.toLowerCase().replace(/[.,!?]/g, "");

        if (dictionary[cleanWord]) {
            let newWord = dictionary[cleanWord];

            // Ако думата започва с главна буква
            if (word[0] === word[0].toUpperCase()) {
                newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1);
            }

            return newWord;
        } else {
            return word;
        }
    });

    document.getElementById("outputText").value = translated.join(" ");
}
