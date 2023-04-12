import { Component, Dispatch, Fragment } from "react";
import { ConnectedProps, connect } from "react-redux";
import { Badge, Button, Card, Col, Image, Modal, Row } from "react-bootstrap";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Globe, Chat, Rocket, ArrowsFullscreen } from 'react-bootstrap-icons';

import { CardContainer, ModalContainer, PostContainer, TextContainer } from "./Post.styles";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { RootState } from "../../store/store";
import { PostFetchAllStart, PostFetchSingleStart, postFetchAllStart, postFetchSingleStart } from "../../store/post/post.action";
import { CommentFetchSingleStart, commentFetchSingleStart } from "../../store/comment/comment.action";
import { utcConverter } from "../../utils/date/date.utils";
import { favoriteCreateStart } from "../../store/favorite/favorite.action";
import { FavoriteCreateStart } from "../../store/favorite/favorite.action";

type PostProps = ConnectedProps<typeof connector>;

export class PostComponent extends Component<PostProps> {
    state = {
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

    handleClick(postId: number): void {
        this.props.getPost(postId);
        this.props.getComments(postId);
        this.setState({
            show: !this.state.show
        });
    }

    componentDidMount(): void {
        this.props.getAllPosts();
    }
    
    render() {
        const { posts, comments } = this.props;
        const { show } = this.state;
        return (
            <Fragment>
                <h1>Pilot Logs</h1>
                <p>Information on the galaxy documented by your fellow pioneers</p>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                >
                    <Masonry>
                    {posts.posts?.map(({ postId, postValue, mediaLink, comments, favorites, type }, index) => {
                        return <PostContainer key={index}>
                            <Card className="bg-dark" key={index}>
                                <Card.Img src={mediaLink ? mediaLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
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
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="dark" onClick={() => this.handleClose()}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={() => this.handleClose()}>
                        Single View
                    </Button>
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

const mapDispatchToProps = (dispatch: Dispatch<PostFetchAllStart | PostFetchSingleStart | CommentFetchSingleStart | FavoriteCreateStart>) => ({
	getAllPosts: () => dispatch(postFetchAllStart()),
    getPost: (postId: number) => dispatch(postFetchSingleStart(postId)),
    getComments: (postId: number) => dispatch(commentFetchSingleStart(postId)),
    likePost: (postId: number, contentType: string) => dispatch(favoriteCreateStart(postId, contentType))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PostComponent);