import { Component, Fragment } from "react";
import { PostContainer } from "./Post.styles";
import { Badge, Button, Card, Row } from "react-bootstrap";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Globe, Person, Rocket } from 'react-bootstrap-icons';
import { BadgeContainer } from "../Pilots/Pilots.styles";

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

const pilots: IPost[] = [
    {
        postId: 1,
        postValue: "marauder",
        about: "I'm the best to ever do it, bitch. And you the best at never doing shit",
        mediaLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        dateCreated: new Date(1478708162000),
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        mediaLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        dateCreated: new Date(1478708162000),
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        mediaLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        dateCreated: new Date(1478708162000),
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        mediaLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        dateCreated: new Date(1478708162000),
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        mediaLink: "https://www.nationalgalleries.org/sites/default/files/styles/ngs-default/public/externals/41309.jpg?itok=IzluL-UL",
        dateCreated: new Date(1478708162000),
        comments: 1,
        favorites: 10,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        mediaLink: "https://www.nationalgalleries.org/sites/default/files/styles/ngs-default/public/externals/41309.jpg?itok=IzluL-UL",
        dateCreated: new Date(1478708162000),
        comments: 1,
        favorites: 1,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        mediaLink: "https://www.nationalgalleries.org/sites/default/files/styles/ngs-default/public/externals/41309.jpg?itok=IzluL-UL",
        dateCreated: new Date(1478708162000),
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        mediaLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        dateCreated: new Date(1478708162000),
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        mediaLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        dateCreated: new Date(1478708162000),
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "programmer",
        mediaLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        dateCreated: new Date(1478708162000),
        comments: 1,
        favorites: 0,
        userId: 10
    },
    {
        postId: 1,
        postValue: "marauder",
        about: "I'm the best to ever do it, bitch. And you the best at never doing shit",
        mediaLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        dateCreated: new Date(1478708162000),
        comments: 1,
        favorites: 0,
        userId: 10
    }
]

export class PostComponent extends Component {
    state = {
        pilots: pilots
    }

    handleClick(event:  React.ChangeEvent<HTMLInputElement>) {
        const { id } = event.target;
    }
    render() {
        const { pilots } = this.state;
        return (
            <Fragment>
                <h1>Pilot Logs</h1>
                <p>Information on the galaxy documented by your fellow pioneers</p>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                    >
                        <Masonry>
                        {pilots.map(({ postValue, about, mediaLink, comments, favorites }, index) => {
                            return <PostContainer>
                                    <Card className="bg-dark" key={index}>
                                        <Card.Img src={mediaLink}/>
                                        <Card.ImgOverlay>
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
                                        </Card.ImgOverlay>
                                        <Card.Body>
                                            <Card.Text>{postValue}</Card.Text>
                                            <Card.Text>{about}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </PostContainer>
                        })}
                        </Masonry>
                    </ResponsiveMasonry>
            </Fragment>
        )
    }
}