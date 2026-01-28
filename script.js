window.addEventListener("DOMContentLoaded", () => {

  const synonyms = {
    "имам": "притежавам",
    "нямам": "изгубил съм",
    "отивам": "скитам",
    "отиваме": "скитаме",
    "нося": "мъкна",
    "взимам": "прибирам",
    "давам": "подавам",
    "правя": "майсторя",
    "говоря": "мърморя",
    "казвам": "изричам",
    "виждам": "зървам",
    "чакам": "дебна",
    "трябва": "налага се",
    "искам": "копнея",
    "среща": "сбор",
    "срещата": "сбора",
    "пари": "капачки",
    "оръжие": "гърмялка",
    "кола": "бричка",
    "колата": "бричката",
    "храна": "дажба",
    "вода": "течност",
    "приятел": "оцеляващ",
    "враг": "мутант"
  };

  function encodeText(text) {
    return text.split(" ").map(word => synonyms[word.toLowerCase()] || word).join(" ");
  }

  function decodeText(text) {
    const reversed = Object.fromEntries(Object.entries(synonyms).map(([k,v]) => [v, k]));
    return text.split(" ").map(word => reversed[word.toLowerCase()] || word).join(" ");
  }

  const inputText = document.querySelector("#inputText");
  const replyInput = document.querySelector("#replyInput");
  const chatBox = document.querySelector("#chatBox");
  const encodeBtn = document.querySelector("#encodeBtn");
  const decodeBtn = document.querySelector("#decodeBtn");
  const copyBtn = document.querySelector("#copyBtn");

  if (!inputText || !replyInput || !chatBox || !encodeBtn || !decodeBtn) {
    alert("❌ HTML елемент липсва. Провери id-тата!");
    return;
  }

  const history = JSON.parse(localStorage.getItem("wastelandChat") || "[]");

  function save() {
    localStorage.setItem("wastelandChat", JSON.stringify(history));
  }

  function render() {
    chatBox.innerHTML = "";
    history.forEach(msg => {
      const div = document.createElement("div");
      div.className = "bubble " + msg.type;
      div.textContent = msg.text;
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function addMessage(text, type) {
    history.push({ text, type });
    save();
    render();
  }

  function doEncode() {
    const text = inputText.value.trim();
    if (!text) return;
    const encoded = encodeText(text);
    addMessage("🧠 Ти: " + text, "user");
    addMessage("🔒 Кодирано: " + encoded, "code");
    inputText.value = "";
  }

  function doDecode() {
    const text = replyInput.value.trim();
    if (!text) return;
    const decoded = decodeText(text);
    addMessage("📨 Получено: " + text, "code");
    addMessage("💬 Разкодирано: " + decoded, "user");
    replyInput.value = "";
  }

  encodeBtn.addEventListener("click", doEncode);
  decodeBtn.addEventListener("click", doDecode);

  inputText.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      doEncode();
    }
  });

  replyInput.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      doDecode();
    }
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const last = history.filter(m => m.type === "code").pop();
      if (!last) return;
      navigator.clipboard.writeText(last.text.replace("🔒 Кодирано: ", ""));
    });
  }

  render();
});
