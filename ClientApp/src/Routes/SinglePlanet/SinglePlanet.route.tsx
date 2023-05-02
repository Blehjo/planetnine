import { Fragment, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { SinglePostContainer } from "../SinglePost/SinglePost.styles";
import { selectSinglePlanet } from "../../store/planet/planet.selector";
import { postFetchSingleStart } from "../../store/post/post.action";
import PlanetCommentComponent from "../../components/Comment/PlanetComment.Component";
import { planetFetchSingleStart } from "../../store/planet/planet.action";

const defaultFormFields = {
    commentValue: '',
    mediaLink: '',
    imageSource: null,
    imageFile: null
}

function SinglePlanet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const planet = useSelector(selectSinglePlanet);
    let { id } = useParams();
    const queryId = parseInt(id!);

    const backToPosts = () => {
        navigate(`/planets`);
    }

    useEffect(() => {
        dispatch(planetFetchSingleStart(queryId));
    }, [id]);
    
    return (
        <Fragment>
            <SinglePostContainer>
                <Card className="bg-dark">
                    <Card.Body>
                        <Card.Img src={planet?.imageLink ? planet.imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                    </Card.Body>
                    <Card.Footer>{planet?.planetName}</Card.Footer>
                </Card>
            </SinglePostContainer>
            <PlanetCommentComponent planet={planet!} queryId={queryId}/>
        </Fragment>
    )
}

export default SinglePlanet;