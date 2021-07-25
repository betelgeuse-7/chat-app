import { WSResponse } from "../types/Response"
import { CLIENTS } from "./setup"

export const broadcast = (message: WSResponse) => {
    CLIENTS.forEach(c => c.socket.send(JSON.stringify(message)))
}
