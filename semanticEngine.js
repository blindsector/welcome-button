export function encodeText(text) {
    return text
        .replace(/пари/gi, "капачки")
        .replace(/оръжие/gi, "гърмялка")
        .replace(/среща/gi, "засечка")
        .replace(/полиция/gi, "сиви шапки");
}

export function decodeText(text) {
    return text
        .replace(/капачки/gi, "пари")
        .replace(/гърмялка/gi, "оръжие")
        .replace(/засечка/gi, "среща")
        .replace(/сиви шапки/gi, "полиция");
}
