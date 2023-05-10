import { Component, Dispatch } from "react";
import { ConnectedProps, connect } from "react-redux";
import { Card, Col, Image, Row } from "react-bootstrap";

import { MessageContainer, MessageDashPanel } from "./Message.styles";
import { RootState } from "../../store/store";
import { MessageFetchUserMessagesStart, messageFetchUserMessagesStart } from "../../store/message/message.action";
import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { PilotContainer } from "../Pilots/Pilots.styles";
import { HeaderContainer, MarginContainer } from "../PilotDash/PilotDash.styles";

type MessageProps = ConnectedProps<typeof connector>;

export class Message extends Component<MessageProps> {
    componentDidMount(): void {
        this.props.getMessages();
    }

    render() {
        const { messages } = this.props;
        return(
            <MessageDashPanel>
                <HeaderContainer>
                <div>Message</div>
                </HeaderContainer>
                <MarginContainer>
                {
                    messages.userMessages?.map(({ messageId, messageValue, userId, messageComments, user }) => {
                        return (
                            <PilotContainer key={messageId}>
                            <Row key={userId} xs={2}>
                                <Col xs={2}>
                                    <Image style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={user.imageLink ? `https://localhost:7098/Images/${user.imageLink}` : "https://t3.ftcdn.net/jpg/04/37/12/40/360_F_437124090_g3px49FczWcCdl3zvGbrkxH9TdiY3yRa.jpg"} />
                                </Col>
                                <Col xs={8}>
                                    {messageValue}
                                </Col>
                            </Row>        
                            </PilotContainer>
                        )
                    })
                }
                </MarginContainer>
            </MessageDashPanel>
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