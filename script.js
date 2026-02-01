const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const encodedMessages = document.getElementById("encodedMessages");

// 👉 ВЗИМАМЕ РОДИТЕЛИТЕ, КОИТО РЕАЛНО СКРОЛВАТ
const chatPanel = chatMessages.parentElement;
const encodedPanel = encodedMessages.parentElement;

sendBtn.onclick = sendMessage;

/* ---------------- РАЗДЕЛЯНЕ НА ДУМИ ---------------- */
function smartSplit(text) {
    return text.match(/[A-Za-zА-Яа-я0-9]+|[.,!?]/g) || [];
}

/* ---------------- ЗАПАЗВАНЕ НА ГЛАВНИ БУКВИ ---------------- */
function preserveCase(original, replacement) {
    if (original === original.toUpperCase()) return replacement.toUpperCase();
    if (original[0] === original[0].toUpperCase())
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    return replacement;
}

/* ---------------- СМЯНА ПО РЕЧНИЦИ ---------------- */
function transformWord(word) {
    const lower = word.toLowerCase();

    if (ADJ[lower]) return preserveCase(word, ADJ[lower]);
    if (NOUN[lower]) return preserveCase(word, NOUN[lower]);
    if (VERB[lower]) return preserveCase(word, VERB[lower]);

    return word;
}

function transformText(text) {
    return smartSplit(text).map(transformWord).join(" ");
}

/* ---------------- ИСТИНСКИ СКРОЛ ---------------- */
function scrollToBottomSmooth() {
    chatPanel.scrollTo({ top: chatPanel.scrollHeight, behavior: "smooth" });
    encodedPanel.scrollTo({ top: encodedPanel.scrollHeight, behavior: "smooth" });
}

/* ---------------- ИЗПРАЩАНЕ ---------------- */
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const encoded = transformText(text);

    addChatBubble(text, "me");
    addEncoded(encoded, false);

    saveMessages();
    messageInput.value = "";
}

/* ---------------- РАЗКОДИРАНЕ НА ВХОДЯЩО ---------------- */
function decodeIncoming() {
    const code = document.getElementById("incomingCode").value.trim();
    if (!code) return;

    const decoded = transformText(code);

    addChatBubble(decoded, "her");
    addEncoded(code, true);

    saveMessages();
    document.getElementById("incomingCode").value = "";
}

window.decodeIncoming = decodeIncoming;

/* ---------------- COPY С ЕФЕКТ ---------------- */
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

/* ---------------- ЧАТ БАЛОН ---------------- */
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

/* ---------------- КОДИРАНИ БАЛОНИ ---------------- */
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

/* ---------------- SAVE / LOAD ---------------- */
function saveMessages() {
    localStorage.setItem("shadowChat_messages", chatMessages.innerHTML);
    localStorage.setItem("shadowChat_encoded", encodedMessages.innerHTML);
}

function loadMessages() {
    chatMessages.innerHTML = localStorage.getItem("shadowChat_messages") || "";
    encodedMessages.innerHTML = localStorage.getItem("shadowChat_encoded") || "";

    requestAnimationFrame(() => {
        requestAnimationFrame(scrollToBottomSmooth);
    });
}

window.addEventListener("load", loadMessages);

/* ---------------- CLEAR ---------------- */
function clearAll() {
    chatMessages.innerHTML = "";
    encodedMessages.innerHTML = "";
    localStorage.removeItem("shadowChat_messages");
    localStorage.removeItem("shadowChat_encoded");
}
window.clearAll = clearAll;

/* ---------------- EXPORT ---------------- */
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

function toggleHelp() {
  const modal = document.getElementById("helpModal");
  modal.classList.toggle("hidden");
}

/* COPY BUTTON FOR ENCODED MESSAGES */
function addCopyButtons() {
  document.querySelectorAll(".encoded-message").forEach(msg => {
    if (!msg.querySelector(".copy-btn")) {
      const btn = document.createElement("button");
      btn.textContent = "Copy";
      btn.className = "copy-btn";
      btn.onclick = () => {
        navigator.clipboard.writeText(
          msg.childNodes[0].textContent.trim()
        );
        btn.textContent = "Copied!";
        setTimeout(() => btn.textContent = "Copy", 1200);
      };
      msg.appendChild(document.createElement("br"));
      msg.appendChild(btn);
    }
  });
}

/* наблюдаваме за нови съобщения */
const observer = new MutationObserver(addCopyButtons);
window.addEventListener("load", () => {
  const target = document.getElementById("encodedMessages");
  if (target) observer.observe(target, { childList: true });
});
