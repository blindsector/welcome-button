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

 let translated = words.map(word => {

    // махаме пунктуация от края (, . ! ?)
    let cleanWord = word.replace(/[.,!?]/g, "");
    let lowerWord = cleanWord.toLowerCase();

    // малки думи, които не искаме да стават "Операция"
    let smallWords = ["и","в","на","по","с","но","да","ли","го"];

    if (dictionary[lowerWord]) {
        let translatedWord = dictionary[lowerWord];

        // ако започва с главна буква
        if (cleanWord[0] === cleanWord[0].toUpperCase()) {
            translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
        }

        return translatedWord;
    } 
    
    else if (smallWords.includes(lowerWord)) {
        return word; // оставяме малките думи както са
    } 
    
    else {
        return "Операция " + word;
    }

});


    document.getElementById("outputText").value = translated.join(" ");
}
