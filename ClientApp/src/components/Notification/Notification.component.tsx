import { Component, Dispatch } from "react";
import { NotificationsContainer, SidebarContainer } from "./Notifications.styles";
import { RootState } from "../../store/store";
import { ChatFetchSingleStart, ChatFetchUserChatsStart, chatFetchSingleStart, chatFetchUserChatsStart } from "../../store/chat/chat.action";
import { ChatCommentFetchSingleStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { ConnectedProps, connect } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";

type NotificationProps = ConnectedProps<typeof connector>;

export class Notification extends Component<NotificationProps> {
    componentDidMount(): void {
        this.props.getAllChats();
    }

    render() {
        const { chats } = this.props;
        return (
            <SidebarContainer className="fixed-top" >
                <NotificationsContainer>
                    <h1>Journal Logs</h1>
                    {
                    chats.chats?.map(({ chatId, title, chatComments }) => {
                        return (
                            <Row key={chatId}>
                                <Card>
                                    {title}
                                </Card>
                            </Row>
                        )
                    })}
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
    likeChat: (chatId: number, contentType: string) => dispatch(favoriteCreateStart(chatId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Notification);