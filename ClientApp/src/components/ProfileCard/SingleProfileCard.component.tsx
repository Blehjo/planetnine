import { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { SingleProfile } from "../../routes/SingleProfile/SingleProfile.route";

export class SingleProfileCard extends Component<SingleProfile> {

    render() {
        const { profile } = this.props;
        if (profile != undefined) {
            const { username, firstName, about, userId, imageSource } = profile;
            return (
                <Card style={{ color: 'white' }} className="bg-dark" key={"userId"}>
                    <Card.Img style={{ height: '20rem', width: 'auto', objectFit: 'cover' }} variant="top" src={imageSource ? imageSource : "https://www.cooperhewitt.org/wp-content/uploads/2018/07/20914_472d45b4ae377c5f_b1.jpg"} /> 
                    <Card.Body>
                        <Row xs={2}>
                            <Col xs={9}>
                                <Card.Link style={{ textDecoration: 'none', color: 'white' }} href={`profile/${userId}`}>
                                    <Card.Title>{username}</Card.Title>
                                    <Card.Title>Hello</Card.Title>
                                    <Card.Subtitle>{firstName}</Card.Subtitle>
                                    <Card.Text>{about}</Card.Text>
                                </Card.Link>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '1rem' }} xs={2}>
                        </Row>
                    </Card.Body>
                </Card>
            );
        }
    }
}