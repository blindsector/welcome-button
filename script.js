const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const encodedMessages = document.getElementById("encodedMessages");

let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
let encodedHistory = JSON.parse(localStorage.getItem("encodedHistory")) || [];

sendBtn.onclick = sendMessage;

function encodeText(text) {
    return text.split(/(\s+|[,.!?])/).map(token => {
        const lower = token.toLowerCase();
        if (dictionary[lower]) {
            // Запазва главна буква
            if (token[0] === token[0]?.toUpperCase()) {
                return dictionary[lower].charAt(0).toUpperCase() + dictionary[lower].slice(1);
            }
            return dictionary[lower];
        }
        return token;
    }).join("");
}


function decodeText(text) {
    const reverseDict = Object.fromEntries(
        Object.entries(dictionary).map(([k, v]) => [v.toLowerCase(), k])
    );

    return text.split(/(\s+|[,.!?])/).map(token => {
        const lower = token.toLowerCase();
        if (reverseDict[lower]) {
            if (token[0] === token[0]?.toUpperCase()) {
                const word = reverseDict[lower];
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return reverseDict[lower];
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

    encodedHistory.push(encoded);
    chatHistory.push({ sender: "me", text });

saveMessages();
    messageInput.value = "";
}

function decodeIncoming() {
    const code = document.getElementById("incomingCode").value.trim();
    if (!code) return;

    const decoded = decodeText(code);
    addChatBubble(decoded, "her");

    chatHistory.push({ sender: "her", text: decoded });
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
    localStorage.setItem("shadow_encoded", document.getElementById("encodedMessages").innerHTML);
    localStorage.setItem("shadow_decoded", document.getElementById("chatMessages").innerHTML);
}

function loadMessages() {
    document.getElementById("encodedMessages").innerHTML = localStorage.getItem("shadow_encoded") || "";
    document.getElementById("chatMessages").innerHTML = localStorage.getItem("shadow_decoded") || "";
}

window.addEventListener("load", loadMessages);

function clearAll() {
    // Ляво – кодирани съобщения
    const encodedBox = document.getElementById("encodedMessages");

    // Дясно – разкодирани съобщения
    const chatBox = document.getElementById("chatMessages");

    // Чистим екрана
    encodedBox.innerHTML = "";
    chatBox.innerHTML = "";

    // Чистим запазеното в паметта
    localStorage.removeItem("shadow_encoded");
    localStorage.removeItem("shadow_decoded");
}

