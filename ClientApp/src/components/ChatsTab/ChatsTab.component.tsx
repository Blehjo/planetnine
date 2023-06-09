import { Fragment, Component } from 'react';
import { Badge, Card, Col, Image, Modal, Row } from 'react-bootstrap';
import { ProfileProps } from '../Profile/Profile.component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ChatContainer } from '../Chat/Chat.styles';
import { BadgeContainer } from '../Pilots/Pilots.styles';
import { ArrowsFullscreen, Globe, Rocket, XCircle } from 'react-bootstrap-icons';
import { utcConverter } from '../../utils/date/date.utils';
import { CardContainer, ModalContainer, TextContainer } from '../Post/Post.styles';
import { ChatState } from '../../store/chat/chat.reducer';

type ChatsTabProps = {
    show: boolean;
    showDelete: boolean;
    chatId: number | null;
}

export class ChatsTab extends Component<ProfileProps, ChatsTabProps> {
    constructor(props: ProfileProps) {
        super(props);
        this.state = {
            show: false,
            showDelete: false,
            chatId: null
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
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

    handleDelete(): void {
        this.props.deleteChat(this.state.chatId!);
        this.handleCloseDelete();
    }
    
    handleCloseDelete(): void {
        this.setState({
            showDelete: !this.state.showDelete
        });
    }

    handleDeleteClick(chatId: number): void {
        this.setState({
            chatId: chatId
        })
        this.handleCloseDelete();
    }

    componentDidMount(): void {
        this.props.getChats();
    }

    componentDidUpdate(prevProps: Readonly<{ chats: ChatState; } & { getChats: () => void; }>, prevState: Readonly<ChatsTabProps>, snapshot?: any): void {
        if (this.props.chats.userChats?.length !== prevProps.chats.userChats?.length) {
            this.props.getChats();
        }
    }

    render() {
        const { chats, chatComments } = this.props;
        const { show, showDelete } = this.state;
        return (
            <Fragment>
            {
            chats.userChats?.length ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                >
                    <Masonry>
                    {chats.userChats?.map(({ chatId, title, userId, comments, chatComments, favorites, dateCreated }) => {
                    return <ChatContainer key={chatId}>
                            <Card className="bg-dark" key={chatId}>
                            <Card.Img  src={"https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
                            <Card.ImgOverlay>
                                <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
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
                                </div>
                                <Col xs={3}>
                                <XCircle onClick={() => this.handleDeleteClick(chatId)} key={chatId} style={{ background: "white", borderRadius: ".5rem", color: "black", cursor: "pointer", position: "absolute", right: "5", top: "5" }}/>
                                </Col>
                                </Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text>{title}</Card.Text>
                                    <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                </Card.Body>
                            </Card>
                        </ChatContainer>
                    })}
                    </Masonry>
                </ResponsiveMasonry> : 
                <Col xs={12}>
                <Card style={{ color: 'white', textAlign: 'center' }} className="bg-dark">
                    <Card.Title>"Currently no moons... Let's change that!"</Card.Title>
                </Card>
                </Col>
                }
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
                    <a href={`/singlechat/${chats.singleChat?.chatId}`} style={{ textDecoration: 'none', color: 'white' }} className="btn btn-dark" >
                        Single View
                    </a>
                    </Modal.Footer>
                    </ModalContainer>
                </Modal>
                <Modal show={showDelete} onHide={() => this.handleCloseDelete()}>
                    <Modal.Body style={{ textAlign: "center", color: "black" }}>
                        Are you sure you want to delete this chat?
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: "center" }}>
                    <button className="btn btn-secondary" onClick={() => this.handleCloseDelete()}>
                        Cancel
                    </button>
                    <button onClick={() => this.handleDelete()} className="btn btn-primary">
                        Delete
                    </button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}