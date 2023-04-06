import { Component, Fragment, ChangeEvent } from "react";
import { ChatContainer } from "./Chat.styles";
import { Badge, Button, Card, Row } from "react-bootstrap";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Globe, Person, Rocket } from 'react-bootstrap-icons';
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { utcConverter } from "../../utils/date/date.utils";

export interface IChatComment {
    chatCommentId: number;
    chatValue: string;
    mediaLink: string;
    type: string;
    dateCreated: Date;
    chatId: number;
}

export interface IChat {
    postId: number;
    postValue: string;
    about: string;
    dateCreated: Date;
    comments: number;
    chatComments: IChatComment[];
    favorites: number;
    userId: number;
}

const pilots: IChat[] = [
    {
        postId: 1,
        postValue: "marauder",
        about: "I'm the best to ever do it, bitch. And you the best at never doing shit",
        dateCreated: new Date(1478708162000),
        comments: 1,
        chatComments: [],
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        comments: 1,
        chatComments: [],
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        comments: 1,
        chatComments: [],
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        comments: 1,
        chatComments: [],
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        comments: 1,
        chatComments: [],
        favorites: 10,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        comments: 1,
        chatComments: [],
        favorites: 1,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        comments: 1,
        chatComments: [],
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        comments: 1,
        chatComments: [],
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        comments: 1,
        chatComments: [],
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        comments: 1,
        chatComments: [],
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "I'm the best to ever do it, bitch. And you the best at never doing shit",
        dateCreated: new Date(1478708162000),
        comments: 1,
        chatComments: [],
        favorites: 0,
        userId: 10
    }
]

export class ChatComponent extends Component {
    state = {
        pilots: pilots
    }

    handleClick(event:  ChangeEvent<HTMLInputElement>) {
        const { id } = event.target;
    }
    render() {
        const { pilots } = this.state;
        return (
            <Fragment>
                <h1>Chat Manifests</h1>
                <p>Information on the galaxy documented by your fellow pioneers</p>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                    >
                        <Masonry>
                        {pilots.map(({ postValue, about, comments, chatComments, favorites, dateCreated }, index) => {
                            return <ChatContainer>
                                    <Card className="bg-dark" key={index}>
                                            <Card.Text>
                                                <BadgeContainer>
                                                    <Badge style={{ color: 'black' }} bg="light"><Person size={15}/></Badge>
                                                </BadgeContainer>
                                                {
                                                    chatComments.length > 0 && <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                                        <Globe size={15}/>
                                                        {' '}{chatComments.length}
                                                        </Badge>
                                                    </BadgeContainer>
                                                }
                                                {
                                                    favorites > 0 && <BadgeContainer>
                                                        <Badge style={{ color: 'black' }} bg="light">
                                                        <Rocket size={15}/>
                                                        {' '}{favorites}
                                                        </Badge>
                                                    </BadgeContainer>
                                                }
                                            </Card.Text>
                                        <Card.Body>
                                            <Card.Text>{postValue}</Card.Text>
                                            <Card.Text>{about}</Card.Text>
                                            <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </ChatContainer>
                        })}
                        </Masonry>
                    </ResponsiveMasonry>
            </Fragment>
        )
    }
}