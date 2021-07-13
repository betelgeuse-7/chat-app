import express from "express"
const WebSocket = require("ws")
import ws from "ws"
import path from "path"

const PORT = process.env.PORT || 3000

const app = express()
const server = app.listen(PORT)
const wss = new WebSocket.Server({
    server,
    host: "localhost",
    path: "/chat",
})

import { WSMessage } from "./Message"
import { WSClient } from "./Client"

const PUBLIC = path.join(__dirname, "../public")

let CLIENTS: WSClient[] = []

app.use("/static", express.static(PUBLIC))

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/chat", (req, res) => {
    res.sendFile(path.join(PUBLIC, "chat.html"))
})

wss.on("connection", (w: ws) => {
    console.log("connected")
    CLIENTS.push({ clientId: Math.random(), socket: w })
    w.on("message", (msg: WSMessage) => {
        console.log("received: ", msg)
        broadcastMessage(CLIENTS, msg)
    })
})

const broadcastMessage = (clients: WSClient[], message: WSMessage) => {
    clients.forEach((c: WSClient) => {
        c.socket.send(message)
    })
}

app.listen(() => {
    console.log(`app is listening to port ${PORT}`)
})
