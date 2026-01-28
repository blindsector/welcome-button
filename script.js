function encodeText() {
    let text = document.getElementById("inputText").value.toLowerCase();

    let dictionary = {
        "здравей": "здрастио",
        "как": "кво",
        "си": "сио",
        "приятел": "брато",
        "работа": "мъка",
        "пари": "кинти",
        "шеф": "главатар",
        "проблем": "драма",
        "кола": "бричка",
        "жена": "шефица",
        "мъж": "пич",
        "храна": "манджа",
        "къща": "бърлога",
        "отивам": "изчезвам",
        "ела": "допълзи",
        "чао": "бегай",
        "добре": "екстра",
        "лошо": "злеяко"
    };

    let words = text.split(" ");
    let translated = words.map(word => dictionary[word] || word);

    document.getElementById("outputText").value = translated.join(" ");
}
