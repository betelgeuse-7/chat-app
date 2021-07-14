import ws from "ws"
import {broadcastMessage} from "./broadcast"
import {WSMessage} from "../Message"
import {WSClient} from "../Client"

let CLIENTS: WSClient[] = []

export const setUpWss = (wss: ws) => {
wss.on("connection", (w: ws) => {
        console.log("connected")
        CLIENTS.push({ clientId: Math.random(), socket: w })
        w.on("message", (msg: WSMessage) => {
            console.log("received: ", msg)
            broadcastMessage(CLIENTS, msg)
        })
    })

}