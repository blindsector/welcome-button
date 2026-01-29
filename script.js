const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const encodedMessages = document.getElementById("encodedMessages");

sendBtn.onclick = sendMessage;

// Разделя текст, но пази интервали и пунктуация
function smartSplit(text) {
    return text.split(/(\s+|[,.!?])/);
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
    return smartSplit(text).map(token => {
        const lower = token.toLowerCase();
        if (reverseDictionary[lower]) {
            return preserveCase(token, reverseDictionary[lower]);
        }
        return token;
    }).join("");
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const encoded = encodeText(text);
    addEncoded(encoded);
    addChatBubble(text, "me");

    saveMessages();
    messageInput.value = "";
}

function decodeIncoming() {
    const code = document.getElementById("incomingCode").value.trim();
    if (!code) return;

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
    const div = document.createElement("div");
    div.textContent = text;

    const btn = document.createElement("button");
    btn.textContent = "Copy";
    btn.onclick = () => navigator.clipboard.writeText(text);

    div.appendChild(btn);
    encodedMessages.appendChild(div);
}

function saveMessages() {
    localStorage.setItem("shadow_encoded", encodedMessages.innerHTML);
    localStorage.setItem("shadow_decoded", chatMessages.innerHTML);
}

function loadMessages() {
    encodedMessages.innerHTML = localStorage.getItem("shadow_encoded") || "";
    chatMessages.innerHTML = localStorage.getItem("shadow_decoded") || "";
}

function clearAll() {
    encodedMessages.innerHTML = "";
    chatMessages.innerHTML = "";
    localStorage.removeItem("shadow_encoded");
    localStorage.removeItem("shadow_decoded");
}

window.addEventListener("load", loadMessages);
