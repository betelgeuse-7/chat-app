import http from "http"
import { getConnection } from "typeorm"
import ws from "ws"
import { User } from "../db/entities/User"
import { Client } from "../types/Client"
import { WSResponse } from "../types/Response"
import { sendMessageToRoom } from "./sendToRoom"

export let CLIENTS: Array<Client> = []

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
            getConnection()
                .getRepository(User)
                .findOne({ sessionId: USER_SESSION_ID })
                .then(u => {
                    const username = u?.username
                    const date = new Date()

                    if (username) {
                        const response: WSResponse = {
                            username,
                            date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
                            roomId: ROOM_ID,
                            message: msg,
                        }

                        console.log(response)
                        sendMessageToRoom(ROOM_ID, response)
                    }
                })
        })
    })
}
