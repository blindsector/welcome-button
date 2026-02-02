const API_BASE = "https://penguin-nlp-server.onrender.com";

// ================== API ВРЪЗКА ==================

async function encodeText(text) {
    const res = await fetch(API_BASE + "/encode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text, dictionary: DICTIONARY })
    });
    const data = await res.json();
    return data.result;
}

async function decodeText(text) {
    const res = await fetch(API_BASE + "/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text, dictionary: DICTIONARY })
    });
    const data = await res.json();
    return data.result;
}

// ================== UI ЛОГИКА ==================

document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("messageInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const input = document.getElementById("messageInput");
    const text = input.value.trim();
    if (!text) return;

    addChatBubble(text, "me");

    const encoded = await encodeText(text);
    addEncoded(encoded, false);

    saveMessages();
    input.value = "";
}

async function decodeIncoming() {
    const codeInput = document.getElementById("incomingCode");
    const code = codeInput.value.trim();
    if (!code) return;

    const decoded = await decodeText(code);

    addChatBubble(decoded, "her");
    addEncoded(code, true);

    saveMessages();
    codeInput.value = "";
}

// ================== ЧАТ ВИЗУАЛИЗАЦИЯ ==================

function addChatBubble(text, sender) {
    const chat = document.getElementById("chatMessages");
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble " + sender;
    bubble.textContent = text;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
}

function addEncoded(text, incoming) {
    const encodedBox = document.getElementById("encodedMessages");
    const bubble = document.createElement("div");
    bubble.className = "encoded-bubble " + (incoming ? "incoming" : "outgoing");
    bubble.textContent = text;
    encodedBox.appendChild(bubble);
    encodedBox.scrollTop = encodedBox.scrollHeight;
}

// ================== LOCAL STORAGE ==================

function saveMessages() {
    localStorage.setItem("chatMessages", document.getElementById("chatMessages").innerHTML);
    localStorage.setItem("encodedMessages", document.getElementById("encodedMessages").innerHTML);
}

function loadMessages() {
    document.getElementById("chatMessages").innerHTML = localStorage.getItem("chatMessages") || "";
    document.getElementById("encodedMessages").innerHTML = localStorage.getItem("encodedMessages") || "";
}

window.onload = loadMessages;
