const dictionary = {
    "здравей": "ZX1",
    "как": "ZX2",
    "си": "ZX3",
    "обичам": "ZX4",
    "тайно": "ZX5",
    "среща": "ZX6",
    "довечера": "ZX7",
    "полиция": "ZX8",
    "приятел": "ZX9",
    "план": "ZX10"
};

function encodeWord(word) {
    return dictionary[word.toLowerCase()] || word;
}

function decodeWord(code) {
    const entry = Object.entries(dictionary).find(([k, v]) => v === code);
    return entry ? entry[0] : code;
}
