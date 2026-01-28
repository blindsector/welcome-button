function encodeText() {
    let text = document.getElementById("inputText").value;

    let dictionary = {
        "как": "по какъв начин",
        "мина": "премина стратегически",
        "деня": "дневния цикъл",
        "добре": "в оптимално състояние",
        "ли": "ли",
        "си": "си",
        "здравей": "официален поздрав",
        "чао": "тактическо оттегляне"
    };

    let words = text.split(" ");

    let translated = words.map(word => {
        let lowerWord = word.toLowerCase();

        if (dictionary[lowerWord]) {
            let translatedWord = dictionary[lowerWord];

            // ако думата започва с главна буква
            if (word.length > 0 && word[0] === word[0].toUpperCase()) {
                translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
            }

            return translatedWord;
        } else {
            return "Операция " + word;
        }
    });

    document.getElementById("outputText").value = translated.join(" ");
}
