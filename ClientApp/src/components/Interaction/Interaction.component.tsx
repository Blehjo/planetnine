import { Component, Dispatch, Fragment } from "react";
import { ConnectedProps, connect } from "react-redux";

import { RootState } from "../../store/store";
import { PostFetchAllStart, postFetchAllStart } from "../../store/post/post.action";

type InteractionProps = ConnectedProps<typeof connector>;

class Interaction extends Component<InteractionProps> {
    constructor(props: InteractionProps) {
        super(props);
        this.state = {
            postId: null,
            singlePost: null,
            userPosts: [],
            posts: [],
            isLoading: false,
            error: null,
        }
    } 

    componentDidMount() {
        const posts = this.props.post;
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

const mapDispatchToProps = (dispatch: Dispatch<PostFetchAllStart>) => ({
	getAllPosts: () => dispatch(postFetchAllStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Interaction)