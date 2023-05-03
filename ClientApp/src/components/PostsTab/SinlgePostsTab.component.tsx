import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { Card, Modal, Row, Col, Image, Badge, Form } from "react-bootstrap";
import { utcConverter } from "../../utils/date/date.utils";
import { CardContainer, CommentContainer, ModalContainer, PostContainer, TextContainer } from "../Post/Post.styles";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { ArrowsFullscreen, Chat, Rocket } from "react-bootstrap-icons";
import { ConnectedProps, connect } from "react-redux";

import { RootState } from "../../store/store";

import { UserprofileFetchSingleStart, userprofileFetchSingleStart } from "../../store/userprofile/userprofile.action";
import { PilotFetchSingleStart, pilotFetchSingleStart } from "../../store/pilot/pilot.action";
import { PostCreateStart, PostFetchAllStart, PostFetchSingleStart, PostFetchUserPostsStart, postCreateStart, postFetchAllStart, postFetchSingleStart, postFetchUserPostsStart } from "../../store/post/post.action";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { MoonCreateStart, MoonFetchSingleStart, MoonFetchUserMoonsStart, moonCreateStart, moonFetchSingleStart, moonFetchUserMoonsStart } from "../../store/moon/moon.action";
import { PlanetCreateStart, PlanetFetchSingleStart, PlanetFetchUserPlanetsStart, planetCreateStart, planetFetchSingleStart, planetFetchUserPlanetsStart } from "../../store/planet/planet.action";
import { ChatFetchSingleStart, ChatFetchUserChatsStart } from "../../store/chat/chat.action";
import { PlanetCommentCreateStart, PlanetCommentFetchSingleStart, planetcommentCreateStart, planetcommentFetchSingleStart } from "../../store/planetcomment/planetcomment.action";
import { MoonCommentCreateStart, MoonCommentFetchSingleStart, moonCommentCreateStart, moonCommentFetchSingleStart } from "../../store/mooncomment/mooncomment.action";

interface IDefaultFormFields {
    commentValue: string;
    postValue: string;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
    showCreate: boolean;
};

export type ProfileProps = ConnectedProps<typeof connector>;

type UserInfo = ProfileProps & {
    userId?: number;
}

