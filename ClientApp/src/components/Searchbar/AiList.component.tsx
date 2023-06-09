import { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { User } from "../../store/user/user.types";
import { MessageComment } from "../../store/messagecomment/messagecomment.types";
import { ArrowBarRight, Globe, Moon, PersonBadge } from "react-bootstrap-icons";
import { ArtificialIntelligence } from "../../store/artificialintelligence/artificialintelligence.types";
import { Chat } from "../../store/chat/chat.types";
import { ChatComment } from "../../store/chatcomment/chatcomment.types";

interface ISearchProps {
    artificialIntelligences: ArtificialIntelligence[];
    chats: Chat[];
    chatcomments: ChatComment[];
}

export class AiList extends Component<ISearchProps> {
    constructor(props: ISearchProps) {
        super(props);
    }

    render() {
        const { artificialIntelligences, chats, chatcomments } = this.props;

        return (
            <div className='card-list'>
                {artificialIntelligences.length > 0 && <div style={{ margin: ".5rem", color: "black" }}>
                    A.I.s
                </div>}
                {artificialIntelligences.slice(0,5).map(artificialIntelligence => (
                    <Card bg="dark" style={{ margin: ".2rem", position: "relative" }} key={artificialIntelligence.artificialIntelligenceId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body>{artificialIntelligence.name}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/profile/${artificialIntelligence.userId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <PersonBadge size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </Card>
                ))}
                {chats.length > 0 && <div style={{ margin: ".5rem", color: "black" }}>
                    Chats
                </div>}
                {chats.slice(0,5).map(chat => (
                    <Card bg="dark" style={{ margin: ".2rem", position: "relative" }} key={chat.chatId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body>{chat.title}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/singleplanet/${chat.chatId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
                                    <Globe size={15}/>
                                </a>
                            </Col>
                        </Row>
                    </Card>
                ))}
                {chatcomments.length > 0 && <div style={{ margin: ".5rem", color: "black" }}>
                    Comments
                </div>}
                {chatcomments.slice(0,5).map(chatcomment => (
                    <Card bg="dark" style={{ margin: ".2rem", position: "relative" }} key={chatcomment.chatCommentId} >
                        <Row xs={2}>
                            <Col xs={10}>
                                <Card.Body>{chatcomment.chatValue}</Card.Body>
                            </Col>
                            <Col xs={2}>
                                <a href={`/singleplanet/${chatcomment.chatCommentId}`} style={{ textDecoration: 'none', color: 'black', position: "absolute", margin: "0", top: "50%", transform: "translateY(-50%)", msTransform: "translateY(-50%)" }} className="btn btn-light">
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