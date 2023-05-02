import { Fragment, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { SinglePostContainer } from "./SinglePost.styles";
import { selectSinglePost } from "../../store/post/post.selector";
import { postFetchSingleStart } from "../../store/post/post.action";
import CommentComponent from "../../components/Comment/Comment.component";

const defaultFormFields = {
    commentValue: '',
    mediaLink: '',
    imageSource: null,
    imageFile: null
}

function SinglePost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector(selectSinglePost);
    let { id } = useParams();
    const queryId = parseInt(id!);

    const backToPosts = () => {
        navigate(`/posts`);
    }

    useEffect(() => {
        dispatch(postFetchSingleStart(queryId));
    }, [id]);
    
    return (
        <Fragment>
            <SinglePostContainer>
                <Card className="bg-dark">
                    <Card.Body>
                        <Card.Img src={post?.imageSource}/>
                    </Card.Body>
                    <Card.Footer>{post?.postValue}</Card.Footer>
                </Card>
            </SinglePostContainer>
            <CommentComponent post={post!} queryId={queryId}/>
        </Fragment>
    )
}

export default SinglePost;