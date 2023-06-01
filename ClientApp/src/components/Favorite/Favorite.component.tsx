import { ChangeEvent, Component, Dispatch, Fragment } from "react";
import { FavoriteContainer } from "./Favorite.styles";
import { Badge, Button, Card, Col, Image, Modal, Row } from "react-bootstrap";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { ArrowsFullscreen, Globe, Person, Rocket } from 'react-bootstrap-icons';
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { CardContainer, ModalContainer, TextContainer } from "../Post/Post.styles";
import { RootState } from "../../store/store";
import { ConnectedProps, connect } from "react-redux";
import { ChatFetchAllStart, ChatFetchSingleStart, chatFetchAllStart, chatFetchSingleStart } from "../../store/chat/chat.action";
import { ChatCommentFetchSingleStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";
import { FavoriteFetchUserFavoritesStart, favoriteFetchUserFavoritesStart } from "../../store/favorite/favorite.action";
import { utcConverter } from "../../utils/date/date.utils";
import { getFavorite } from "../../utils/favorites/favorites.utils";
import { ChatState } from "../../store/chat/chat.reducer";
import { ChatCommentState } from "../../store/chatcomment/chatcomment.reducer";
import { CommentState } from "../../store/comment/comment.reducer";
import { FavoriteState } from "../../store/favorite/favorite.reducer";
import { PostState } from "../../store/post/post.reducer";
import { User } from "../../store/user/user.types";

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
    userFavorites: any[];
}

export class FavoriteComponent extends Component<FavoriteProps> {
    state: Favorites = {
        show: false,
        userFavorites: []
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
        this.props.getFavorites();
        // this.props.favorites.favorites?.map(({ contentId, contentType }) => 
        //     getFavorite(contentId, contentType)
        //     .then((response) => this.setState({ userFavorites: this.state.userFavorites.concat(response) })))
    }

    componentDidUpdate(prevProps: Readonly<{ chats: ChatState; chatcomments: ChatCommentState; posts: PostState; comments: CommentState; favorites: FavoriteState; currentUser: User | null; } & { getAllChats: () => void; getChat: (chatId: number) => void; getComments: (chatId: number) => void; getFavorites: () => void; }>, prevState: Readonly<{}>, snapshot?: any): void {
        if (this.props.favorites.favorites?.length != prevProps.favorites.favorites?.length) {
            this.props.favorites.favorites?.map(({ contentId, contentType }) => 
                getFavorite(contentId, contentType)
                .then((response) => this.setState({ userFavorites: this.state.userFavorites.concat(response) })))
        }
    }
    
    render() {
        const { show, userFavorites } = this.state;
        const { favorites, chats, chatcomments, posts, comments, currentUser } = this.props;
        console.log(userFavorites);
        return (
            <Fragment>
                <h1>Favorites</h1>
                <p>Go over content you found useful</p>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
                    >
                        <Masonry>
                        {userFavorites.map(({ favoriteId, contentId, contentType, dateCreated }, index) => {
                            return (
                                <FavoriteContainer key={index}>
                                    {

                                    }
                                </FavoriteContainer>
                            // <FavoriteContainer key={index}>
                            //     <Card className="bg-dark" key={index}>
                            //         {/* <Card.Img src={mediaLink}/> */}
                            //         {/* <Card.ImgOverlay> */}
                            //             <BadgeContainer>
                            //                 <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15} onClick={() => this.handleClick(favoriteId)}/></Badge>
                            //             </BadgeContainer>
                            //             {
                            //                 comments > 0 && <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                            //                     <Globe size={15}/>
                            //                     {' '}{comments}
                            //                     </Badge>
                            //                 </BadgeContainer>
                            //             }
                            //             {
                            //                 favorites > 0 && <BadgeContainer>
                            //                     <Badge style={{ color: 'black' }} bg="light">
                            //                     <Rocket size={15}/>
                            //                     {' '}{favorites}
                            //                     </Badge>
                            //                 </BadgeContainer>
                            //             }
                            //         {/* </Card.ImgOverlay> */}
                            //         <Card.Body>
                            //             <Card.Text>{postValue}</Card.Text>
                            //             <Card.Text>{about}</Card.Text>
                            //         </Card.Body>
                            //     </Card>
                            // </FavoriteContainer>
                        )})}
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

const mapDispatchToProps = (dispatch: Dispatch<ChatFetchAllStart | FavoriteFetchUserFavoritesStart | ChatFetchSingleStart | ChatCommentFetchSingleStart>) => ({
	getAllChats: () => dispatch(chatFetchAllStart()),
    getChat: (chatId: number) => dispatch(chatFetchSingleStart(chatId)),
    getComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    getFavorites: () => dispatch(favoriteFetchUserFavoritesStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(FavoriteComponent);