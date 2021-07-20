import { Message } from "../types/Message"
import { Client } from "../types/Client"

export const sendMessageToRoom = (
    clientsInRoom: Client[],
    message: Message
) => {
    clientsInRoom.forEach(client => {
        client.socket.send(JSON.stringify(message))
    })
}
