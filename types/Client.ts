import ws from "ws"

export type Client = {
    sessionId: string
    roomId: number
    socket: ws
}
