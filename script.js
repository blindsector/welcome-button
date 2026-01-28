function encodeText() {
    alert("Работи!");
}

function encodeText() {

    let text = document.getElementById("inputText").value;

    const dictionary = {
        "дай": "бруно",
        "видим": "крамуля",
        "може": "тряс",
        "направим": "бумчо",
        "таен": "шушляк",
        "чат": "драскало",
        "как": "врът",
        "изглежда": "мяуф",
        "кодирано": "пухтене",
        "идея": "искрица",
        "имам": "нося",
        "ти": "жуж",
        "аз": "бръм",
        "да": "пляс",
        "не": "цък",
        "искам": "граб",
        "говорим": "шептим",
        "тайно": "подмаса",
        "план": "чертичка",
        "мисля": "мозъча",
        "става": "лепва",
        "добре": "шук",
        "приятел": "дружко",
        "жена": "кака",
        "мъж": "батка"
    };

    let words = text.split(" ");

    let translated = words.map(word => {

        let cleanWord = word.toLowerCase().replace(/[.,!?]/g, "");
        let punctuation = word.match(/[.,!?]/g);
        punctuation = punctuation ? punctuation.join("") : "";

        if (dictionary[cleanWord]) {
            let newWord = dictionary[cleanWord];

            if (word[0] === word[0].toUpperCase()) {
                newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1);
            }

            return newWord + punctuation;
        } else {
            return word;
        }
    });

    document.getElementById("outputText").value = translated.join(" ");
}
