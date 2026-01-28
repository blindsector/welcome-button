import { encodeText, decodeText } from "./semanticEngine.js";

const inputText = document.getElementById("inputText");
const chatBox = document.getElementById("chatBox");
const encodedReplyBox = document.getElementById("encodedReply");

let chatHistory = JSON.parse(localStorage.getItem("wastelandChat")) || [];

/* ================= RENDER ================= */
function renderChat() {
    chatBox.innerHTML = "";

    chatHistory.forEach(msg => {
        const bubble = document.createElement("div");
        bubble.className = "bubble " + msg.type;
        bubble.textContent = msg.text;
        chatBox.appendChild(bubble);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

/* ================= SAVE MESSAGE ================= */
function addMessage(text, type) {
    chatHistory.push({ text, type });
    localStorage.setItem("wastelandChat", JSON.stringify(chatHistory));
    renderChat();
}

/* ================= SEND MESSAGE ================= */
function sendMessage() {
    const text = inputText.value.trim();
    if (!text) return;

    addMessage("🧠 Ти: " + text, "user");

    const encoded = encodeText(text);
    setTimeout(() => {
        addMessage("🔐 Кодирано: " + encoded, "coded");
    }, 300);

    inputText.value = "";
}

/* ================= COPY LAST CODE ================= */
window.copyLastCode = function () {
    const coded = chatHistory.filter(m => m.type === "coded");
    if (!coded.length) return alert("Няма кодирано съобщение");

    navigator.clipboard.writeText(coded[coded.length - 1].text.replace("🔐 Кодирано: ", ""));
    alert("Кодът е копиран!");
};

/* ================= DECODE ================= */
window.decodeMessage = function () {
    const codedText = encodedReplyBox.value.trim();
    if (!codedText) return alert("Постави кодирано съобщение");

    const decoded = decodeText(codedText);
    addMessage("💬 Разкодирано: " + decoded, "decoded");
    encodedReplyBox.value = "";
};

/* ================= ENTER TO SEND ================= */
inputText.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

/* ================= START ================= */
renderChat();
