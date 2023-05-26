import { ChangeEvent, Component, Dispatch, Fragment } from "react";
import { ConnectedProps, connect } from "react-redux";
import { Badge, Button, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Globe, Chat, Rocket, ArrowsFullscreen, Send } from 'react-bootstrap-icons';

import { CardContainer, CommentContainer, FormContainer, ModalContainer, PostContainer, TextContainer } from "./Post.styles";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { RootState } from "../../store/store";
import { PostFetchAllStart, PostFetchSingleStart, postFetchAllStart, postFetchSingleStart } from "../../store/post/post.action";
import { CommentCreateStart, CommentFetchSingleStart, commentCreateStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { utcConverter } from "../../utils/date/date.utils";
import { favoriteCreateStart } from "../../store/favorite/favorite.action";
import { FavoriteCreateStart } from "../../store/favorite/favorite.action";

type PostProps = ConnectedProps<typeof connector>;

interface IDefaultFormFields {
    commentValue: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
}

export class PostComponent extends Component<PostProps, IDefaultFormFields> {
    constructor(props: PostProps) {
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

    postComment() {
        const { commentValue, imageFile } = this.state;
        const { posts } = this.props;
        const postId = posts.singlePost?.postId ? posts.singlePost.postId : 0
        this.props.createComment(commentValue, imageFile, postId);
    }

    handleLike(postId: number, type: string): void {
        this.props.likePost(postId, type);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(postId: number): void {
        this.props.getPost(postId);
        this.props.getComments(postId);
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
        const { posts } = this.props;
        const postId = posts.singlePost?.postId ? posts.singlePost.postId : 0
        this.props.getAllPosts();
        this.props.getComments(postId);
    }
    
    render() {
        const { posts, comments } = this.props;
        const { show } = this.state;
        return (
            <Fragment>
                <h1>Pilot Logs</h1>
                <p>Information on the galaxy documented by your fellow pioneers</p>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
                >
                    <Masonry>
                    {posts.posts?.map(({ postId, postValue, mediaLink, comments, favorites, type, imageSource }, index) => {
                        return <PostContainer key={index}>
                            <Card className="bg-dark" key={index}>
                                <Card.Img src={mediaLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                                <Card.ImgOverlay>
                                <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                                    <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(postId)} size={15}/></Badge>
                                    </BadgeContainer>
                                    {
                                        <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                            <Chat size={15}/>
                                            {` ${comments?.length > 0 ? comments?.length : ""}`}
                                            </Badge>
                                        </BadgeContainer>
                                    }
                                    {
                                        <BadgeContainer>
                                            <Badge style={{ color: 'black' }} bg="light">
                                            <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(postId, type)} size={15}/>
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
                        <Modal.Title >Pilot Log</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={8}>
                            <Image
                                fluid
                                style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                                src={posts.singlePost?.mediaLink ? posts.singlePost?.imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                            />
                            <Card style={{ marginTop: "1rem" }} className="bg-dark" key={posts.singlePost?.postId}>
                                <TextContainer>
                                {posts.singlePost?.postValue}
                                </TextContainer>
                            </Card>
                            </Col>
                            <Col>
                            <CommentContainer>
                            <div>Comments</div>
                            <div style={{ height: "65%", overflowY: "auto" }}>
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
                            </div>
                            {/* <FormContainer> */}
                            <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={posts.singlePost?.postId} onSubmit={this.postComment}>
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
                                        <Send/>
                                    </button>
                                </Col>                
                            </Row>
                        </Form>
                            {/* </FormContainer> */}
                            </CommentContainer>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-dark" onClick={() => this.handleClose()}>
                        Close
                    </button>
                    <button className="btn btn-dark" >
                        <a style={{ textDecoration: 'none', color: 'white' }} href={`/singlepost/${posts.singlePost?.postId}`}>
                        Single View
                        </a>
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
        posts: state.post,
        comments: state.comment 
    };
};

const mapDispatchToProps = (dispatch: Dispatch<PostFetchAllStart | PostFetchSingleStart | CommentFetchSingleStart | CommentCreateStart | FavoriteCreateStart>) => ({
	getAllPosts: () => dispatch(postFetchAllStart()),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    getComments: (postId: number) => dispatch(commentFetchSingleStart(postId)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(commentCreateStart(commentValue, imageFile, postId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PostComponent);