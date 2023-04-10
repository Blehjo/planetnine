import { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { ProfileProps } from "../Profile/Profile.component";

export class ProfileCard extends Component<ProfileProps> {

    render() {
        const { currentUser } = this.props;
        return (
            <Card style={{ color: 'white' }} className="bg-dark" key={"userId"}>
                <Card.Img style={{ height: '20rem', width: 'auto', objectFit: 'cover' }} variant="top" src={currentUser.currentUser?.imageSource ? currentUser.currentUser?.imageSource : "https://www.cooperhewitt.org/wp-content/uploads/2018/07/20914_472d45b4ae377c5f_b1.jpg"} /> 
                <Card.Body>
                    <Row xs={2}>
                    <Col xs={9}>
                    <Card.Link style={{ textDecoration: 'none', color: 'white' }} href={`profile/${currentUser.currentUser?.userId}`}>
                    <Card.Header>{currentUser.currentUser?.username}</Card.Header>
                    <Card.Title>{currentUser.currentUser?.firstName}</Card.Title>
                    <Card.Subtitle>{currentUser.currentUser?.about}</Card.Subtitle>
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