// ====== РЕЧНИК ======
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
}

// ====== КОДИРАНЕ ======
function encodeText(text) {
  return text.split(" ").map(word => {
    const clean = word.toLowerCase()
    return synonyms[clean] || word
  }).join(" ")
}

// ====== РАЗКОДИРАНЕ ======
function decodeText(text) {
  const reversed = Object.fromEntries(
    Object.entries(synonyms).map(([k,v]) => [v, k])
  )

  return text.split(" ").map(word => {
    const clean = word.toLowerCase()
    return reversed[clean] || word
  }).join(" ")
}

// ====== CHAT ЛОГИКА ======
const inputText = document.getElementById("inputText")
const replyInput = document.getElementById("replyInput")
const chatBox = document.getElementById("chatBox")

const history = JSON.parse(localStorage.getItem("wastelandChat") || "[]")

function save() {
  localStorage.setItem("wastelandChat", JSON.stringify(history))
}

function render() {
  chatBox.innerHTML = ""
  history.forEach(msg => {
    const div = document.createElement("div")
    div.className = "bubble " + msg.type
    div.textContent = msg.text
    chatBox.appendChild(div)
  })
  chatBox.scrollTop = chatBox.scrollHeight
}

function addMessage(text, type) {
  history.push({ text, type })
  save()
  render()
}

function doEncode() {
  const text = inputText.value.trim()
  if (!text) return
  const encoded = encodeText(text)
  addMessage("🧠 Ти: " + text, "user")
  addMessage("🔒 Кодирано: " + encoded, "code")
  inputText.value = ""
}

function doDecode() {
  const text = replyInput.value.trim()
  if (!text) return
  const decoded = decodeText(text)
  addMessage("📨 Получено: " + text, "code")
  addMessage("💬 Разкодирано: " + decoded, "user")
  replyInput.value = ""
}

document.getElementById("encodeBtn").onclick = doEncode
document.getElementById("decodeBtn").onclick = doDecode

document.getElementById("copyBtn").onclick = () => {
  const last = history.filter(m => m.type === "code").pop()
  if (!last) return
  navigator.clipboard.writeText(last.text.replace("🔒 Кодирано: ", ""))
}

// ENTER ПОДДРЪЖКА
inputText.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    doEncode()
  }
})

replyInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    doDecode()
  }
})

render()
