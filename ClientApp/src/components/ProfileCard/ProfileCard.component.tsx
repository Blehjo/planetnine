import { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";

export class ProfileCard extends Component {
    // const dispatch = useDispatch();
    // const { userId, about, firstName, profileImage, username, imageSource } = useSelector(selectUserprofileItems);
    // const user = useSelector(selectUserprofileItems);
    // const { id } = useParams();

    // useEffect(() => {
    //     getSingleUser(id)
    //     .then((response) => dispatch(userprofileFetchAllStart(response.data)));
    // }, [id])
    render() {
        return (
            <Card style={{ color: 'white' }} className="bg-dark" key={"userId"}>
                {/* <Card.Img style={{ height: '20rem', width: 'auto', objectFit: 'cover' }} variant="top" src={profileImage ? imageSource : "https://www.cooperhewitt.org/wp-content/uploads/2018/07/20914_472d45b4ae377c5f_b1.jpg"} /> 
                <Card.Body>
                    <Row xs={2}>
                    <Col xs={9}>
                    <Card.Link style={{ textDecoration: 'none', color: 'white' }} href={`profile/${id}`}>
                    <Card.Header>{username}</Card.Header>
                    <Card.Title>{firstName}</Card.Title>
                    <Card.Subtitle>{about}</Card.Subtitle>
                    </Card.Link>
                    </Col>
                    </Row>
                    <Row style={{ marginBottom: '1rem' }} xs={2}>
                    </Row>
                </Card.Body> */}
            </Card>
        );
    }
}