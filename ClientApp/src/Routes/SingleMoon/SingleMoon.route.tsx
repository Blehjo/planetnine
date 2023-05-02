import { Fragment, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { SinglePostContainer } from "../SinglePost/SinglePost.styles";
import { moonFetchSingleStart } from "../../store/moon/moon.action";
import { selectSingleMoon } from "../../store/moon/moon.selector";
import MoonCommentComponent from "../../components/Comment/MoonComment.Component";

const defaultFormFields = {
    commentValue: '',
    mediaLink: '',
    imageSource: null,
    imageFile: null
}

function SingleMoon() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const moon = useSelector(selectSingleMoon);
    let { id } = useParams();
    const queryId = parseInt(id!);

    const backToPosts = () => {
        navigate(`/moons`);
    }

    useEffect(() => {
        dispatch(moonFetchSingleStart(queryId));
    }, [id]);
    
    return (
        <Fragment>
            <SinglePostContainer>
                <Card className="bg-dark">
                    <Card.Body>
                        <Card.Img src={moon?.imageLink ? moon.imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                    </Card.Body>
                    <Card.Footer>{moon?.moonName}</Card.Footer>
                </Card>
            </SinglePostContainer>
            <MoonCommentComponent moon={moon!} queryId={queryId}/>
        </Fragment>
    )
}

export default SingleMoon;