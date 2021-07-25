import { Form } from "../types/Form"

export const checkFormData = (
    f: Form,
    login: boolean = false
): { errorMsg: string } => {
    let errorMsg = { errorMsg: "" }

    if (f.email.trim().length === 0 || !f.email.includes("@")) {
        errorMsg.errorMsg = "invalid email"
    }
    if (f.password.length < 6) {
        errorMsg.errorMsg = "password must contain at least 6 characters"
    }

    if (login) return errorMsg

    if (f.password !== f!.password2) {
        errorMsg.errorMsg = "passwords do not match"
    }
    if (f.username!.length === 0) {
        errorMsg.errorMsg = "you must provide a username"
    }
    return errorMsg
}
