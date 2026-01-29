const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const encodedBox = document.getElementById("encodedChat");
const decodedBox = document.getElementById("decodedChat");

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  const encoded = encodeText(text);
  const decoded = decodeText(encoded);

  addMessage(encodedBox, encoded, true);
  addMessage(decodedBox, decoded, false);

  saveHistory(encoded, decoded);
  input.value = "";
}

function encodeText(text) {
  let words = text.split(" ");
  return words.map(w => nounMap[w] || verbMap[w] || w).join(" ");
}

function decodeText(text) {
  let words = text.split(" ");
  return words.map(w => getKeyByValue(nounMap, w) || getKeyByValue(verbMap, w) || w).join(" ");
}

function getKeyByValue(obj, val) {
  return Object.keys(obj).find(key => obj[key] === val);
}

function addMessage(box, text, isEncoded) {
  const div = document.createElement("div");
  div.className = "message";
  div.innerText = text;

  if (isEncoded) {
    const btn = document.createElement("button");
    btn.innerText = "Copy";
    btn.onclick = () => navigator.clipboard.writeText(text);
    div.appendChild(document.createElement("br"));
    div.appendChild(btn);
  }

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function saveHistory(enc, dec) {
  const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  history.push({ enc, dec });
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  history.forEach(m => {
    addMessage(encodedBox, m.enc, true);
    addMessage(decodedBox, m.dec, false);
  });
}

function clearChat() {
  localStorage.removeItem("chatHistory");
  encodedBox.innerHTML = "";
  decodedBox.innerHTML = "";
}

function exportChat() {
  const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  const text = history.map(m => m.dec).join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "decoded_chat.txt";
  a.click();
}

window.onload = loadHistory;
