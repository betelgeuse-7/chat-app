import { RegisterForm } from "../types/RegisterForm"
import { RegisterError } from "../types/RegisterError"

// Check form data
export const checkRegisterFormData = (rf: RegisterForm): RegisterError => {
    let errorMsg: RegisterError = { errorMsg: "" }

    if (rf.email.trim().length === 0 || !rf.email.includes("@")) {
        errorMsg.errorMsg = "invalid email"
    }
    if (rf.password.length < 6) {
        errorMsg.errorMsg = "password must contain at least 6 characters"
    }
    if (rf.password !== rf.password2) {
        errorMsg.errorMsg = "passwords do not match"
    }
    if (rf.username.length === 0) {
        errorMsg.errorMsg = "you must provide a username"
    }
    return errorMsg
}
