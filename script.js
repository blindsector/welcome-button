const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const encodedMessages = document.getElementById("encodedMessages");
const chatMessages = document.getElementById("chatMessages");

let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
let encodedHistory = JSON.parse(localStorage.getItem("encodedHistory")) || [];

sendBtn.onclick = sendMessage;

function encodeText(text) {
  let result = text.toLowerCase();

  // сортираме фразите по дължина (по-дългите първо)
  const phrases = Object.keys(dictionary).sort((a, b) => b.length - a.length);

  phrases.forEach(phrase => {
    const regex = new RegExp("\\b" + phrase + "\\b", "gi");
    result = result.replace(regex, dictionary[phrase]);
  });

  return result;
}

function decodeText(text) {
  let result = text;

  const phrases = Object.keys(reverseDictionary).sort((a, b) => b.length - a.length);

  phrases.forEach(phrase => {
    const regex = new RegExp("\\b" + phrase + "\\b", "gi");
    result = result.replace(regex, reverseDictionary[phrase]);
  });

  return result;
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  const encoded = encodeText(text);

  addEncoded(encoded);
  addChatBubble(text, "me");

  encodedHistory.push(encoded);
  chatHistory.push({ sender: "me", text });

  saveData();
  messageInput.value = "";
}

function decodeIncoming() {
  const code = document.getElementById("incomingCode").value.trim();
  if (!code) return;

  const decoded = decodeText(code);

  addChatBubble(decoded, "her");

  chatHistory.push({ sender: "her", text: decoded });
  saveData();

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

function saveData() {
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  localStorage.setItem("encodedHistory", JSON.stringify(encodedHistory));
}

function loadData() {
  chatHistory.forEach(msg => addChatBubble(msg.text, msg.sender));
  encodedHistory.forEach(msg => addEncoded(msg));
}

window.addEventListener("load", loadData);

function clearAll() {
  encodedMessages.innerHTML = "";
  chatMessages.innerHTML = "";

  localStorage.removeItem("chatHistory");
  localStorage.removeItem("encodedHistory");

  chatHistory = [];
  encodedHistory = [];
}
