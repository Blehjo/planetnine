import { ConnectedProps, connect } from "react-redux";
import { Component, Fragment, Dispatch } from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { ArrowsFullscreen, Globe, Rocket } from 'react-bootstrap-icons';
import { Badge, Button, Card, Col, Image, Modal, Row } from "react-bootstrap";

import { ChatContainer } from "./Chat.styles";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { utcConverter } from "../../utils/date/date.utils";
import { RootState } from "../../store/store";
import { ChatFetchAllStart, ChatFetchSingleStart, chatFetchAllStart, chatFetchSingleStart } from "../../store/chat/chat.action";
import { ChatCommentFetchSingleStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { CardContainer, ModalContainer, TextContainer } from "../Post/Post.styles";

type ChatProps = ConnectedProps<typeof connector>;

export class ChatComponent extends Component<ChatProps> {
    state = {
        show: false
    }

    handleLike(chatId: number, type: string): void {
        this.props.likePost(chatId, type);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(chatId: number): void {
        this.props.getChat(chatId);
        this.props.getComments(chatId);
        this.setState({
            show: !this.state.show
        });
    }

    componentDidMount(): void {
        this.props.getAllChats();
    }

    render() {
        const { chats, chatComments } = this.props;
        const { show } = this.state;
        return (
            <Fragment>
                <h1>Chat Manifests</h1>
                <p>Information on the galaxy documented by your fellow pioneers</p>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                >
                    <Masonry>
                    {chats.chats?.map(({ chatId, title, userId, comments, chatComments, favorites, dateCreated }) => {
                    return <ChatContainer key={chatId}>
                            <Card className="bg-dark" key={chatId}>
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15} onClick={() => this.handleClick(chatId)}/></Badge>
                                </BadgeContainer>
                                {
                                    chatComments && <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                        <Globe size={15}/>
                                        {` ${chatComments.length}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                {
                                    favorites && <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light">
                                        <Rocket size={15}/>
                                        {` ${favorites.length}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                <Card.Body>
                                    <Card.Text>{title}</Card.Text>
                                    <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                </Card.Body>
                            </Card>
                        </ChatContainer>
                    })}
                    </Masonry>
                </ResponsiveMasonry>
                <Modal 
                    size="lg"
                    show={show} 
                    onHide={() => this.handleClose()}
                >
                    <ModalContainer>
                    <Modal.Header closeButton>
                        <Modal.Title >Crew Logs</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={8}>
                            <Image
                                fluid
                                src="https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"
                            />
                            {chats.singleChat?.title}
                            </Col>
                            <Col>
                            <div>Comments</div>
                            {
                                chatComments.chatcomments?.map(({ chatCommentId, chatValue, mediaLink, dateCreated }) => {
                                    return <CardContainer>
                                        <Card className="bg-dark" key={chatCommentId}>
                                            <TextContainer>
                                                <Card.Text>{chatValue}</Card.Text>
                                                <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                            </TextContainer>
                                        </Card>
                                    </CardContainer>
                                })
                            }
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="dark" onClick={() => this.handleClose()}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={() => this.handleClose()}>
                        Single View
                    </Button>
                    </Modal.Footer>
                    </ModalContainer>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        chats: state.chat,
        chatComments: state.chatcomment
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ChatFetchAllStart | ChatFetchSingleStart | ChatCommentFetchSingleStart | FavoriteCreateStart>) => ({
	getAllChats: () => dispatch(chatFetchAllStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    getComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ChatComponent);