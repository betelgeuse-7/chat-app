import ws from "ws"

export const broadcastMessage = (clients: Set<ws>, message: string) => {
    clients.forEach((c: ws) => {
        c.send(message)
    })
}
