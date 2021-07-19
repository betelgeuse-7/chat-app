import express from "express"
import { getConnection } from "typeorm"
import { User } from "../db/entities/User"

export const auth = (
    req: express.Request,
    res: express.Response,
    next: (err?: string) => void
) => {
    if (req.cookies.SESSION_ID) {
        const userRep = getConnection().getRepository(User)
        userRep
            .findOne({ sessionId: req.cookies.SESSION_ID })
            .then(u => {
                if (u) {
                    if (u.sessionId == req.cookies.SESSION_ID) {
                        return next()
                    }
                    return res.redirect("/login")
                }
                return res.redirect("/login")
            })
            .catch(e => res.redirect("/login"))
    } else {
        return res.redirect("/login")
    }
}
