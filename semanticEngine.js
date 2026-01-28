// Проста "семантична" кодировка за демо

export function encodeText(text) {
    return text
        .split("")
        .map(c => String.fromCharCode(c.charCodeAt(0) + 3))
        .join("");
}

export function decodeText(text) {
    return text
        .split("")
        .map(c => String.fromCharCode(c.charCodeAt(0) - 3))
        .join("");
}
