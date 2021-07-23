import { newMessage, renderMessages } from "./receive.js"
import { sendMessage } from "./send.js"

const rooms = document.querySelectorAll(".Room")
const sendBtn = document.getElementById("send-btn")

let URL = "ws://localhost:3000/room"
let currentRoom = undefined

for (const room of rooms) {
    room.addEventListener("click", e => {
        currentRoom = e.target.dataset.rid
        const roomUrl = URL + `?rid=${e.target.dataset.rid}`

        const webSocket = new WebSocket(roomUrl)

        webSocket.onopen = e => {
            console.log("Connected to the websocket server")
        }

        webSocket.onmessage = e => {
            newMessage(JSON.parse(e.data))
            renderMessages(currentRoom)
        }

        sendBtn.addEventListener("click", () => {
            sendMessage(
                webSocket,
                document.getElementById("message-input").value
            )
        })
    })
}
