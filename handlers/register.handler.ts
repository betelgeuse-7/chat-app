import express from "express"
import { getConnection } from "typeorm"
import { User } from "../db/entities/User"
import { checkFormData } from "../utils/check"
import { giveDuplicateError } from "../utils/duplicateError"
import bcrypt from "bcrypt"

export const registerHandler = async (
    req: express.Request,
    res: express.Response
) => {
    {
        res.clearCookie("SESSION_ID")
        const result = checkFormData({ ...req.body }).errorMsg
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
                res.redirect("/login")
                return
            } catch (e) {
                res.end(giveDuplicateError(e.parameters, e.constraint))
                return
            }
        } else {
            res.send(result)
        }
    }
}
