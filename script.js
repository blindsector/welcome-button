const API_BASE = "https://penguin-nlp-server.onrender.com"; // временен онлайн мозък

// ================== API ВРЪЗКА ==================

async function encodeText(text) {
    const res = await fetch(API_BASE + "/encode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            text: text,
            dictionary: DICTIONARY
        })
    });
    const data = await res.json();
    return data.result;
}


async function decodeText(text) {
    const res = await fetch(API_BASE + "/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            text: text,
            dictionary: DICTIONARY
        })
    });
    const data = await res.json();
    return data.result;
}


// ================== СТАРИТЕ ФУНКЦИИ (НЕ ГИ ПИПАМЕ) ==================

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

// ================== ОСТАНАЛОТО СИ ОСТАВА СЪЩОТО ==================

// Тук остават всички твои функции като:
// addChatBubble, addEncoded, saveMessages, loadMessages,
// exportChat, clearAll, scroll behavior и т.н.
// НЕ ги пипаме — те вече са в твоя файл и ще си работят.
