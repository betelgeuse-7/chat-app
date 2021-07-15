import ws from "ws"
import { broadcastMessage } from "./broadcast"
import { WSMessage } from "../types/Message"
import { WSClient } from "../types/Client"

let CLIENTS: WSClient[] = []

export const setUpWss = (wss: ws) => {
    wss.on("connection", (w: ws) => {
        console.log("connected")
        CLIENTS.push({ clientId: Math.random(), socket: w })
        w.on("message", (msg: string) => {
            const message: WSMessage = {
                value: JSON.parse(msg).value,
                username: JSON.parse(msg).username,
            }
            console.log(message)

            broadcastMessage(CLIENTS, msg)
        })
    })
}
