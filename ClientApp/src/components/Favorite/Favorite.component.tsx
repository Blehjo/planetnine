import { Component, Dispatch, Fragment } from "react";
import { Badge, Card, Col, Image, Modal, Row } from "react-bootstrap";
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
import { CardContainer, ModalContainer, PostContainer, TextContainer } from "../Post/Post.styles";
import Authentication from "../../routes/Authentication/Authentication.route";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { ArrowsFullscreen, Chat, Rocket } from "react-bootstrap-icons";

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
}

export class FavoriteComponent extends Component<FavoriteProps> {
    state: Favorites = {
        show: false
    }

    handleLike(postId: number, type: string): void {
        this.props.likePost(postId, type);
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

    postFunction(post: any) {
        const { postId, postValue, mediaLink, comments, favorites, type, imageSource } = post;
        console.log(favorites)
        return (
            <PostContainer>
            <Card className="bg-dark" key={postId}>
                <Card.Img src={mediaLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} />
                <Card.ImgOverlay>
                    <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                        <BadgeContainer>
                            <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(postId)} size={15} /></Badge>
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
            <PostContainer>
            <Card className="bg-dark" key={chatId}>
                <Row>
                <Card.Img  src={"https://www.artlog.net/sites/default/files/styles/al_colorbox_rules/public/turrell_cregis_golay_federal_studio.jpg?itok=2M4Pyn0A"}/>
                <Card.ImgOverlay>
                <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
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

    handleType() {
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

    componentDidMount(): void {
        this.props.getFavorites();
        // this.handleType();
    }

    componentDidUpdate(prevProps: Readonly<{ chats: ChatState; chatcomments: ChatCommentState; posts: PostState; comments: CommentState; favorites: FavoriteState; currentUser: User | null; } & { getAllChats: () => void; getChat: (chatId: number) => void; getComments: (chatId: number) => void; getFavorites: () => void; likePost: (postId: number, contentType: string) => void; }>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.props.favorites.favorites?.length != prevProps.favorites.favorites?.length) {
            this.props.getFavorites();
            // this.handleType();
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
                                chatcomments.chatcomments?.map(({ chatCommentId, chatValue, mediaLink, dateCreated }) => {
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
                    <button className="btn btn-dark" onClick={() => this.handleClose()}>
                        Single View
                    </button>
                    </Modal.Footer>
                    </ModalContainer>
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

const mapDispatchToProps = (dispatch: Dispatch<ChatFetchAllStart | FavoriteCreateStart | FavoriteFetchUserFavoritesStart | ChatFetchSingleStart | ChatCommentFetchSingleStart>) => ({
	getAllChats: () => dispatch(chatFetchAllStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    getComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    getFavorites: () => dispatch(favoriteFetchUserFavoritesStart()),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(FavoriteComponent);