import {
    UNIQUE_USERNAME_CONSTRAINT,
    UNIQUE_EMAIL_CONSTRAINT,
} from "../constants"

export const giveDuplicateError = (
    formArguments: string[],
    constraint: string
): string => {
    if (constraint === UNIQUE_USERNAME_CONSTRAINT) {
        return `a user with the username ${formArguments[0]} already exists`
    } else if (constraint === UNIQUE_EMAIL_CONSTRAINT) {
        return `a user with the email ${formArguments[1]} already exists`
    }
    return "error"
}
