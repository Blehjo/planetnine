import { Component, Dispatch, Fragment } from "react";
import { ConnectedProps, connect } from "react-redux";
import { Badge, Card } from "react-bootstrap";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Globe, Person, Rocket } from 'react-bootstrap-icons';

import { PostContainer } from "./Post.styles";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { RootState } from "../../store/store";
import { PostFetchAllStart, postFetchAllStart } from "../../store/post/post.action";

type PostProps = ConnectedProps<typeof connector>;

export class PostComponent extends Component<PostProps> {
    handleClick(event:  React.ChangeEvent<HTMLInputElement>) {
        const { id } = event.target;
    }

    componentDidMount(): void {
        this.props.getAllPosts();
    }
    
    render() {
        const { posts } = this.props;
        return (
            <Fragment>
                <h1>Pilot Logs</h1>
                <p>Information on the galaxy documented by your fellow pioneers</p>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                >
                    <Masonry>
                    {posts.posts?.map(({ postValue, mediaLink, comments, favorites }, index) => {
                        return <PostContainer>
                            <Card className="bg-dark" key={index}>
                                <Card.Img src={mediaLink ? mediaLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                                <Card.ImgOverlay>
                                    <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light"><Person size={15}/></Badge>
                                    </BadgeContainer>
                                    {
                                        comments && <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                            <Globe size={15}/>
                                            {` ${comments}`}
                                            </Badge>
                                        </BadgeContainer>
                                    }
                                    {
                                        favorites && <BadgeContainer>
                                            <Badge style={{ color: 'black' }} bg="light">
                                            <Rocket size={15}/>
                                            {` ${favorites}`}
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
            </Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { posts: state.post };
};

const mapDispatchToProps = (dispatch: Dispatch<PostFetchAllStart>) => ({
	getAllPosts: () => dispatch(postFetchAllStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PostComponent);