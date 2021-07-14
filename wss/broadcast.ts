import { WSMessage } from "../Message"
import { WSClient } from "../Client"

export const broadcastMessage = (clients: WSClient[], message: WSMessage) => {
    clients.forEach((c: WSClient) => {
        c.socket.send(message)
    })
}
