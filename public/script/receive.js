import {
    MESSAGE,
    MESSAGE_CONTENT_NODE,
    MESSAGE_BY,
    MESSAGE_DATE,
} from "./constants.js"

const messagesWrapper = document.getElementById("Messages__Wrapper")
let messages = []

export const newMessage = message => {
    console.log(message)
    /*
    const messageContent = MESSAGE_CONTENT_NODE(
        // get rid of the ""s escaped by JSON.stringify on the server side
        message.message.substring(1, message.message.length - 1)
    )
    const messageBy = MESSAGE_BY(message.username)
    const messageDate = MESSAGE_DATE(message.date)
    const messageToAppend = MESSAGE(messageContent, messageBy, messageDate)

    messageToAppend.dataset.rid = message.roomId
  */
    messages.push(message)
}

export const renderMessages = currentRoom => {
    console.log(
        "messages in room: " + currentRoom + ": ",
        messages.filter(m => m.roomId === currentRoom)
    )
    /*
    for (const message of messages) {
        newMessage(message)
    }*/
}
