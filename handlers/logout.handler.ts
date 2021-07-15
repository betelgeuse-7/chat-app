import express from "express"
import { getConnection } from "typeorm"
import { User } from "../db/entities/User"

export const logoutHandler = (req: express.Request, res: express.Response) => {
    if (req.cookies.SESSION_ID) {
        res.clearCookie("SESSION_ID")
        const userRep = getConnection().getRepository(User)
        userRep.findOne({ sessionId: req.cookies.SESSION_ID }).then(user => {
            if (user) {
                userRep.save({ userId: user?.userId, sessionId: "" })
            }
            res.redirect("/")
        })
    } else {
        res.redirect("/")
    }
}
