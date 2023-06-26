import { Fragment, useEffect } from "react";
import { Card } from "react-bootstrap";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import MoonCommentComponent from "../../components/Comment/MoonComment.Component";
import { moonFetchSingleStart } from "../../store/moon/moon.action";
import { selectIsMoonLoading, selectSingleMoon } from "../../store/moon/moon.selector";
import { selectIsMoonCommentLoading } from "../../store/mooncomment/mooncomment.selector";
import { SinglePostContainer } from "../SinglePost/SinglePost.styles";

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
    const moonLoading = useSelector(selectIsMoonLoading);
    const mooncommentLoading = useSelector(selectIsMoonCommentLoading);
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
            {
                moonLoading || mooncommentLoading ? 
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <ReactLoading type="bars" color="lightgrey" height={375} width={375}/>
                </div> :
                <>
                <SinglePostContainer>
                    <Card className="bg-dark">
                    <Card.Title style={{ margin: '1rem 0rem 0rem 1rem' }} >{moon?.moonName}</Card.Title>
                        <Card.Body>
                            {
                                moon?.modelLink ? 
                                <iframe
                                    src={moon?.modelLink}
                                    width="100%" 
                                    height={window.innerWidth > 900 ? "450px" : "200px"}

                                /> :
                                <Card.Img src={moon?.imageLink ? moon.imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                            }
                        </Card.Body>
                        <Card.Footer>
                            <div style={{ height: '5rem', overflowY: 'auto' }}>
                                {moon?.description}
                            </div>
                        </Card.Footer>
                    </Card>
                </SinglePostContainer>
                <MoonCommentComponent moon={moon!} queryId={queryId}/>
                </>
            }
        </Fragment>
    )
}

export default SingleMoon;