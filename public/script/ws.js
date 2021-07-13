import { newMessage } from "./receive.js"

const URL = "ws://localhost:3000/chat"

export const webSocket = new WebSocket(URL)

webSocket.onopen = e => {
    console.log("Connected to the websocket server")
}

webSocket.onmessage = e => {
    newMessage(e.data)
}
