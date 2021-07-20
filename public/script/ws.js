import { newMessage } from "./receive.js"
import { sendMessage } from "./send.js"

const rooms = document.querySelectorAll(".Room")
const sendBtn = document.getElementById("send-btn")

let URL = "ws://localhost:3000/room"

for (const room of rooms) {
    room.addEventListener("click", e => {
        let roomUrl = URL + `?rid=${e.target.dataset.rid}`

        const webSocket = new WebSocket(roomUrl)

        webSocket.onopen = e => {
            console.log("Connected to the websocket server")
        }

        webSocket.onmessage = e => {
            newMessage(e.data)
        }

        sendBtn.addEventListener("click", () => {
            sendMessage(
                webSocket,
                document.getElementById("message-input").value
            )
        })
    })
}
