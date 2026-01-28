import { encodeText, decodeText } from "./semanticEngine.js";

const inputText = document.getElementById("inputText");
const chatBox = document.getElementById("chatBox");
const encodedReplyBox = document.getElementById("encodedReply");

let chatHistory = [];

/* ===== SAFE RENDER ===== */
function renderMessage(text, sender) {
    const chat = document.getElementById("chat");

    const msg = document.createElement("div");
    msg.className = "message " + sender;

    if (sender === "bot") {
        msg.innerHTML = "🔒 <b>Кодирано:</b> " + text;
    } else {
        msg.textContent = "🧠 Ти: " + text;
    }

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}


/* ===== SEND ===== */
window.sendMessage = function () {
    const text = inputText.value.trim();
    if (!text) return;

    renderMessage("🧠 Ти: " + text, "user");

    const encoded = encodeText(text);
    setTimeout(() => {
        renderMessage("🔐 Кодирано: " + encoded, "coded");
    }, 300);

    inputText.value = "";
};

/* ===== COPY ===== */
window.copyLastCode = function () {
    const codes = document.querySelectorAll(".coded");
    if (!codes.length) return alert("Няма кодирано съобщение");

    const last = codes[codes.length - 1].textContent.replace("🔐 Кодирано: ", "");
    navigator.clipboard.writeText(last);
    alert("Кодът е копиран!");
};

/* ===== DECODE ===== */
window.decodeMessage = function () {
    const codedText = encodedReplyBox.value.trim();
    if (!codedText) return alert("Постави кодирано съобщение");

    const decoded = decodeText(codedText);
    renderMessage("💬 Разкодирано: " + decoded, "decoded");
    encodedReplyBox.value = "";
};

/* ===== ENTER SEND ===== */
inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

});
