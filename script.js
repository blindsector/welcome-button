document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("sendBtn");
    const messageInput = document.getElementById("messageInput");
    const encodedMessages = document.getElementById("encodedMessages");
    const decodedMessages = document.getElementById("decodedMessages");
    const clearBtn = document.getElementById("clearBtn");
    const exportBtn = document.getElementById("exportBtn");
    const incomingInput = document.getElementById("incomingInput");
    const decodeIncomingBtn = document.getElementById("decodeIncomingBtn");

    let chatHistory = JSON.parse(localStorage.getItem("shadowChatHistory")) || [];

    function saveHistory() {
        localStorage.setItem("shadowChatHistory", JSON.stringify(chatHistory));
    }

    function encodeMessage(text) {
        return text.split(" ").map(encodeWord).join(" ");
    }

    function decodeMessage(text) {
        return text.split(" ").map(decodeWord).join(" ");
    }

    function addEncodedMessage(text) {
        const msgDiv = document.createElement("div");
        msgDiv.className = "message";
        msgDiv.textContent = text;

        const copyBtn = document.createElement("button");
        copyBtn.textContent = "Copy";
        copyBtn.className = "copy-btn";
        copyBtn.onclick = () => navigator.clipboard.writeText(text);
        msgDiv.appendChild(copyBtn);

        encodedMessages.appendChild(msgDiv);
    }

    function addChatMessage(text, sender, skipSave = false) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `message ${sender}`;

        const label = document.createElement("div");
        label.className = "message-label";
        label.textContent = sender === "me" ? "Аз" : "ТЯ";

        msgDiv.textContent = text;
        msgDiv.appendChild(label);

        decodedMessages.appendChild(msgDiv);
        decodedMessages.scrollTop = decodedMessages.scrollHeight;

        if (!skipSave) {
            chatHistory.push({ text, sender });
            saveHistory();
        }
    }

    function loadHistory() {
        chatHistory.forEach(msg => {
            addChatMessage(msg.text, msg.sender, true);
        });
    }

    sendBtn.addEventListener("click", () => {
        const text = messageInput.value.trim();
        if (!text) return;

        const encoded = encodeMessage(text);

        addEncodedMessage(encoded);
        addChatMessage(text, "me");

        messageInput.value = "";
    });

    decodeIncomingBtn.addEventListener("click", () => {
        const incoming = incomingInput.value.trim();
        if (!incoming) return;

        const decoded = decodeMessage(incoming);
        addChatMessage(decoded, "her");

        incomingInput.value = "";
    });

    clearBtn.addEventListener("click", () => {
        if (!confirm("Сигурен ли си?")) return;

        encodedMessages.innerHTML = "";
        decodedMessages.innerHTML = "";
        chatHistory = [];
        saveHistory();
    });

    exportBtn.addEventListener("click", () => {
        let text = "";
        chatHistory.forEach(m => {
            text += `${m.sender === "me" ? "Аз" : "ТЯ"}: ${m.text}\n`;
        });

        const blob = new Blob([text], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "chat.txt";
        a.click();
    });

    messageInput.addEventListener("keydown", e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    loadHistory();
});
