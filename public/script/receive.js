import {
    MESSAGE,
    MESSAGE_CONTENT_NODE,
    MESSAGE_META_NODE,
    MESSAGE_BY,
    MESSAGE_DATE,
} from "./constants.js"

const messagesDiv = document.getElementById("Messages")

export const newMessage = message => {
    console.log(message)
    /*
    message = JSON.parse(message)
    
    const messageContent = MESSAGE_CONTENT_NODE(message.value)
    const messageMeta = MESSAGE_META_NODE(
        MESSAGE_BY(message.username),
        MESSAGE_DATE("12.07.2019 20:53")
    )

    const messageToAppend = MESSAGE(messageContent, messageMeta)

    messagesDiv.appendChild(messageToAppend)
*/
}
