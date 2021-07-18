import express from "express"
import { getConnection } from "typeorm"
import { User } from "../db/entities/User"

// TODO fix
export const isAuthenticated = (
    req: express.Request,
    res: express.Response
): boolean => {
    if (req.cookies.SESSION_ID) {
        const userRep = getConnection().getRepository(User)
        userRep.findOne({ sessionId: req.cookies.SESSION_ID }).then(u => {
            if (u) {
                if (u.sessionId == req.cookies.SESSION_ID) {
                    return true
                }
            }
        })
    }
    return true
}
