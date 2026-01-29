const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const encodedMessages = document.getElementById("encodedMessages");

let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
let encodedHistory = JSON.parse(localStorage.getItem("encodedHistory")) || [];

sendBtn.onclick = sendMessage;

function encodeText(text) {
    return text.split(" ").map(word => dictionary[word.toLowerCase()] || word).join(" ");
}

function decodeText(text) {
  let decoded = text;

  // Подреждаме фразите по дължина (по-дългите първо)
  const phrases = Object.keys(reverseDictionary).sort((a, b) => b.length - a.length);

  phrases.forEach(phrase => {
    const original = reverseDictionary[phrase];

    // правим case-insensitive замяна
    const regex = new RegExp(phrase, "gi");
    decoded = decoded.replace(regex, original);
  });

  return decoded;
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

function saveMessages() {
    localStorage.setItem("shadow_encoded", document.getElementById("encodedMessages").innerHTML);
    localStorage.setItem("shadow_decoded", document.getElementById("chatMessages").innerHTML);
}

function loadMessages() {
    document.getElementById("encodedMessages").innerHTML = localStorage.getItem("shadow_encoded") || "";
    document.getElementById("chatMessages").innerHTML = localStorage.getItem("shadow_decoded") || "";
}

window.addEventListener("load", loadMessages);

function clearAll() {
    // Ляво – кодирани съобщения
    const encodedBox = document.getElementById("encodedMessages");

    // Дясно – разкодирани съобщения
    const chatBox = document.getElementById("chatMessages");

    // Чистим екрана
    encodedBox.innerHTML = "";
    chatBox.innerHTML = "";

    // Чистим запазеното в паметта
    localStorage.removeItem("shadow_encoded");
    localStorage.removeItem("shadow_decoded");
}

loadData();
