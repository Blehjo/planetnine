import { Fragment, Component, Dispatch } from 'react';
import { Badge, Card, Col, Image, Modal, Row } from 'react-bootstrap';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ChatContainer } from '../Chat/Chat.styles';
import { BadgeContainer } from '../Pilots/Pilots.styles';
import { ArrowsFullscreen, Globe, Rocket } from 'react-bootstrap-icons';
import { utcConverter } from '../../utils/date/date.utils';
import { CardContainer, ModalContainer, TextContainer } from '../Post/Post.styles';

import { RootState } from "../../store/store";

import { CommentFetchSingleStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { ChatFetchSingleStart, ChatFetchSingleUserChatsStart, chatFetchSingleStart, chatFetchSingleUserChatsStart } from "../../store/chat/chat.action";
import { ConnectedProps, connect } from 'react-redux';

type ChatsTabProps = {
    show: boolean;
}

export type ProfileProps = ConnectedProps<typeof connector>;

type UserInfo = ProfileProps & {
    userId?: number;
}

export class SingleChatsTab extends Component<UserInfo, ChatsTabProps> {
    constructor(props: UserInfo) {
        super(props);
        this.state = {
            show: false
        }
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
        this.props.getChats(this.props.userId!);
    }

    render() {
        const { chats, chatComments } = this.props;
        const { show } = this.state;
        return (
            <Fragment>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                >
                    <Masonry>
                    {chats.singleUserChats?.map(({ chatId, title, userId, comments, chatComments, favorites, dateCreated }) => {
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
                        <Modal.Title >{chats.singleChat?.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={8}>
                            <Image
                                fluid
                                src="https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"
                            />
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
                    <button className="btn btn-dark" onClick={() => this.handleClose()}>
                        Close
                    </button>
                    <a className="btn btn-dark" href={`/singlechat/${chats.singleChat?.chatId}`}>
                        Single View
                    </a>
                    </Modal.Footer>
                    </ModalContainer>
                </Modal>
            </Fragment>
        );
    }
}

const mapToStateProps = (state: RootState) => {
    return { 
        userprofile: state.userprofile,
        currentUser: state.user,
        pilot: state.pilot,
        comments: state.comment,
        mooncomments: state.mooncomment,
        planetcomments: state.planetcomment,
        moons: state.moon,
        planets: state.planet,
        chats: state.chat,
        chatComments: state.chatcomment
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CommentFetchSingleStart | ChatFetchSingleUserChatsStart | ChatFetchSingleStart>) => ({
    getComments: (planetId: number) => dispatch(commentFetchSingleStart(planetId)),
    getChats: (userId: number) => dispatch(chatFetchSingleUserChatsStart(userId)),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId))
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(SingleChatsTab);