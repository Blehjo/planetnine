import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { Card, Modal, Row, Col, Form, Button, Image, Badge } from "react-bootstrap";
import { ProfileProps } from "../Profile/Profile.component";
import { utcConverter } from "../../utils/date/date.utils";
import { CardContainer, CommentContainer, ModalContainer, PostContainer, TextContainer } from "../Post/Post.styles";
import { ModalPostContainer } from "../ModalPost/ModalPost.styles";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { ArrowsFullscreen, Chat, Rocket, Send, XCircle } from "react-bootstrap-icons";
import { PostState } from "../../store/post/post.reducer";
import { CommentState } from "../../store/comment/comment.reducer";

interface IDefaultFormFields {
    commentValue: string;
    postValue: string;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
    showCreate: boolean;
    showDelete: boolean;
    postId: number | null;
};

export class PostsTab extends Component<ProfileProps, IDefaultFormFields> {
    constructor(props: ProfileProps) {
        super(props);
        this.state = {
            postValue: "",
            mediaLink: "",
            imageSource: "",
            imageFile: null,
            show: false,
            showCreate: false,
            showDelete: false,
            commentValue: "",
            postId: null
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
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    postComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        const { posts } = this.props;
        const postId = posts.singlePost?.postId ? posts.singlePost.postId : 0
        try {
            this.props.createComment(commentValue, imageFile, postId);
        } catch (error) {
            return error;
        }
    }

    handleLike(postId: number, type: string): void {
        this.props.likePost(postId, type);
    }

    handleCreate(): void {
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    handleDelete(): void {
        this.props.deletePost(this.state.postId!);
        this.handleCloseDelete();
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
    
    handleCloseDelete(): void {
        this.setState({
            showDelete: !this.state.showDelete
        });
    }

    handleDeleteClick(postId: number): void {
        this.setState({
            postId: postId
        })
        this.handleCloseDelete();
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
        this.props.getUserPosts(this.props.currentUser.currentUser?.userId)
    }

    componentDidUpdate(prevProps: Readonly<{ posts: PostState; comments: CommentState; } & { getUserPosts: (userId: number) => void; getComments: (postId: number) => void; }>, prevState: Readonly<IDefaultFormFields>, snapshot?: any): void {
        if (this.props.posts.userPosts?.length != prevProps.posts.userPosts?.length) {
            this.props.getUserPosts(this.props.currentUser.currentUser?.userId);
            this.setState({
                postValue: ""
            })
        }

        if (this.props.posts.singlePost?.postId != prevProps.posts.singlePost?.postId) {
            this.props.getUserPosts(this.props.currentUser.currentUser?.userId);
            this.setState({
                commentValue: ""
            })
        }

        if (this.props.comments.comments?.length != prevProps.comments.comments?.length) {
            this.props.getComments(this.props.posts.singlePost?.postId!);
            this.setState({
                commentValue: ""
            })
        }
    }

    render() {
        const { currentUser, userprofile, posts, comments } = this.props;
        const { show, showCreate, showDelete, postValue } = this.state;
        return (
        <Fragment>
            <Row style={{ marginBottom: '2rem' }} xs={1} >
                <Col>
                    <Card style={{ color: 'white', textAlign: 'center' }} className='bg-dark'>
                        <Card.Body>
                            <Card.Title style={{ cursor: 'pointer' }} onClick={this.handleCreate} >Create a post</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {
                posts.userPosts?.length ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
                >
                <Masonry>
                {posts.userPosts?.map(({ postId, postValue, mediaLink, comments, favorites, type, imageSource }, index) => {
                    return <PostContainer key={index}>
                        <Card className="bg-dark" key={index}>
                            <Card.Img  src={mediaLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
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
                                <Col xs={3}>
                                <XCircle onClick={() => this.handleDeleteClick(postId)} key={postId} style={{ background: "white", borderRadius: ".5rem", color: "black", cursor: "pointer", position: "absolute", right: "5", top: "5" }}/>
                                </Col>
                            </Card.ImgOverlay>
                            <Card.Body>
                                <Card.Text>{`${postValue?.slice(0,10)}...`}</Card.Text>
                            </Card.Body>
                        </Card>
                    </PostContainer>
                })}
                </Masonry>
            </ResponsiveMasonry> : 
            <Col xs={12}>
                <Card style={{ color: 'white', textAlign: 'center' }} className="bg-dark">
                    <Card.Title>"Currently no posts... Let's change that!"</Card.Title>
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
                                    <button style={{ textAlign: 'center', width: '100%', height: '100%'}} className="btn btn-light" type="submit">
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
                <a className="btn btn-dark" style={{ textDecoration: 'none', color: 'white' }} href={`/singlepost/${posts.singlePost?.postId}`}>
                    Single View
                </a>
            </Modal.Footer>
            </ModalContainer>
        </Modal>
        <Modal show={showCreate} onHide={() => this.handleCloseCreate()}>
            <ModalPostContainer>
            <Modal.Header closeButton>
            <Modal.Title>Data Log</Modal.Title>
            </Modal.Header>
            <Form autoComplete="off" onSubmit={this.handleSubmit}>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formPostValue">
                <Form.Control
                    onChange={this.handleChange}
                    name="postValue"
                    value={postValue}
                    type="postValue"
                    as="input"
                    placeholder="Post"
                    autoFocus
                    />
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="formFile"
                >
                <Form.Control 
                    as="input"
                    name="mediaLink"
                    onChange={this.showPreview}
                    accept="image/*"
                    type="file" 
                    placeholder="Media"
                />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <button className="btn btn-secondary" onClick={() => this.handleCloseCreate()}>
                Close
            </button>
            <button type="submit" className="btn btn-primary">
                Log
            </button>
            </Modal.Footer>
            </Form>
            </ModalPostContainer>
        </Modal>
        <Modal show={showDelete} onHide={() => this.handleCloseDelete()}>
            <Modal.Body style={{ textAlign: "center", color: "black" }}>
                Are you sure you want to delete this post?
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

export default PostsTab;