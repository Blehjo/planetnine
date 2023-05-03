import { ConnectedProps, connect } from "react-redux";
import { Component, Fragment, Dispatch, ChangeEvent } from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { ArrowsFullscreen, Chat, Globe, Rocket } from 'react-bootstrap-icons';
import { Badge, Button, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";

import { ChatContainer } from "./Chat.styles";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { utcConverter } from "../../utils/date/date.utils";
import { RootState } from "../../store/store";
import { ChatFetchAllStart, ChatFetchSingleStart, chatFetchAllStart, chatFetchSingleStart } from "../../store/chat/chat.action";
import { ChatCommentCreateStart, ChatCommentFetchSingleStart, chatcommentCreateStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { CardContainer, CommentContainer, FormContainer, ModalContainer, TextContainer } from "../Post/Post.styles";

type ChatProps = ConnectedProps<typeof connector>;

interface IDefaultFormFields {
    commentValue: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
}

export class ChatComponent extends Component<ChatProps, IDefaultFormFields> {
    constructor(props: ChatProps) {
        super(props);
        this.state = {
            commentValue: "",
            imageSource: "",
            imageFile: null,
            show: false
        }

        this.handleLike = this.handleLike.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.postComment = this.postComment.bind(this);
    }
       

    handleLike(chatId: number, type: string): void {
        this.props.likePost(chatId, type);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    postComment() {
        const { commentValue, imageFile } = this.state;
        const { chats } = this.props;
        const chatId = chats.singleChat?.chatId ? chats.singleChat?.chatId : 0
        this.props.createComment(chatId, commentValue, imageFile);
    }

    handleClick(chatId: number): void {
        this.props.getChat(chatId);
        this.props.getComments(chatId);
        this.setState({
            show: !this.state.show
        });
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    showPreview(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
          const { files } = event.target;
          const selectedFiles = files as FileList;
          let imageFile = selectedFiles[0];
          const reader = new FileReader();
          reader.onload = x => {
            this.setState({
              ...this.state,
              imageFile,
              imageSource: x.target?.result
            });
          }
          reader.readAsDataURL(imageFile);
        } else {
          this.setState({
              ...this.state,
              imageFile: null,
              imageSource: null
          });
        }
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
                    {chats.chats?.map(({ chatId, title, type, userId, comments, chatComments, favorites, dateCreated }) => {
                    return <ChatContainer key={chatId}>
                            <Card className="bg-dark" key={chatId}>
                                <Row>
                                <Col>
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15} onClick={() => this.handleClick(chatId)}/></Badge>
                                </BadgeContainer>
                                </Col>
                                <Col>
                                {
                                    <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                        <Chat size={15}/>
                                        {` ${chatComments?.length > 0 ? chatComments?.length : ""}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                </Col>
                                <Col>
                                {
                                    <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light">
                                        <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(chatId, type)} size={15}/>
                                        {` ${favorites?.length > 0 ? favorites?.length : ""}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                </Col>
                                <Card.Body>
                                    <Card.Text>{title}</Card.Text>
                                    <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                </Card.Body>
                                </Row>
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
                            <CommentContainer>
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
                            </CommentContainer>
                            <FormContainer>
                            <Form key={chats.singleChat?.chatId} onSubmit={this.postComment}>
                                <Row style={{ marginBottom: '3rem', justifyContent: 'center' }} xs={1}>
                                    <Col xs={12}>
                                        <Row style={{ marginBottom: '1rem' }}>
                                            <Col xs={11}>
                                                <Form.Group>
                                                    <Form.Control style={{ height: '.5rem' }} name="commentValue" as="textarea" onChange={this.handleChange} placeholder=" Write your comment here" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col xs={8}>
                                                <Form.Group className="mb-3" controlId="formMedia">
                                                    <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={2}>
                                                <button id={chats.singleChat?.chatId.toString()} style={{ textAlign: 'center' }} className="btn btn-light" type="submit">
                                                    Post
                                                </button>
                                            </Col>                
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                            </FormContainer>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-dark" onClick={() => this.handleClose()}>
                        Close
                    </button>
                    <a href={`/singlechat/${chats.singleChat?.chatId}`} style={{ textDecoration: 'none', color: 'white' }} className="btn btn-dark" onClick={() => this.handleClose()}>
                        Single View
                    </a>
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

const mapDispatchToProps = (dispatch: Dispatch<ChatFetchAllStart | ChatFetchSingleStart | ChatCommentFetchSingleStart | FavoriteCreateStart | ChatCommentCreateStart>) => ({
	getAllChats: () => dispatch(chatFetchAllStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    getComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    createComment: (chatId: number, commentValue: string, imageFile: File) => dispatch(chatcommentCreateStart(chatId, commentValue, imageFile)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ChatComponent);