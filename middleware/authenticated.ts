import express from "express"
import { getConnection } from "typeorm"
import { User } from "../db/entities/User"

export const authenticationMiddleware = (
    req: express.Request,
    res: express.Response,
    next: (params: { username: string }) => void
) => {
    if (req.cookies.SESSION_ID) {
        const userRep = getConnection().getRepository(User)
        userRep.findOne({ sessionId: req.cookies.SESSION_ID }).then(u => {
            if (u) {
                if (u.sessionId === req.cookies.SESSION_ID) {
                    next({
                        username: u.username,
                    })
                } else {
                    res.redirect("/login")
                }
            } else {
                res.redirect("/login")
            }
        })
    } else {
        res.redirect("/login")
    }
}
