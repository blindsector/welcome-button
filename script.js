const API_BASE = "https://penguin-nlp-server.onrender.com";


// DOM
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const encodedMessages = document.getElementById("encodedMessages");

// Панелите, които реално скролват
const chatPanel = chatMessages.parentElement;
const encodedPanel = encodedMessages.parentElement;

sendBtn.onclick = sendMessage;

/* ================= СЪРВЪРНА ЛОГИКА ================= */

async function encodeText(text) {
    const res = await fetch(API_BASE + "/encode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
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
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: text,
            dictionary: DICTIONARY
        })
    });

    const data = await res.json();
    return data.result;
}

/* ================= SCROLL ================= */

function scrollToBottomSmooth() {
    chatPanel.scrollTo({ top: chatPanel.scrollHeight, behavior: "smooth" });
    encodedPanel.scrollTo({ top: encodedPanel.scrollHeight, behavior: "smooth" });
}

/* ================= SEND ================= */

async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    addChatBubble(text, "me");

    try {
        const encoded = await encodeText(text);
        addEncoded(encoded, false);
    } catch (err) {
        addEncoded("⚠️ Server error", false);
        console.error(err);
    }

    saveMessages();
    messageInput.value = "";
}

/* ================= DECODE ================= */

async function decodeIncoming() {
    const codeInput = document.getElementById("incomingCode");
    const code = codeInput.value.trim();
    if (!code) return;

    try {
        const decoded = await decodeText(code);
        addChatBubble(decoded, "her");
        addEncoded(code, true);
    } catch (err) {
        addChatBubble("⚠️ Decode error", "her");
        console.error(err);
    }

    saveMessages();
    codeInput.value = "";
}

window.decodeIncoming = decodeIncoming;

/* ================= COPY BUTTON ================= */

function copyWithFeedback(button, text) {
    navigator.clipboard.writeText(text);
    const original = button.textContent;
    button.textContent = "Copied ✓";
    button.classList.add("copied");
    setTimeout(() => {
        button.textContent = original;
        button.classList.remove("copied");
    }, 900);
}

/* ================= CHAT BUBBLES ================= */

function addChatBubble(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = "bubble " + sender;

    const label = document.createElement("div");
    label.className = "sender";
    label.textContent = sender === "me" ? "Аз" : "Тя";

    const msg = document.createElement("div");
    msg.textContent = text;

    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.onclick = () => copyWithFeedback(btn, text);

    bubble.appendChild(label);
    bubble.appendChild(msg);
    bubble.appendChild(btn);
    chatMessages.appendChild(bubble);

    requestAnimationFrame(scrollToBottomSmooth);
}

/* ================= ENCODED BUBBLES ================= */

function addEncoded(text, fromHer = false) {
    const bubble = document.createElement("div");
    bubble.className = "encoded-bubble " + (fromHer ? "encoded-her" : "encoded-me");

    const label = document.createElement("div");
    label.className = "sender";
    label.textContent = fromHer ? "Тя – получен код" : "Аз – изпратен код";

    const msg = document.createElement("div");
    msg.textContent = text;

    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.onclick = () => copyWithFeedback(btn, text);

    bubble.appendChild(label);
    bubble.appendChild(msg);
    bubble.appendChild(btn);
    encodedMessages.appendChild(bubble);

    requestAnimationFrame(scrollToBottomSmooth);
}

/* ================= SAVE / LOAD ================= */

function saveMessages() {
    localStorage.setItem("shadowChat_messages", chatMessages.innerHTML);
    localStorage.setItem("shadowChat_encoded", encodedMessages.innerHTML);
}

function loadMessages() {
    const savedChat = localStorage.getItem("shadowChat_messages");
    const savedEncoded = localStorage.getItem("shadowChat_encoded");

    if (savedChat) chatMessages.innerHTML = savedChat;
    if (savedEncoded) encodedMessages.innerHTML = savedEncoded;

    // Възстановяване на Copy бутоните след reload
    document.querySelectorAll(".copy-btn").forEach(btn => {
        const text = btn.parentElement.querySelector("div:nth-child(2)").textContent;
        btn.onclick = () => copyWithFeedback(btn, text);
    });

    requestAnimationFrame(() => {
        requestAnimationFrame(scrollToBottomSmooth);
    });
}


window.addEventListener("load", loadMessages);

/* ================= CLEAR ================= */

function clearAll() {
    chatMessages.innerHTML = "";
    encodedMessages.innerHTML = "";
    localStorage.removeItem("shadowChat_messages");
    localStorage.removeItem("shadowChat_encoded");
}
window.clearAll = clearAll;

/* ================= EXPORT ================= */

function exportChat() {
    const bubbles = chatMessages.querySelectorAll(".bubble");
    let text = "";

    bubbles.forEach(b => {
        const sender = b.querySelector(".sender").textContent;
        const msg = b.querySelector("div:nth-child(2)").textContent;
        text += sender + ": " + msg + "\n";
    });

    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "shadow_chat.txt";
    a.click();
}

window.exportChat = exportChat;
