const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const encodedMessages = document.getElementById("encodedMessages");

sendBtn.onclick = sendMessage;

/* ---------------- REVERSE DICTIONARIES (AUTO) ---------------- */

function makeReverse(dict) {
    const rev = {};
    for (let k in dict) {
        rev[dict[k]] = k;
    }
    return rev;
}

const reverseDirectWords = makeReverse(directWords);
const reverseVerbRoots   = makeReverse(verbRoots);
const reverseNounRoots   = makeReverse(nounRoots);
const reverseAdjRoots    = makeReverse(adjRoots);

/* ---------------- HELPERS ---------------- */

function splitEnding(word, roots) {
    let match = null;
    for (let root in roots) {
        if (word.startsWith(root)) {
            if (!match || root.length > match.root.length) {
                match = { root, ending: word.slice(root.length) };
            }
        }
    }
    return match;
}

function preserveCase(original, replacement) {
    if (original[0] === original[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement;
}

function smartSplit(text) {
    return text.match(/[\wа-яА-Я]+|[.,!?]/g) || [];
}

/* ---------------- ENCODE ---------------- */

function encodeWord(word) {
    const lower = word.toLowerCase();

    if (directWords[lower]) {
        return preserveCase(word, directWords[lower]);
    }

    let v = splitEnding(lower, verbRoots);
    if (v) return preserveCase(word, verbRoots[v.root] + v.ending);

    let n = splitEnding(lower, nounRoots);
    if (n) return preserveCase(word, nounRoots[n.root] + n.ending);

    let a = splitEnding(lower, adjRoots);
    if (a) return preserveCase(word, adjRoots[a.root] + a.ending);

    return word;
}


function encodeText(text) {
    return smartSplit(text).map(encodeWord).join(" ");
}

/* ---------------- DECODE ---------------- */

function decodeWord(word) {
    const lower = word.toLowerCase();

    if (reverseDirectWords[lower]) {
        return preserveCase(word, reverseDirectWords[lower]);
    }

    let v = splitEnding(lower, reverseVerbRoots);
    if (v) return preserveCase(word, reverseVerbRoots[v.root] + v.ending);

    let n = splitEnding(lower, reverseNounRoots);
    if (n) return preserveCase(word, reverseNounRoots[n.root] + n.ending);

    let a = splitEnding(lower, reverseAdjRoots);
    if (a) return preserveCase(word, reverseAdjRoots[a.root] + a.ending);

    return word;
}


function decodeText(text) {
    return smartSplit(text).map(decodeWord).join(" ");
}

/* ---------------- SEND MESSAGE ---------------- */

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const encoded = encodeText(text);
    addEncoded(encoded);
    addChatBubble(text, "me");

    saveMessages();
    messageInput.value = "";
}

/* ---------------- DECODE INCOMING ---------------- */

function decodeIncoming() {
    const code = document.getElementById("incomingCode").value.trim();
    if (!code) return;

    const decoded = decodeText(code);
    addChatBubble(decoded, "her");

    saveMessages();
    document.getElementById("incomingCode").value = "";
}

window.decodeIncoming = decodeIncoming;

/* ---------------- UI ---------------- */

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
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addEncoded(text) {
    const div = document.createElement("div");
    div.className = "encodedLine";

    const span = document.createElement("span");
    span.textContent = text;

    const btn = document.createElement("button");
    btn.textContent = "Copy";
    btn.onclick = () => navigator.clipboard.writeText(text);

    div.appendChild(span);
    div.appendChild(btn);
    encodedMessages.appendChild(div);
    encodedMessages.scrollTop = encodedMessages.scrollHeight;
}

/* ---------------- SAVE / LOAD ---------------- */

function saveMessages() {
    localStorage.setItem("shadowChat_messages", chatMessages.innerHTML);
    localStorage.setItem("shadowChat_encoded", encodedMessages.innerHTML);
}

function loadMessages() {
    chatMessages.innerHTML = localStorage.getItem("shadowChat_messages") || "";
    encodedMessages.innerHTML = localStorage.getItem("shadowChat_encoded") || "";
}

window.addEventListener("load", loadMessages);
