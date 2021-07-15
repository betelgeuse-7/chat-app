import { WSMessage } from "../types/Message"
import { WSClient } from "../types/Client"

export const broadcastMessage = (clients: WSClient[], message: string) => {
    clients.forEach((c: WSClient) => {
        c.socket.send(message)
    })
}
