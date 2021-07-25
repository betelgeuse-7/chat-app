import express from "express"
const WebSocket = require("ws")
import { createConnection } from "typeorm"

import { setUpApp } from "./setup"
import { setUpWss } from "./wss/setup"

const PORT = process.env.PORT || 3000

const app = express()
const server = app.listen(PORT)
const wss = new WebSocket.Server({
    server,
    host: "localhost",
    path: "/",
})

const Main = async () => {
    const dbConn = await createConnection()
    setUpWss(wss)
    setUpApp(app)
}

Main()
