const sendBtn = document.getElementById("send-message-btn")
const messageInput = document.getElementById("message-input")
const inputDiv = document.getElementById("input-div")

import { ERROR } from "./constants.js"
import { webSocket } from "./ws.js"

const sendMessage = () => {
    const message = {
        value: messageInput.value,
        username: document.cookie.split("USERNAME=")[1],
    }
    console.log("CLIENT MESSAGE: ", message)

    if (checkMessage(message)) {
        webSocket.send(JSON.stringify(message))
        // remove old error message
        if (document.querySelector(".MessageError")) {
            inputDiv.removeChild(document.querySelector(".MessageError"))
        }
        return
    }
    inputDiv.appendChild(ERROR())
}

const checkMessage = msg => {
    if (msg.value.trim().length === 0) return false
    return true
}

sendBtn.addEventListener("click", sendMessage)
