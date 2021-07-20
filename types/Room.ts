import { Client } from "./Client"

export type Room = {
    roomId: number
    clients: Client[]
}
