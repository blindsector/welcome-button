const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const encodedMessages = document.getElementById("encodedMessages");

sendBtn.onclick = sendMessage;

/* ---------------- SMART SPLIT ---------------- */
function smartSplit(text) {
    return text.split(/(\s+|[,.!?])/).filter(t => t !== "");
}

function preserveCase(original, replacement) {
    if (original[0] === original[0]?.toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement;
}

/* ---------------- ENCODE ---------------- */
function encodeText(text) {
    return smartSplit(text).map(token => {
        const lower = token.toLowerCase();
        if (baseDictionary[lower]) {
            return preserveCase(token, baseDictionary[lower]);
        }
        return token;
    }).join(" ");
}

/* ---------------- DECODE ---------------- */
function decodeText(text) {
    const tokens = smartSplit(text);
    let result = [];

    for (let i = 0; i < tokens.length; i++) {
        let current = tokens[i];
        let next = tokens[i + 1] || "";

        // Проверка за фраза от 2 думи
        const twoWord = (current + " " + next).toLowerCase().trim();

        if (reverseDictionary[twoWord]) {
            result.push(preserveCase(current, reverseDictionary[twoWord]));
            i++; // прескачаме следващата дума САМО ако има фраза
            continue;
        }

        // Иначе декодираме само текущата дума
        const lower = current.toLowerCase();
        if (reverseDictionary[lower]) {
            result.push(preserveCase(current, reverseDictionary[lower]));
        } else {
            result.push(current);
        }
    }

    return result.join(" ");
}


/* ---------------- SEND MESSAGE ---------------- */
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const encoded = encodeText(text);
    addEncoded(encoded);
    addChatBubble(text, "me");

    saveMessages();
    messageInput.value = "";
}

/* ---------------- DECODE INCOMING ---------------- */
function decodeIncoming() {
    const code = document.getElementById("incomingCode").value.trim();
    if (!code) return;

    const decoded = decodeText(code);
    addChatBubble(decoded, "her");

    saveMessages();
    document.getElementById("incomingCode").value = "";
}

/* ---------------- CHAT BUBBLE ---------------- */
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

/* ---------------- ENCODED MESSAGE + COPY BUTTON ---------------- */
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

/* ---------------- CLEAR BUTTON ---------------- */
function clearAll() {
    chatMessages.innerHTML = "";
    encodedMessages.innerHTML = "";
    localStorage.removeItem("shadowChat_messages");
    localStorage.removeItem("shadowChat_encoded");
}
