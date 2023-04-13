import { Component, Dispatch, Fragment } from "react";
import { MessageContainer, MessagebarContainer, UserMessageContainer } from "./Messages.styles";
import NotificationComponent from "../../components/Notification/Notification.component";
import { RootState } from "../../store/store";
import { MessageFetchAllStart, MessageFetchSingleStart, messageFetchAllStart } from "../../store/message/message.action";
import { MessageCommentFetchSingleStart, messagecommentFetchSingleStart } from "../../store/messagecomment/messagecomment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { messageFetchUserMessagesStart } from "../../store/message/message.action";
import { MessageFetchUserMessagesStart } from "../../store/message/message.action";
import { messageFetchSingleStart } from "../../store/message/message.action";
import { ConnectedProps, connect } from "react-redux";

type MessagesProps = ConnectedProps<typeof connector>;

export class Messages extends Component<MessagesProps> {

    handleClick(messageId: number): void {
        this.props.getMessage(messageId);
    }

    componentDidMount(): void {
        this.props.getAllMessages();
    }

    render() {
        const { messages, messagecomments } = this.props;
        return (
            <Fragment>
            <MessagebarContainer className="fixed-top">
                <MessageContainer>
                    <div>Communications</div>
                    {}
                </MessageContainer>
                <UserMessageContainer>
                    <h1>Messages</h1>
                    {}
                </UserMessageContainer>
            </MessagebarContainer>
            <NotificationComponent/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        messages: state.message,
        messagecomments: state.messagecomment 
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MessageFetchUserMessagesStart | MessageFetchSingleStart | MessageCommentFetchSingleStart | FavoriteCreateStart>) => ({
	getAllMessages: () => dispatch(messageFetchUserMessagesStart()),
    getMessage: (messageId: number) => dispatch(messageFetchSingleStart(messageId)),
    getMessageComments: (messageId: number) => dispatch(messagecommentFetchSingleStart(messageId)),
    likeMessage: (messageId: number, contentType: string) => dispatch(favoriteCreateStart(messageId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Messages);