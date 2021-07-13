import "reflect-metadata"
import { createConnection, Connection } from "typeorm"
import { User } from "./entities/User"

const connection = createConnection()
//connection.then((conn: Connection) => conn.)
