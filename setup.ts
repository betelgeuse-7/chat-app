import express from "express"
import path from "path"
import cookieParser from "cookie-parser"

const PUBLIC = path.join(__dirname, "../public")
const PORT = process.env.PORT || 3000
import { authenticationMiddleware } from "./middleware/authenticated"
import { logoutHandler } from "./handlers/logout.handler"
import { loginHandler } from "./handlers/login.handler"
import { registerHandler } from "./handlers/register.handler"

export const setUpApp = (app: express.Express) => {
    app.use("/static", express.static(PUBLIC))
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())

    app.get("/", (req, res) => {
        res.sendFile(path.join(PUBLIC, "index.html"))
    })
    app.get("/chat", (req, res) => {
        authenticationMiddleware(req, res, ({ username }) => {
            res.cookie("USERNAME", username, {
                httpOnly: false,
                maxAge: 90000000,
            })
            res.sendFile(path.join(PUBLIC, "chat.html"))
        })
    })
    app.get("/register", (req, res) =>
        res.sendFile(path.join(PUBLIC, "register.html"))
    )
    app.post("/register", async (req, res) => registerHandler(req, res))

    app.get("/login", (req, res) =>
        res.sendFile(path.join(PUBLIC, "login.html"))
    )
    app.post("/login", (req, res) => loginHandler(req, res))

    app.get("/logout", (req, res) => logoutHandler(req, res))

    app.listen(() => {
        console.log(`app is listening to port ${PORT}`)
    })
}
