import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import { auth } from "./middleware/auth"
import { logoutHandler } from "./handlers/logout.handler"
import { loginHandler } from "./handlers/login.handler"
import { registerHandler } from "./handlers/register.handler"

const PUBLIC = path.join(__dirname, "../public")
const PORT = process.env.PORT || 3000

export const setUpApp = (app: express.Express) => {
    app.use("/static", express.static(PUBLIC))
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())

    app.get("/", auth, (req, res) => {
        return res.sendFile(path.join(PUBLIC, "index.html"))
    })
    app.get("/register", (req, res) =>
        res.sendFile(path.join(PUBLIC, "register.html"))
    )
    app.post("/register", async (req, res) => registerHandler(req, res))

    app.get("/login", (req, res) =>
        res.sendFile(path.join(PUBLIC, "login.html"))
    )
    app.post("/login", (req, res) => loginHandler(req, res))

    app.get("/logout", auth, (req, res) => logoutHandler(req, res))

    app.listen(() => {
        console.log(`app is listening to port ${PORT}`)
    })
}
