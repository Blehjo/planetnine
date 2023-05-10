import { Component, Dispatch, Fragment } from "react";
import { CollectionContainer, FormContainer, MessageContainer, MessagebarContainer, UserMessageContainer } from "./Messages.styles";
import NotificationComponent from "../../components/Notification/Notification.component";
import { RootState } from "../../store/store";
import { MessageDeleteStart,  MessageFetchSingleStart, messageDeleteStart } from "../../store/message/message.action";
import { MessageCommentFetchSingleStart, messagecommentFetchSingleStart } from "../../store/messagecomment/messagecomment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { messageFetchUserMessagesStart } from "../../store/message/message.action";
import { MessageFetchUserMessagesStart } from "../../store/message/message.action";
import { messageFetchSingleStart } from "../../store/message/message.action";
import { ConnectedProps, connect } from "react-redux";
import { Card, Col, Form, Image, Row } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";

type MessagesProps = ConnectedProps<typeof connector>;

export class Messages extends Component<MessagesProps> {
    handleDelete(messageId: number): void {
        this.props.deleteMessage(messageId);
    }

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
                    <CollectionContainer>
                    {
                        messages.userMessages?.map(({ messageId, messageValue, userId, messageComments, user }) => {
                            return (
                                <Card bg="dark" style={{ margin: '1rem', cursor: 'pointer' }} key={messageId}>
                                <Row key={userId} xs={3}>
                                    <Col xs={2}>
                                        <Image style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={user.imageLink ? `https://localhost:7098/Images/${user.imageLink}` : "https://t3.ftcdn.net/jpg/04/37/12/40/360_F_437124090_g3px49FczWcCdl3zvGbrkxH9TdiY3yRa.jpg"} />
                                    </Col>
                                    <Col xs={7}>
                                        <div onClick={() => this.handleClick(messageId)}>
                                        {messageValue}
                                        </div>
                                    </Col>
                                    <Col xs={2}>
                                    <XCircle onClick={() => this.handleDelete(messageId)}/>
                                    </Col>
                                </Row>        
                                </Card>
                            )
                        })
                    }
                    </CollectionContainer>
                </MessageContainer>
                <UserMessageContainer className="">
                    {
                        messagecomments.messagecomments?.map(({ messageCommentId, mediaLink, messageValue, userId, user }) => {
                            return (
                                <Card key={messageCommentId}>
                                <Row key={userId} xs={2}>
                                    <Col xs={2}>
                                        <Image style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={user?.imageLink ? `https://localhost:7098/Images/${user.imageLink}` : "https://t3.ftcdn.net/jpg/04/37/12/40/360_F_437124090_g3px49FczWcCdl3zvGbrkxH9TdiY3yRa.jpg"} />
                                    </Col>
                                    <Col xs={8}>
                                        {messageValue}
                                    </Col>
                                </Row>        
                                </Card>
                            )
                        })
                    }
                    <FormContainer>
                        <Row xs={2}>
                        <Col xs={8}>
                        <Form>
                            <Form.Group className="mb-3" controlId="messageInput">
                                <Form.Control as="textarea" rows={2} />
                            </Form.Group>
                        </Form>
                        </Col>
                        <Col xs={4}>
                        <button style={{ height: '3.8rem' }} className="btn btn-dark" type="submit">
                            Send
                        </button>
                        </Col>
                        </Row>
                    </FormContainer>
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

const mapDispatchToProps = (dispatch: Dispatch<MessageFetchUserMessagesStart | MessageFetchSingleStart | MessageCommentFetchSingleStart | FavoriteCreateStart | MessageDeleteStart>) => ({
	getAllMessages: () => dispatch(messageFetchUserMessagesStart()),
    getMessage: (messageId: number) => dispatch(messageFetchSingleStart(messageId)),
    getMessageComments: (messageId: number) => dispatch(messagecommentFetchSingleStart(messageId)),
    likeMessage: (messageId: number, contentType: string) => dispatch(favoriteCreateStart(messageId, contentType)),
    deleteMessage: (messageId: number) => dispatch(messageDeleteStart(messageId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Messages);