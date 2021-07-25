import ws from "ws"

export type Client = {
    sessionId: string
    socket: ws
}
