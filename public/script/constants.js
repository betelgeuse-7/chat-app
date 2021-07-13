const DEFAULT_ERROR_MESSAGE = "Couldn't send your message 😪"
const ERROR_TAG = "p"
const MESSAGE_TAG = "div"

const CLASSNAMES = {
    errorClassname: "MessageError",
    messageClassname: "Message",
    messageContentClassname: "Message__Content",
    messageByClassname: "Message__By",
    messageDateClassname: "Message__Date",
    messageMetaClassname: "Message__Meta",
}

export const ERROR = errorMessage => {
    const error = document.createElement(ERROR_TAG)
    error.innerText = errorMessage ? errorMessage : DEFAULT_ERROR_MESSAGE
    error.className = CLASSNAMES.errorClassname

    return error
}

export const MESSAGE = (messageContentNode, messageMetaNode) => {
    const messageNode = document.createElement(MESSAGE_TAG)
    messageNode.appendChild(messageContentNode)
    messageNode.appendChild(messageMetaNode)
    messageNode.className = CLASSNAMES.messageClassname

    return messageNode
}

export const MESSAGE_CONTENT_NODE = text => {
    const messageContentNode = document.createElement(MESSAGE_TAG)
    messageContentNode.className = CLASSNAMES.messageContentClassname
    messageContentNode.innerText = text

    return messageContentNode
}

export const MESSAGE_META_NODE = (messageByNode, messageDateNode) => {
    const messageMetaNode = document.createElement(MESSAGE_TAG)
    messageMetaNode.className = CLASSNAMES.messageMetaClassname
    messageMetaNode.appendChild(messageByNode)
    messageMetaNode.appendChild(messageDateNode)

    return messageMetaNode
}

export const MESSAGE_BY = text => MESSAGE_META_SUB(text, false)
export const MESSAGE_DATE = text => MESSAGE_META_SUB(text, true)

const MESSAGE_META_SUB = (text, isDateNode) => {
    const node = document.createElement(MESSAGE_TAG)
    node.className = isDateNode
        ? CLASSNAMES.messageDateClassname
        : CLASSNAMES.messageByClassname
    node.innerText = text

    return node
}
