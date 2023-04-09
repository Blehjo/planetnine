import { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { User } from "../../store/user/user.types";

type ProfileCardProps = User;

export class ProfileCard extends Component {
    constructor(props: ProfileCardProps) {
        super(props)
    }

    render() {
        console.log("Props: ", this.props)
        return (
            <Card style={{ color: 'white' }} className="bg-dark" key={"userId"}>
                {/* <Card.Img style={{ height: '20rem', width: 'auto', objectFit: 'cover' }} variant="top" src={profileImage ? imageSource : "https://www.cooperhewitt.org/wp-content/uploads/2018/07/20914_472d45b4ae377c5f_b1.jpg"} />  */}
                {/* <Card.Body>
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