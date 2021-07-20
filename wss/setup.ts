import http from "http"
import ws from "ws"
import { Client } from "../types/Client"
import { sendMessageToRoom } from "./sendToRoom"

let CLIENTS: Array<Client> = []

export const setUpWss = (wss: ws) => {
    wss.on("connection", (w: ws, req: http.IncomingMessage) => {
        const ROOM_ID = Number(req.url!.split("/room?rid=")[1])
        const USER_SESSION_ID = req.headers.cookie!.split("SESSION_ID=")[1]
        const CLIENT = {
            sessionId: USER_SESSION_ID,
            roomId: ROOM_ID,
            socket: w,
        }

        CLIENTS.push(CLIENT)

        w.on("message", (msg: string) => {
            const message = {
                roomId: ROOM_ID,
                userSessionId: USER_SESSION_ID,
                message: msg,
            }

            console.log(message)
            sendMessageToRoom(
                CLIENTS.filter(c => c.roomId === message.roomId),
                message
            )
        })
    })
}
