import { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { User } from "../../store/user/user.types";
import { MessageComment } from "../../store/messagecomment/messagecomment.types";
import { ArrowBarRight, Globe, Moon, PersonBadge } from "react-bootstrap-icons";

interface ISearchProps {
    users: User[];
    messages: MessageComment[];
}

export class MessageList extends Component<ISearchProps> {
    constructor(props: ISearchProps) {
        super(props);
    }

    render() {
        const { users, messages } = this.props;

        return (
            <div className='card-list'>
                {users.length > 0 && <div style={{ margin: ".5rem", color: "black" }}>
                    Users
                </div>}
                {users.slice(0,5).map(user => (
                    <Card bg="dark" style={{ margin: ".2rem", position: "relative" }} key={user.userId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body>{user.username}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/profile/${user.userId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <PersonBadge size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </Card>
                ))}
                {messages.length > 0 && <div style={{ margin: ".5rem", color: "black" }}>
                    Messages
                </div>}
                {messages.slice(0,5).map(message => (
                    <Card bg="dark" style={{ margin: ".2rem", position: "relative" }} key={message.messageId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body>{message.messageValue}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/singleplanet/${message.messageId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <Globe size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </div>
        )
    }
};