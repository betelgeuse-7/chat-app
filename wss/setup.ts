import ws from "ws"
import { broadcastMessage } from "./broadcast"

let CLIENTS: Set<ws> = new Set()

export const setUpWss = (wss: ws) => {
    wss.on("connection", (w: ws) => {
        // TODO send jwt token

        CLIENTS.add(w)
        w.on("message", (msg: string) => {
            broadcastMessage(CLIENTS, msg)
        })
    })
}
