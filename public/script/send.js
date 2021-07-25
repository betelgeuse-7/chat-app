export const sendMessage = (ws, message) => {
    if (checkMessage(message)) {
        ws.send(JSON.stringify(message))
    }
}

const checkMessage = msg => {
    if (msg.trim().length === 0) return false
    return true
}
