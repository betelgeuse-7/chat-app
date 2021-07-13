const sendBtn = document.getElementById("send-message-btn")
const messageInput = document.getElementById("message-input")
const inputDiv = document.getElementById("input-div")

import { ERROR } from "./constants.js"
import { webSocket } from "./ws.js"

const sendMessage = () => {
    const message = messageInput.value
    if (checkMessage(message)) {
        webSocket.send(message)
        // remove old error message
        if (document.querySelector(".MessageError")) {
            inputDiv.removeChild(document.querySelector(".MessageError"))
        }
        return
    }
    inputDiv.appendChild(ERROR())
}

const checkMessage = msg => {
    if (msg.trim().length === 0) return false
    return true
}

sendBtn.addEventListener("click", sendMessage)
