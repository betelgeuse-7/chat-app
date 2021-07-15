import express from "express"
import { getConnection } from "typeorm"
import { User } from "../db/entities/User"
import { checkFormData } from "../utils/check"
import bcrypt from "bcrypt"
import { v4 } from "uuid"

export const loginHandler = (req: express.Request, res: express.Response) => {
    {
        const givenCreds = {
            email: req.body.email,
            password: req.body.password,
        }

        if (checkFormData(givenCreds, true).errorMsg !== "") {
            res.status(400).end(checkFormData(givenCreds, true).errorMsg)
            return
        }

        const sessionId = v4()

        const userRep = getConnection().getRepository(User)

        userRep.findOne({ email: givenCreds.email }).then(user => {
            if (user) {
                // check the password is correct
                if (!bcrypt.compareSync(givenCreds.password, user!.password))
                    res.status(400).end("wrong password")

                userRep.save({
                    userId: user?.userId,
                    sessionId,
                })

                res.cookie("SESSION_ID", sessionId, {
                    httpOnly: true,
                    maxAge: 90000000,
                })

                res.redirect("/")

                return
            } else {
                res.status(400).end("login failed")
            }
        })
    }
}
