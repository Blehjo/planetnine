import { Component, Dispatch } from "react";
import { CardContainer, IconContainer, NotificationsContainer, SidebarContainer } from "./Notifications.styles";
import { RootState } from "../../store/store";
import { ChatFetchSingleStart, ChatFetchUserChatsStart, chatFetchSingleStart, chatFetchUserChatsStart } from "../../store/chat/chat.action";
import { ChatCommentFetchSingleStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { ConnectedProps, connect } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import ModalChatComponent from "../ModalChat/ModalChat.component";
import ModalMoonComponent from "../ModalMoon/ModalMoon.component";
import ModalPlanetComponent from "../ModalPlanet/ModalPlanet.component";
import ModalPostComponent from "../ModalPost/ModalPost.component";
import { XCircle } from "react-bootstrap-icons";


type NotificationProps = ConnectedProps<typeof connector>;

export class Notification extends Component<NotificationProps> {
    handleGetMessages(chatId: number) {
        this.props.getComments(chatId);
    }

    componentDidMount(): void {
        this.props.getAllChats();
    }

    render() {
        const { chats } = this.props;
        return (
            <SidebarContainer >
                <NotificationsContainer>
                    <h1 className="notifications">Journal Logs</h1>
                    <IconContainer className="modalicons">
                    <Row xs={4}>
                        <Col key="modalmoon">
                            <ModalMoonComponent/>
                        </Col>
                        <Col key="modalchat">
                            <ModalChatComponent/>
                        </Col>
                        <Col key="modalplanet">
                            <ModalPlanetComponent/>
                        </Col>
                        <Col key="modalpost">
                            <ModalPostComponent/>
                        </Col>
                    </Row>
                    </IconContainer>
                    <Row>
                    <Col>
                    <Row key="chatcards" xs={2}>
                    {
                        chats.userChats?.map(({ chatId, title, chatComments }) => {
                        return (
                            <Col key="controller" className="notifications" xs={12}>
                            <CardContainer key="model" >
                                <Row key="controllerrow" xs={2}>
                                <Col key="chat" xs={9}>
                                    <div style={{ padding: ".2rem", textAlign: "left" }} onClick={() => this.handleGetMessages(chatId)} key={chatId} >
                                    {`${title.slice(0,23)}...`}
                                    </div>
                                </Col>
                                <Col key="x" xs={3}>
                                    <XCircle style={{ cursor: "pointer" }} key={chatId}/>
                                </Col>
                                </Row>
                            </CardContainer>
                            </Col>
                        )
                    })}
                    </Row>
                    </Col>
                    </Row>
                </NotificationsContainer>
            </SidebarContainer>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        chats: state.chat,
        chatComments: state.chatcomment
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ChatFetchUserChatsStart | ChatFetchSingleStart | ChatCommentFetchSingleStart | FavoriteCreateStart>) => ({
	getAllChats: () => dispatch(chatFetchUserChatsStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    getComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    likeChat: (chatId: number, contentType: string) => dispatch(favoriteCreateStart(chatId, contentType)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Notification);