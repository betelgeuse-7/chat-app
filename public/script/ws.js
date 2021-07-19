import { newMessage } from "./receive.js"

const URL = "ws://localhost:3000/room"

export const webSocket = new WebSocket(URL)

webSocket.onopen = e => {
    console.log("Connected to the websocket server")
}

webSocket.on("init", () => {
    console.log("init")
})

webSocket.onmessage = e => {
    newMessage(e.data)
}
