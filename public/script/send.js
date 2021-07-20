export const sendMessage = (ws, message) => {
    console.log("CLIENT MESSAGE: ", message)

    if (checkMessage(message)) {
        ws.send(JSON.stringify(message))
        /*
        // remove old error message
        if (document.querySelector(".MessageError")) {
            inputDiv.removeChild(document.querySelector(".MessageError"))
        }*/
        return
    }
    //inputDiv.appendChild(ERROR())
}

const checkMessage = msg => {
    if (msg.trim().length === 0) return false
    return true
}
