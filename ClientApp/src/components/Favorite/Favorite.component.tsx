import { ChangeEvent, Component, Fragment } from "react";
import { FavoriteContainer } from "./Favorite.styles";
import { Badge, Button, Card, Row } from "react-bootstrap";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Globe, Person, Rocket } from 'react-bootstrap-icons';
import { BadgeContainer } from "../Pilots/Pilots.styles";

export interface IChatComment {
    chatCommentId: number;
    chatValue: string;
    mediaLink: string;
    type: string;
    dateCreated: Date;
    chatId: number;
}

export interface IPost {
    postId: number;
    postValue: string;
    about: string;
    mediaLink: string;
    dateCreated: Date;
    comments: number;
    favorites: number;
    userId: number;
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

export type Favorite = IChat | IPost;

const pilots: Favorite[] = [
    {
        postId: 1,
        postValue: "marauder",
        about: "I'm the best to ever do it, bitch. And you the best at never doing shit",
        dateCreated: new Date(1478708162000),
        mediaLink: "hello",
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        mediaLink: "hello",
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        mediaLink: "hello",
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        mediaLink: "hello",
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        mediaLink: "hello",
        comments: 1,
        favorites: 10,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        mediaLink: "hello",
        comments: 1,
        favorites: 1,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        mediaLink: "hello",
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        mediaLink: "hello",
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        mediaLink: "hello",
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        dateCreated: new Date(1478708162000),
        mediaLink: "hello",
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "I'm the best to ever do it, bitch. And you the best at never doing shit",
        dateCreated: new Date(1478708162000),
        mediaLink: "hello",
        comments: 1,
        favorites: 0,
        userId: 10
    }
]

export class FavoriteComponent extends Component {
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
                <h1>Favorites</h1>
                <p>Go over content you found useful</p>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                    >
                        <Masonry>
                        {pilots.map(({ postValue, about, comments, favorites, dateCreated }, index) => {
                            return <FavoriteContainer>
                                    <Card className="bg-dark" key={index}>
                                        {/* <Card.Img src={mediaLink}/> */}
                                        {/* <Card.ImgOverlay> */}
                                            <Card.Text>
                                                <BadgeContainer>
                                                    <Badge style={{ color: 'black' }} bg="light"><Person size={15}/></Badge>
                                                </BadgeContainer>
                                                {
                                                    comments > 0 && <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                                        <Globe size={15}/>
                                                        {' '}{comments}
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
                                        {/* </Card.ImgOverlay> */}
                                        <Card.Body>
                                            <Card.Text>{postValue}</Card.Text>
                                            <Card.Text>{about}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </FavoriteContainer>
                        })}
                        </Masonry>
                    </ResponsiveMasonry>
            </Fragment>
        )
    }
}