import { ChangeEvent, Component, Dispatch, Fragment, ReactNode } from "react";
import { Badge, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import ReactLoading from "react-loading";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { ConnectedProps, connect } from "react-redux";
import { ChatFetchAllStart, ChatFetchSingleStart, chatFetchAllStart, chatFetchSingleStart } from "../../store/chat/chat.action";
import { ChatState } from "../../store/chat/chat.reducer";
import { ChatCommentFetchSingleStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { ChatCommentState } from "../../store/chatcomment/chatcomment.reducer";
import { CommentState } from "../../store/comment/comment.reducer";
import { FavoriteCreateStart, FavoriteFetchUserFavoritesStart, favoriteCreateStart, favoriteFetchUserFavoritesStart } from "../../store/favorite/favorite.action";
import { FavoriteState } from "../../store/favorite/favorite.reducer";
import { PostState } from "../../store/post/post.reducer";
import { RootState } from "../../store/store";
import { User } from "../../store/user/user.types";
import { utcConverter } from "../../utils/date/date.utils";
import { CardContainer, CommentContainer, ModalContainer, PostContainer, TextContainer } from "../Post/Post.styles";
import Authentication from "../../routes/Authentication/Authentication.route";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { ArrowsFullscreen, Chat, Rocket, Send } from "react-bootstrap-icons";
import { PostFetchSingleStart, postCreateStart, postFetchSingleStart } from "../../store/post/post.action";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";

export interface IChatComment {
    chatCommentId: number;
    chatValue: string;
    mediaLink: string;
    type: string;
    dateCreated: Date;
    chatId: number;
}

export interface IPost {
    postId: number;
    postValue: string;
    about: string;
    mediaLink: string;
    dateCreated: Date;
    comments: number;
    favorites: number;
    userId: number;
}

export interface IChat {
    postId: number;
    postValue: string;
    about: string;
    dateCreated: Date;
    comments: number;
    chatComments: IChatComment[];
    favorites: number;
    userId: number;
}

export type Favorite = IChat | IPost;

type FavoriteProps = ConnectedProps<typeof connector>;

type Favorites = {
    show: boolean;
    contentId: number | null;
    contentType: string;
    commentsValue: string;
    imageFile: any;
}

export class FavoriteComponent extends Component<FavoriteProps> {
    state: Favorites = {
        show: false, 
        contentId: null,
        contentType: "",
        commentsValue: "",
        imageFile: null
    }

    handleLike(postId: number, type: string): void {
        this.props.likePost(postId, type);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(contentId: number, contentType: string): void {
        this.setState({
            contentType: contentType,
            contentId: contentId,
            show: !this.state.show
        });
        if (contentType === "post") {
            this.props.getPost(contentId);
            this.props.getPostComments(contentId);
        } else if (contentType === "chat") {
            this.props.getChat(contentId);
            this.props.getChatComments(contentId);
        }
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
    
    postComment() {
        const { commentsValue, imageFile } = this.state;
        const { posts } = this.props;
        const postId = posts.singlePost?.postId
        this.props.createPostComment(commentsValue, imageFile, postId!);
    }

    postFunction(post: any) {
        const { postId, postValue, mediaLink, comments, favorites, type, imageSource } = post;
        return (
            <PostContainer key={`container post${postId}`}>
            <Card className="bg-dark" key={postId}>
                <Card.Img src={mediaLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} />
                <Card.ImgOverlay>
                    <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                        <BadgeContainer>
                            <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(postId, type)} size={15} /></Badge>
                        </BadgeContainer>
                        {
                            <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                <Chat size={15} />
                                {` ${comments?.length > 0 ? comments?.length : ""}`}
                            </Badge>
                            </BadgeContainer>
                        }
                        {
                            <BadgeContainer>
                                <Badge style={{ color: 'black' }} bg="light">
                                    <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(postId, type)} size={15} />
                                    {` ${favorites?.length > 0 ? favorites?.length : ""}`}
                                </Badge>
                            </BadgeContainer>
                        }
                    </div>
                </Card.ImgOverlay>
                <Card.Body>
                    <Card.Text>{postValue}</Card.Text>
                </Card.Body>
            </Card>
            </PostContainer>
        )
    } 

    chatFunction(chat: any) {
        const { chatId, title, type, userId, comments, chatComments, favorites, dateCreated } = chat;
        return (
            <PostContainer key={`container chat ${chatId}`}>
            <Card className="bg-dark" key={chatId}>
                <Row>
                <Card.Img  src={"https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
                <Card.ImgOverlay>
                <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                <Col>
                <BadgeContainer>
                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15} onClick={() => this.handleClick(chatId, type)}/></Badge>
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
                </div>
                </Card.ImgOverlay>
                <Card.Body>
                    <Card.Text>{title}</Card.Text>
                    <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                </Card.Body>
                </Row>
            </Card>
            </PostContainer>
        )
    }

    handleChatModal() {
        const { singleChat } = this.props.chats;
        const { userChatcomments } = this.props.chatcomments;
        return (
            <ModalContainer>
                <Modal.Header closeButton>
                    <Modal.Title >Crew Logs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{ position: 'relative' }}>
                        <Col md={8}>
                        <Image
                            fluid
                            style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                            src="https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"
                        />
                            <Card style={{ marginTop: "1rem" }} className="bg-dark" key={singleChat?.chatId}>
                            <TextContainer>
                            {singleChat?.title}
                            </TextContainer>
                        </Card>
                        </Col>
                        <Col>
                        <CommentContainer>
                        <div>Comments</div>
                        <div style={{ height: "65%", overflowY: "auto" }}>
                        {
                            userChatcomments?.map(({ chatCommentId, chatValue, mediaLink, dateCreated }) => {
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
                        </div>
                        <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={singleChat?.chatId} onSubmit={this.postComment}>
                        <Row style={{ marginBottom: '3rem', justifyContent: 'center' }} xs={1}>
                            <Col xs={12}>
                            <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Control style={{ height: '.5rem' }} name="commentValue" as="textarea" onChange={this.handleChange} placeholder=" Write your comment here" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group className="mb-3" controlId="formMedia">
                                        <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                    </Form.Group>
                                    </Col>
                                    </Row>
                                </Col>
                                <Col xs={12}>
                                    <button id={singleChat?.chatId.toString()} style={{ textAlign: 'center', width: "100%" }} className="btn btn-light" type="submit">
                                        <Send/>
                                    </button>
                                </Col>                
                            </Row>
                        </Form>
                        </CommentContainer>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-dark" onClick={() => this.handleClose()}>
                    Close
                </button>
                <a href={`/singlechat/${singleChat?.chatId}`} style={{ textDecoration: 'none', color: 'white' }} className="btn btn-dark">
                    Single View
                </a>
                </Modal.Footer>
            </ModalContainer>
        )
    }

    handlePostModal() {
        const { singlePost } = this.props.posts;
        const { comments } = this.props.comments;
        return (
            <ModalContainer>
                <Modal.Header closeButton>
                    <Modal.Title >Crew Logs</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{ position: 'relative' }}>
                        <Col md={8}>
                        <Image
                            fluid
                            style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                            src={singlePost?.mediaLink ? singlePost?.imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                        />
                            <Card style={{ marginTop: "1rem" }} className="bg-dark" key={singlePost?.postId}>
                            <TextContainer>
                            {singlePost?.postValue}
                            </TextContainer>
                        </Card>
                        </Col>
                        <Col>
                        <CommentContainer>
                        <div>Comments</div>
                        <div style={{ height: "65%", overflowY: "auto" }}>
                        {
                            comments?.map(({ commentId, commentValue, mediaLink, dateCreated }) => {
                                return <CardContainer>
                                    <Card className="bg-dark" key={commentId}>
                                        <TextContainer>
                                            <Card.Text>{commentValue}</Card.Text>
                                            <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                        </TextContainer>
                                    </Card>
                                </CardContainer>
                            })
                        }
                        </div>
                        <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={singlePost?.postId} onSubmit={this.postComment}>
                        <Row style={{ marginBottom: '3rem', justifyContent: 'center' }} xs={1}>
                            <Col xs={12}>
                            <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Control style={{ height: '.5rem' }} name="commentsValue" as="textarea" onChange={this.handleChange} placeholder=" Write your comment here" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group className="mb-3" controlId="formMedia">
                                        <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                    </Form.Group>
                                    </Col>
                                    </Row>
                                </Col>
                                <Col xs={12}>
                                    <button id={singlePost?.postId.toString()} style={{ textAlign: 'center', width: "100%" }} className="btn btn-light" type="submit">
                                        <Send/>
                                    </button>
                                </Col>                
                            </Row>
                        </Form>
                        </CommentContainer>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-dark" onClick={() => this.handleClose()}>
                    Close
                </button>
                <a href={`/singlepost/${singlePost?.postId}`} style={{ textDecoration: 'none', color: 'white' }} className="btn btn-dark" >
                    Single View
                </a>
                </Modal.Footer>
            </ModalContainer>
        )
    }

    handleType(): ReactNode {
        const content: any = [];
        const { favorites } = this.props;

        if (favorites.favorites != null) {
            for (let i = 0; i < favorites.favorites?.length!; i++) {
                if (favorites.favorites[i].type === "post") {
                    content.push(this.postFunction(favorites.favorites[i]))
                }
                if (favorites.favorites[i].type === "chat") {
                    content.push(this.chatFunction(favorites.favorites[i]))
                }
            }
        }

        return content;
    }

    handleModal(): ReactNode {
        const { contentId, contentType } = this.state;
        if (contentId != null) {
            if (contentType === "chat") {
                return this.handleChatModal();
            } else if (contentType === "post") {
                return this.handlePostModal();
            } else {
                return (
                    <>Nothing to see here</>
                )
            }
        }
    }

    componentDidMount(): void {
        this.props.getFavorites();
    }

    componentDidUpdate(prevProps: Readonly<{ chats: ChatState; chatcomments: ChatCommentState; posts: PostState; comments: CommentState; favorites: FavoriteState; currentUser: User | null; } & { getAllChats: () => void; getChat: (chatId: number) => void; getChatComments: (chatId: number) => void; getPost: (postId: number) => void; getPostComments: (postId: number) => void; getFavorites: () => void; createPostComment: (commentValue: string, imageFile: File, postId: number) => void; likePost: (postId: number, contentType: string) => void; }>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.props.favorites.favorites?.length != prevProps.favorites.favorites?.length) {
            this.props.getFavorites();
        }
    }
    
    render() {
        const { show } = this.state;
        const { favorites, chats, chatcomments, posts, comments, currentUser } = this.props;
        return (
            <Fragment>
                {
                    currentUser == null ? 
                    <Authentication/> :
                    <>
                    {
                favorites.isLoading || chats.isLoading || chatcomments.isLoading || posts.isLoading || comments.isLoading ? 
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <ReactLoading type="bars" color="lightgrey" height={375} width={375} />
                </div> :
                <>
                <h1>Favorites</h1>
                <p>Go over content you found useful</p>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
                    >
                        <Masonry>
                            {this.handleType()}
                        </Masonry>
                    </ResponsiveMasonry>
                <Modal 
                    size="lg"
                    show={show} 
                    onHide={() => this.handleClose()}
                >
                    {this.handleModal()}
                </Modal>
                </>
                }
                </>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        chats: state.chat,
        chatcomments: state.chatcomment,
        posts: state.post,
        comments: state.comment,
        favorites: state.favorite,
        currentUser: state.user.currentUser
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ChatFetchAllStart | FavoriteCreateStart | FavoriteFetchUserFavoritesStart | ChatFetchSingleStart | ChatCommentFetchSingleStart | PostFetchSingleStart | CommentCreateStart | CommentFetchSingleStart>) => ({
	getAllChats: () => dispatch(chatFetchAllStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    getChatComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    getPostComments: (postId: number) => dispatch(commentFetchSingleStart(postId)),
    getFavorites: () => dispatch(favoriteFetchUserFavoritesStart()),
    createPostComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(FavoriteComponent);