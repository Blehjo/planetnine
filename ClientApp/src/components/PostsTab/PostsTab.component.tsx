import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { Card, Modal, Row, Col, Form, Button, Image, Badge } from "react-bootstrap";
import { ProfileProps } from "../Profile/Profile.component";
import { utcConverter } from "../../utils/date/date.utils";
import { CardContainer, CommentContainer, ModalContainer, PostContainer, TextContainer } from "../Post/Post.styles";
import { ModalPostContainer } from "../ModalPost/ModalPost.styles";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { ArrowsFullscreen, Chat, Rocket } from "react-bootstrap-icons";

interface IDefaultFormFields {
    commentValue: string;
    postValue: string;
    mediaLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
    showCreate: boolean;
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

    postComment() {
        const { commentValue, imageFile } = this.state;
        const { posts } = this.props;
        const postId = posts.singlePost?.postId ? posts.singlePost.postId : 0
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
        this.props.getUserPosts(this.props.currentUser.currentUser?.userId)
    }

    render() {
        const { currentUser, userprofile, posts, comments } = this.props;
        const { show, showCreate, postValue } = this.state;
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
                    <CommentContainer>
                            <Form style={{ margin: 'auto' }} key={posts.singlePost?.postId} onSubmit={this.postComment}>
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
                        </CommentContainer>
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
        <Modal show={showCreate} onHide={() => this.handleCloseCreate()}>
            <ModalPostContainer>
            <Modal.Header closeButton>
            <Modal.Title>Inquiry</Modal.Title>
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
        </Fragment>
        );
    }
}

export default PostsTab;