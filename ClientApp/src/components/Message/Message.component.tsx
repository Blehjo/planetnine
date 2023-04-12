import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";
import { Card, Col, Image, Row } from "react-bootstrap";

import { MessageContainer } from "./Message.styles";
import { RootState } from "../../store/store";
import { MessageFetchUserMessagesStart, messageFetchUserMessagesStart } from "../../store/message/message.action";
import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { PilotContainer } from "../Pilots/Pilots.styles";

type MessageProps = ConnectedProps<typeof connector>;

export class Message extends Component<MessageProps> {
    componentDidMount(): void {
        this.props.getMessages();
    }

    render() {
        const { messages } = this.props;
        return(
            <MessageContainer>
                <h1>Message</h1>
                {
                    messages.messages?.map(({ messageId, messageValue, userId, messageComments }) => {
                        return (
                            <PilotContainer key={messageId}>
                            <Card>
                            <Row xs={2}>
                                <Col xs={2}>
                                    {/* <Image style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={imageLink ? imageSource : "https://t3.ftcdn.net/jpg/04/37/12/40/360_F_437124090_g3px49FczWcCdl3zvGbrkxH9TdiY3yRa.jpg"} /> */}
                                </Col>
                                <Col xs={8}>
                                    {messageValue}
                                </Col>
                            </Row>        
                            </Card>
                            </PilotContainer>
                        )
                    })
                }
            </MessageContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        messages: state.message,
        userprofile: state.userprofile
    }
};

const mapDispatchToProps = (dispatch: Dispatch<MessageFetchUserMessagesStart | UserprofileFetchSingleStart>) => ({
    getMessages: () => dispatch(messageFetchUserMessagesStart()),
    getUsers: (userId: number) => dispatch(userprofileFetchSingleStart(userId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Message);