export class SinglePostsTab extends Component<UserInfo, IDefaultFormFields> {
    constructor(props: UserInfo) {
        super(props);
        this.state = {
            postValue: "",
            mediaLink: "",
            imageSource: "",
            imageFile: null,
            show: false,
            showCreate: false,
            commentValue: ""
        }

        this.handleLike = this.handleLike.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseCreate = this.handleCloseCreate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    postComment(state: RootState) {
        const { commentValue, imageFile } = this.state;
        const { post } = state;
        const postId = post.singlePost?.postId ? post.singlePost.postId : 0
        this.props.createComment(commentValue, imageFile, postId);
    }

    handleLike(postId: number, type: string): void {
        this.props.likePost(postId, type);
    }

    handleCreate(): void {
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }
    
    handleCloseCreate(): void {
        this.setState({
            showCreate: !this.state.showCreate
        });
    }

    handleClick(postId: number): void {
        this.props.getPost(postId);
        this.props.getComments(postId);
        this.setState({
            show: !this.state.show
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { postValue, mediaLink, imageFile } = this.state;
        try {
            this.props.createPost(postValue, mediaLink, imageFile);
        } catch (error) {
            if (error) {
                alert('Try again, please');
            } 
        }
        this.handleCloseCreate();
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
        this.props.getUserPosts(this.props.userId!);
    }

    render() {
        const { posts, comments } = this.props;
        const { show, showCreate, postValue } = this.state;
        return (
        <Fragment>
            {
                posts.userPosts?.length ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
                >
                <Masonry>
                {posts.userPosts?.map(({ postId, postValue, mediaLink, comments, favorites, type, imageSource }, index) => {
                    return <PostContainer key={index}>
                        <Card className="bg-dark" key={index}>
                            <Card.Img src={mediaLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                            <Card.ImgOverlay>
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(postId)} size={15}/></Badge>
                                </BadgeContainer>
                                {
                                    <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                        <Chat size={15}/>
                                        {` ${comments != null ? comments : ""}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                {
                                    <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light">
                                        <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(postId, type)} size={15}/>
                                        {` ${favorites != null ? favorites : ""}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                            </Card.ImgOverlay>
                            <Card.Body>
                                <Card.Text>{postValue}</Card.Text>
                            </Card.Body>
                        </Card>
                    </PostContainer>
                })}
                </Masonry>
            </ResponsiveMasonry> : 
            <Col xs={12}>
                <Card style={{ color: 'white', textAlign: 'center' }} className="bg-dark">
                    <Card.Title>"Stay tuned. Currently no posts..."</Card.Title>
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
                <Modal.Title >Pilot Log</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={8}>
                    <Image
                        fluid
                        src={posts.singlePost?.mediaLink ? posts.singlePost?.imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                    />
                    {posts.singlePost?.postValue}
                    </Col>
                    <Col>
                    <div>Comments</div>
                    <CommentContainer>
                    {
                        comments.comments?.map(({ commentId, commentValue, mediaLink, dateCreated }) => {
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
                    </CommentContainer>
                        <Form style={{ margin: 'auto' }} key={posts.singlePost?.postId} onSubmit={() => this.postComment}>
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
                                    <button id={posts.singlePost?.postId.toString()} style={{ textAlign: 'center', width: '100%', height: '100%'}} className="btn btn-light" type="submit">
                                        Post
                                    </button>
                                </Col>                
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
            <button className="btn btn-dark" onClick={() => this.handleClose()}>
                Close
            </button>
            <a className="btn btn-dark" href={`/singlepost/${posts.singlePost?.postId}`}>
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
        posts: state.post,
        comments: state.comment,
        mooncomments: state.mooncomment,
        planetcomments: state.planetcomment,
        moons: state.moon,
        planets: state.planet,
        chats: state.chat,
        chatComments: state.chatcomment
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UserprofileFetchSingleStart | PilotFetchSingleStart | PostFetchAllStart | PostFetchUserPostsStart | PostCreateStart | PostFetchSingleStart | ChatFetchUserChatsStart | ChatFetchSingleStart | CommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart | MoonCreateStart | PlanetCreateStart | PlanetFetchUserPlanetsStart | PlanetFetchSingleStart | MoonFetchUserMoonsStart | PlanetCommentFetchSingleStart | MoonCommentFetchSingleStart | MoonFetchSingleStart | PlanetCommentCreateStart | MoonCommentCreateStart>) => ({
    getUserProfile: (userId: number) => dispatch(userprofileFetchSingleStart(userId)),
    getPilot: (userId: number) => dispatch(pilotFetchSingleStart(userId)),
    getAllPosts: () => dispatch(postFetchAllStart()),
    getUserPosts: (userId: number | undefined) => dispatch(postFetchUserPostsStart(userId)),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
    createPost: (postValue: string, mediaLink: string, imageFile: File) => dispatch(postCreateStart(postValue, mediaLink, imageFile)),
    createPlanet: (planetMass: string, planetName: string, perihelion: string, aphelion: string, gravity: string, temperature: string, imageLink: string, imageFile: File  ) => dispatch(planetCreateStart(planetMass, planetName, perihelion, aphelion, gravity, temperature, imageLink, imageFile)),
    createMoon: (moonMass: string, moonName: string, perihelion: string, aphelion: string, gravity: string, temperature: string, planetId: number | null, imageLink: string, imageFile: File  ) => dispatch(moonCreateStart(moonMass, moonName, perihelion, aphelion, gravity, temperature, planetId, imageLink, imageFile)),
    createPlanetComment: (commentValue: string, imageFile: File, planetId: number) => dispatch(planetcommentCreateStart(commentValue, imageFile, planetId)),
    createMoonComment: (commentValue: string, imageFile: File, postId: number) => dispatch(moonCommentCreateStart(commentValue, imageFile, postId)),
    getComments: (planetId: number) => dispatch(commentFetchSingleStart(planetId)),
    getPlanetComments: (planetId: number) => dispatch(planetcommentFetchSingleStart(planetId)),
    getMoonComments: (moonId: number) => dispatch(moonCommentFetchSingleStart(moonId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType)),
    getPlanets: () => dispatch(planetFetchUserPlanetsStart()),
    getPlanet: (planetId: number) => dispatch(planetFetchSingleStart(planetId)),
    getMoons: () => dispatch(moonFetchUserMoonsStart()),
    getMoon: (moonId: number) => dispatch(moonFetchSingleStart(moonId)) 
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(SinglePostsTab);