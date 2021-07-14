import express from "express"
import path from "path"
import { getConnection, QueryFailedError } from "typeorm"
import { checkRegisterFormData } from "./utils/check"
import { User } from "./db/entities/User"
import bcrypt from "bcrypt"

const PUBLIC = path.join(__dirname, "../public")
const PORT = process.env.PORT || 3000
import typeorm from "typeorm"
import { giveDuplicateError } from "./utils/duplicateError"

export const setUpApp = (app: express.Express) => {
    app.use("/static", express.static(PUBLIC))
    app.use(express.urlencoded({ extended: true }))

    app.get("/", (req, res) => {
        res.send("Hello world")
    })

    app.get("/chat", (req, res) => {
        res.sendFile(path.join(PUBLIC, "chat.html"))
    })

    app.get("/register", (req, res) => {
        res.sendFile(path.join(PUBLIC, "register.html"))
    })

    app.post("/register", async (req, res) => {
        const result = checkRegisterFormData({ ...req.body }).errorMsg
        if (result === "") {
            const dbConn = getConnection()
            const userRep = dbConn.getRepository(User)
            const user = new User()
            user.email = req.body.email
            user.username = req.body.username
            // set password
            user.password = bcrypt.hashSync(req.body.password, 10)

            try {
                await userRep.insert(user)
                res.redirect("/chat")
            } catch (e) {
                res.end(giveDuplicateError(e.parameters, e.constraint))
            }
        } else {
            res.send(result)
        }
    })

    app.listen(() => {
        console.log(`app is listening to port ${PORT}`)
    })
}
