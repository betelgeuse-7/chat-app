import ws from "ws"

export interface WSClient {
    clientId: number
    socket: ws
}
