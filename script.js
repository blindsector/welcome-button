const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const encodedMessages = document.getElementById("encodedMessages");

sendBtn.onclick = sendMessage;

/* ---------------- РАЗДЕЛЯНЕ НА ДУМИ ---------------- */
function smartSplit(text) {
    return text.match(/[A-Za-zА-Яа-я0-9]+|[.,!?]/g) || [];
}

/* ---------------- ЗАПАЗВАНЕ НА ГЛАВНИ БУКВИ ---------------- */
function preserveCase(original, replacement) {
    if (original === original.toUpperCase()) return replacement.toUpperCase();
    if (original[0] === original[0].toUpperCase())
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    return replacement;
}

/* ---------------- СМЯНА ПО РЕЧНИЦИ ---------------- */
function transformWord(word) {
    const lower = word.toLowerCase();

    if (ADJ[lower]) return preserveCase(word, ADJ[lower]);
    if (NOUN[lower]) return preserveCase(word, NOUN[lower]);
    if (VERB[lower]) return preserveCase(word, VERB[lower]);

    return word;
}

function transformText(text) {
    return smartSplit(text).map(transformWord).join(" ");
}

/* ---------------- ИЗПРАЩАНЕ ---------------- */
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const encoded = transformText(text);
    addEncoded(encoded);
    addChatBubble(text, "me");

    saveMessages();
    messageInput.value = "";
}

/* ---------------- РАЗКОДИРАНЕ НА ВХОДЯЩО ---------------- */
function decodeIncoming() {
    const code = document.getElementById("incomingCode").value.trim();
    if (!code) return;

    const decoded = transformText(code);
    addChatBubble(decoded, "her");

    saveMessages();
    document.getElementById("incomingCode").value = "";
}

window.decodeIncoming = decodeIncoming;

/* ---------------- ЧАТ БАЛОН ---------------- */
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

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* ---------------- КОДИРАНО СЪОБЩЕНИЕ ---------------- */
function addEncoded(text) {
    const div = document.createElement("div");
    div.className = "encodedLine";

    const span = document.createElement("span");
    span.textContent = text;

    const btn = document.createElement("button");
    btn.textContent = "Copy";
    btn.onclick = () => navigator.clipboard.writeText(text);

    div.appendChild(span);
    div.appendChild(btn);
    encodedMessages.appendChild(div);

    encodedMessages.scrollTop = encodedMessages.scrollHeight;
}

/* ---------------- SAVE / LOAD ---------------- */
function saveMessages() {
    localStorage.setItem("shadowChat_messages", chatMessages.innerHTML);
    localStorage.setItem("shadowChat_encoded", encodedMessages.innerHTML);
}

function loadMessages() {
    chatMessages.innerHTML = localStorage.getItem("shadowChat_messages") || "";
    encodedMessages.innerHTML = localStorage.getItem("shadowChat_encoded") || "";
}

window.addEventListener("load", loadMessages);

/* ---------------- CLEAR ---------------- */
function clearAll() {
    chatMessages.innerHTML = "";
    encodedMessages.innerHTML = "";
    localStorage.removeItem("shadowChat_messages");
    localStorage.removeItem("shadowChat_encoded");
}
window.clearAll = clearAll;
