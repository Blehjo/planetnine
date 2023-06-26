import { Fragment, useEffect } from "react";
import { Card } from "react-bootstrap";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PlanetCommentComponent from "../../components/Comment/PlanetComment.Component";
import { planetFetchSingleStart } from "../../store/planet/planet.action";
import { selectIsPlanetLoading, selectSinglePlanet } from "../../store/planet/planet.selector";
import { selectIsPlanetCommentLoading } from "../../store/planetcomment/planetcomment.selector";
import { SinglePostContainer } from "../SinglePost/SinglePost.styles";

const defaultFormFields = {
    commentValue: '',
    mediaLink: '',
    imageSource: null,
    imageFile: null
}

function SinglePlanet() {
    const dispatch = useDispatch();
    const planet = useSelector(selectSinglePlanet);
    const planetLoading = useSelector(selectIsPlanetLoading);
    const planetcommentLoading = useSelector(selectIsPlanetCommentLoading);
    let { id } = useParams();
    const queryId = parseInt(id!);
    // const height = innerHeight;

    useEffect(() => {
        dispatch(planetFetchSingleStart(queryId));
    }, [id]);
    
    return (
        <Fragment>
            {
                planetLoading || planetcommentLoading ? 
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <ReactLoading type="bars" color="lightgrey" height={375} width={375}/>
                </div> :
                <>
                <SinglePostContainer>
                    <Card className="bg-dark">
                        <Card.Title style={{ margin: '1rem 0rem 0rem 1rem' }} >{planet?.planetName}</Card.Title>
                        <Card.Body>
                            {
                                planet?.modelLink ? 
                                <iframe
                                    src={planet?.modelLink}
                                    width="100%" 
                                    height={window.innerWidth > 900 ? "450px" : "200px"}

                                /> :
                                <Card.Img src={planet?.imageLink ? planet.imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                            }
                        </Card.Body>
                        <Card.Footer>
                            <div style={{ height: '5rem', overflowY: 'auto' }}>
                            {planet?.description}
                            </div>
                        </Card.Footer>
                    </Card>
                </SinglePostContainer>
                <PlanetCommentComponent planet={planet!} queryId={queryId}/>
                </>
            }
        </Fragment>
    )
}

export default SinglePlanet;