import { encodeText } from "./semanticEngine.js";

const inputText = document.getElementById("inputText");
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");

let history = [];

function renderMessage(text, type) {
    const bubble = document.createElement("div");
    bubble.className = `bubble ${type}`;
    bubble.textContent = text;
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const text = inputText.value.trim();
    if (!text) return;

    renderMessage(text, "user");

    const encoded = encodeText(text);
    setTimeout(() => renderMessage(encoded, "bot"), 300);

    inputText.value = "";
}
function copyLastCode() {
    const bubbles = document.querySelectorAll(".coded");
    if (bubbles.length === 0) return;
    const last = bubbles[bubbles.length - 1].innerText;
    navigator.clipboard.writeText(last);
}


sendBtn.addEventListener("click", sendMessage);

inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
    inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // спира нов ред
        handleEncode();     // праща съобщението
    }
});
