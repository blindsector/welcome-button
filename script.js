import { encodeText, decodeText } from "./semanticEngine.js"

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

document.getElementById("encodeBtn").onclick = () => {
  const text = inputText.value.trim()
  if (!text) return
  const encoded = encodeText(text)
  addMessage("🧠 Ти: " + text, "user")
  addMessage("🔒 Кодирано: " + encoded, "code")
  inputText.value = ""
}

document.getElementById("decodeBtn").onclick = () => {
  const text = replyInput.value.trim()
  if (!text) return
  const decoded = decodeText(text)
  addMessage("📨 Получено: " + text, "code")
  addMessage("💬 Разкодирано: " + decoded, "user")
  replyInput.value = ""
}

document.getElementById("copyBtn").onclick = () => {
  const last = history.filter(m => m.type === "code").pop()
  if (!last) return
  navigator.clipboard.writeText(last.text.replace("🔒 Кодирано: ", ""))
}

render()
