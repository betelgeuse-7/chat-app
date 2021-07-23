import { WSResponse } from "../types/Response"
import { CLIENTS } from "./setup"

export const sendMessageToRoom = (roomId: number, message: WSResponse) => {
    CLIENTS.filter(c => c.roomId === roomId).forEach(c =>
        c.socket.send(JSON.stringify(message))
    )
}
