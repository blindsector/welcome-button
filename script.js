const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const encodedMessages = document.getElementById("encodedMessages");

sendBtn.onclick = sendMessage;

function smartSplit(text) {
    return text.split(/(\s+|[,.!?])/).filter(t => t !== "");
}

function preserveCase(original, replacement) {
    if (original[0] === original[0]?.toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement;
}

function encodeText(text) {
    return smartSplit(text).map(token => {
        const lower = token.toLowerCase();
        if (baseDictionary[lower]) {
            return preserveCase(token, baseDictionary[lower]);
        }
        return token;
    }).join("");
}

function decodeText(text) {
    const tokens = smartSplit(text);
    let result = [];

    for (let i = 0; i < tokens.length; i++) {
        let current = tokens[i];
        let next = tokens[i + 1] || "";

        // Проверка за дву-думна фраза
        const twoWord = (current + next).toLowerCase().replace(/\s+/g, " ").trim();

        if (reverseDictionary[twoWord]) {
            result.push(preserveCase(current, reverseDictionary[twoWord]));
            i++; // прескачаме следващата дума
            continue;
        }

        const lower = current.toLowerCase();
        if (reverseDictionary[lower]) {
            result.push(preserveCase(current, reverseDictionary[lower]));
        } else {
            result.push(current);
        }
    }

    return result.join("");
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;

    const encoded = encodeText(text);
    addEncoded(encoded);
    addChatBubble(text, "me");

    saveMessages();
    messageInput.value = "";
}

function decodeIncoming() {
    const code = document.getElementById("incomingCode").value.trim();
    if (code === "") return;

    const decoded = decodeText(code);
    addChatBubble(decoded, "her");

    saveMessages();
    document.getElementById("incomingCode").value = "";
}

function addChatBubble(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = "bubble " + sender;

    const label = document.createElement("div");
    label.className = "sender";
    label.textContent = sender === "me" ? "Аз" : "Тя";

    const msg = document.createElement("div");
    msg.textContent = text;

    bubble.appendChild(label);
    bubble.appendChild(msg);
    chatMessages.appendChild(bubble);
}

function addEncoded(text) {
    const div = document.cre
