import { Fragment } from "react";
import { MessageContainer, MessagebarContainer, UserMessageContainer } from "./Messages.styles";
import NotificationComponent from "../../components/Notification/Notification.component";

export const Messages = () => {
    return (
        <Fragment>
            <MessagebarContainer className="fixed-top">
                <MessageContainer>
                    <div>Communications</div>
                </MessageContainer>
                <UserMessageContainer>
                    <h1>Messages</h1>
                </UserMessageContainer>
            </MessagebarContainer>
            <NotificationComponent/>
        </Fragment>
    )
}