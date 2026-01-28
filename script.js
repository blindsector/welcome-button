import { encodeText, decodeText } from "./semanticEngine.js";

const inputBox = document.getElementById("inputText");
const chatBox = document.getElementById("chatBox");
const encodedReplyBox = document.getElementById("encodedReply");

let chatHistory = JSON.parse(localStorage.getItem("wastelandChat")) || [];

// =======================
// 💬 РЕНДЕР НА ЧАТА
// =======================
function renderChat() {
  chatBox.innerHTML = "";

  chatHistory.forEach(msg => {
    const bubble = document.createElement("div");
    bubble.className = msg.type === "user" ? "bubble user" : "bubble coded";
    bubble.textContent = msg.text;
    chatBox.appendChild(bubble);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

// =======================
// ➕ ДОБАВЯНЕ НА СЪОБЩЕНИЕ
// =======================
function addMessage(text, type) {
  chatHistory.push({ text, type });
  localStorage.setItem("wastelandChat", JSON.stringify(chatHistory));
  renderChat();
}

// =======================
// 🔐 КОДИРАНЕ
// =======================
function handleEncode() {
  const text = inputBox.value.trim();
  if (!text) return;

  addMessage("🧠 Ти: " + text, "user");

  const encoded = encodeText(text);
  addMessage("🔒 Кодирано: " + encoded, "coded");

  encodedReplyBox.value = encoded;
  inputBox.value = "";
}

// =======================
// 🔓 РАЗКОДИРАНЕ
// =======================
function handleDecode() {
  const text = encodedReplyBox.value.trim();
  if (!text) return;

  const decoded = decodeText(text);
  addMessage("🔓 Разкодирано: " + decoded, "user");
}

// =======================
// 📋 КОПИРАНЕ НА ПОСЛЕДНОТО КОДИРАНО
// =======================
function copyLastEncoded() {
  if (!encodedReplyBox.value) return;
  navigator.clipboard.writeText(encodedReplyBox.value);
}

// =======================
// ⌨️ ENTER = ИЗПРАЩАНЕ
// =======================
inputBox.addEventListener("keydown", e => {
  if (e.key === "Enter") handleEncode();
});

// =======================
// 🔘 БУТОНИ
// =======================
document.getElementById("encodeBtn").onclick = handleEncode;
document.getElementById("decodeBtn").onclick = handleDecode;
document.getElementById("copyBtn").onclick = copyLastEncoded;

// Първоначално зареждане
renderChat();
