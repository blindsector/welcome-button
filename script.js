const dictionary = {
    "проблем": ["стана една каша", "манджата загоря", "работата се оплете"],
    "правила": ["реда на сергията", "как се играе играта", "вътрешния правилник"],
    "държава": ["горните", "тия отгоре", "началството"],
    "бавно": ["докато се наканят", "като костенурка на баир", "с три кафета пауза"],
    "пари": ["жълтиците", "кинтите", "пачката"],
    "работа": ["далаверата", "занимавката", "цялата схема"],
    "полиция": ["сините", "онези със значките"],
    "хора": ["народът", "хората от квартала", "сички наоколо"],
    "лъжа": ["празни приказки", "вятър работа"],
    "истина": ["както си е", "без украса"]
};

const fillers = [
    "нали се сещаш",
    "както винаги става",
    "ей така между другото",
    "да ти кажа честно",
    "без да се обиждаш",
    "както му е реда"
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function encodeText() {
    let text = document.getElementById("inputText").value;

    Object.keys(dictionary).forEach(word => {
        let regex = new RegExp("\\b" + word + "\\b", "gi");
        text = text.replace(regex, getRandom(dictionary[word]));
    });

    // добавяне на пълнежи
    if (Math.random() > 0.5) {
        text += ", " + getRandom(fillers);
    }

    // лека логическа странност (маркер)
    if (Math.random() > 0.7) {
        text = "уж сериозно, ама не съвсем – " + text;
    }

    document.getElementById("encodedText").value = text;
}

function decodeText() {
    let text = document.getElementById("encodedText").value;

    Object.keys(dictionary).forEach(key => {
        dictionary[key].forEach(phrase => {
            let regex = new RegExp(phrase, "gi");
            text = text.replace(regex, key);
        });
    });

    document.getElementById("inputText").value = text;
}
