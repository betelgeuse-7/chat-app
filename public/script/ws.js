import { newMessage } from "./receive.js"
import { sendMessage } from "./send.js"

const sendBtn = document.getElementById("send-btn")
const messageInput = document.getElementById("message-input")

let URL = location.href.replace("http://", "ws://")

const webSocket = new WebSocket(URL)

webSocket.onopen = e => {
    console.log("Connected to the websocket server")
}

webSocket.onmessage = e => {
    newMessage(JSON.parse(e.data))
}

sendBtn.addEventListener("click", () =>
    sendMessage(webSocket, messageInput.value)
)
