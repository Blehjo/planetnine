import { Component, Fragment } from "react"
import { IProfile } from "../../routes/Profiles/Profiles.route"
import { IPost } from "../../routes/Posts/Posts.route"
import { IChat } from "../../routes/Chats/Chats.route"
import { RootState } from "../../store/store";
import { connect } from "react-redux";
import { PostState } from "../../store/post/post.reducer";
import { getAllPosts } from "../../utils/api/post.api";

interface IState {
    content: IProfile | IPost | IChat;
}

type Props = RootState & typeof mapDispatchToProps;

class Interaction extends Component<Props, PostState> {
    constructor(props: Props) {
        super(props);
    } 
    state = {
        postId: null,
        singlePost: null,
        userPosts: [],
        posts: [],
        isLoading: false,
        error: null,
    }

    componentDidMount() {
        const posts = this.props.post;
        console.log("Posts: ", posts)
    }

    render() {
        const { post } = this.props;
        return (
            <Fragment>
                <ul>
                    {post.posts?.map(({ postId, postValue }, index) => (
                        <li id={postId?.toString()} key={index}>{postValue}</li>
                    ))}
                </ul>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { post: state.post };
};

const mapDispatchToProps = {
    getAllPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Interaction);