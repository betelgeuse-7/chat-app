import "reflect-metadata"
import { createConnection, Connection } from "typeorm"
import { Message } from "./entities/Message"
import { User } from "./entities/User"
import { Room } from "./entities/Room"

// create a connection and return the connection object for later use.
// (e.g getRepository)
export const createDatabaseConnection = async (): Promise<Connection> => {
    const connection = await createConnection()
    return connection
}

export const closeDatabaseConnection = async (conn: Promise<Connection>) => {
    ;(await conn).close()
}
