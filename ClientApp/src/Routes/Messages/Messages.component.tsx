import { Fragment } from "react"
import { MessageContainer, MessagebarContainer, UserMessageContainer } from "./Messages.styles"
import { Col, Row } from "react-bootstrap"
import { Notification } from "../../components/Notification/Notification.component"

export const Messages = () => {
    return (
        <Fragment>
            <MessagebarContainer className="fixed-top">
                <MessageContainer>
                    <h1>Communications</h1>
                </MessageContainer>
            </MessagebarContainer>
            <UserMessageContainer>
                <h1>Messages</h1>
            </UserMessageContainer>
            <Notification/>
        </Fragment>
    )
}