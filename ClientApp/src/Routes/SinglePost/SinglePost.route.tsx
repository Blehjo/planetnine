import { Component, Fragment, useEffect, useState } from "react"
import { SinglePostContainer } from "./SinglePost.styles"
import { Comment } from "../../components/Comment/Comment.component"
import { Card } from "react-bootstrap"
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectSinglePost } from "../../store/post/post.selector";
import { getSinglePost } from "../../utils/api/post.api";
import { postFetchSingleSuccess } from "../../store/post/post.action";

const defaultFormFields = {
    commentValue: '',
    mediaLink: '',
    imageSource: null,
    imageFile: null
}

function SinglePost() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const posts = useSelector(selectSinglePost);
    const { id } = useParams();

    // const backToPosts = () => {
    //     navigate(`/posts`);
    // }

    // const resetFormFields = () =>
    //     setFormFields(defaultFormFields);

    // async function postComment(event) {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append('postId', event.target.id)
    //     formData.append('commentValue', formFields.commentValue);
    //     formData.append('mediaLink', formFields.mediaLink);
    //     formData.append('imageFile', formFields.imageFile);
    //     addComment(formData)
    //     .then(() => window.location.reload());
    //     resetFormFields();
    // };

    // const showPreview = e => {
    //     if (e.target.files && e.target.files[0]) {
    //         let imageFile = e.target.files[0];
    //         const reader = new FileReader();
    //         reader.onload = x => {
    //             setFormFields({
    //                 ...formFields,
    //                 imageFile,
    //                 imageSource: x.target.result
    //             })
    //         }
    //         reader.readAsDataURL(imageFile)
    //     }
    //     else {
    //         setFormFields({
    //             ...formFields,
    //             imageFile: null,
    //             imageSource: null
    //         })
    //     }
    // }

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormFields({ ...formFields, [name]: value })
    // }

    useEffect(() => {
        let queryId;
        if (id != undefined) {
            queryId = parseInt(id);
            getSinglePost(queryId)
            .then((response) => dispatch(postFetchSingleSuccess(response)));
        }
        console.log("Posts: ", posts)
    }, []);

    return (
        <Fragment>
            <SinglePostContainer>
                <Card className="bg-dark">
                    <Card.Header>Post</Card.Header>
                    <Card.Body>
                        <Card.Img src=""/>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>
            </SinglePostContainer>
            <Comment/>
        </Fragment>
    )
}

export default SinglePost;