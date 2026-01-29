document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("sendBtn");
    const messageInput = document.getElementById("messageInput");
    const encodedMessages = document.getElementById("encodedMessages");
    const decodedMessages = document.getElementById("decodedMessages");
    const clearBtn = document.getElementById("clearBtn");
    const exportBtn = document.getElementById("exportBtn");
    const incomingInput = document.getElementById("incomingInput");
    const decodeIncomingBtn = document.getElementById("decodeIncomingBtn");

    function encodeMessage(text) {
        return text.split(" ").map(encodeWord).join(" ");
    }

    function decodeMessage(text) {
        return text.split(" ").map(decodeWord).join(" ");
    }

    function addMessage(container, text, isEncoded = false) {
        const msgDiv = document.createElement("div");
        msgDiv.className = "message";
        msgDiv.textContent = text;

        if (isEncoded) {
            const copyBtn = document.createElement("button");
            copyBtn.textContent = "Copy";
            copyBtn.className = "copy-btn";
            copyBtn.onclick = () => navigator.clipboard.writeText(text);
            msgDiv.appendChild(copyBtn);
        }

        container.appendChild(msgDiv);
    }

    sendBtn.addEventListener("click", () => {
        const text = messageInput.value.trim();
        if (!text) return;

        const encoded = encodeMessage(text);
        const decoded = decodeMessage(encoded);

        addMessage(encodedMessages, encoded, true);
        addMessage(decodedMessages, decoded);

        messageInput.value = "";
    });

    decodeIncomingBtn.addEventListener("click", () => {
        const incoming = incomingInput.value.trim();
        if (!incoming) return;

        const decoded = decodeMessage(incoming);
        addMessage(decodedMessages, decoded);
        incomingInput.value = "";
    });

    clearBtn.addEventListener("click", () => {
        encodedMessages.innerHTML = "";
        decodedMessages.innerHTML = "";
    });

    exportBtn.addEventListener("click", () => {
        let text = "";
        document.querySelectorAll("#decodedMessages .message").forEach(m => {
            text += m.firstChild.textContent + "\n";
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
});
