import { Component, Fragment } from "react";
import { BadgeContainer, PilotContainer } from "./Pilots.styles";
import { Badge, Button, Card, Row } from "react-bootstrap";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Globe, Person, Rocket } from 'react-bootstrap-icons';

export interface IPilot {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    about: string;
    imageLink: string;
    planets: number;
    followers: number;
}

const pilots: IPilot[] = [
    {
        userId: 1,
        username: "marauder",
        firstName: "dune",
        lastName: "major",
        about: "I'm the best to ever do it, bitch. And you the best at never doing shit",
        imageLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        planets: 1,
        followers: 0
    },
    {
        userId: 1,
        username: "marauder",
        firstName: "dune",
        lastName: "major",
        about: "programmer",
        imageLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        planets: 1,
        followers: 0
    },
    {
        userId: 1,
        username: "marauder",
        firstName: "dune",
        lastName: "major",
        about: "programmer",
        imageLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        planets: 1,
        followers: 0
    },
    {
        userId: 1,
        username: "marauder",
        firstName: "dune",
        lastName: "major",
        about: "programmer",
        imageLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        planets: 1,
        followers: 0
    },
    {
        userId: 1,
        username: "marauder",
        firstName: "dune",
        lastName: "major",
        about: "programmer",
        imageLink: "https://www.nationalgalleries.org/sites/default/files/styles/ngs-default/public/externals/41309.jpg?itok=IzluL-UL",
        planets: 1,
        followers: 10
    },
    {
        userId: 1,
        username: "marauder",
        firstName: "dune",
        lastName: "major",
        about: "programmer",
        imageLink: "https://www.nationalgalleries.org/sites/default/files/styles/ngs-default/public/externals/41309.jpg?itok=IzluL-UL",
        planets: 1,
        followers: 1
    },
    {
        userId: 1,
        username: "marauder",
        firstName: "dune",
        lastName: "major",
        about: "programmer",
        imageLink: "https://www.nationalgalleries.org/sites/default/files/styles/ngs-default/public/externals/41309.jpg?itok=IzluL-UL",
        planets: 1,
        followers: 0
    },
    {
        userId: 1,
        username: "marauder",
        firstName: "dune",
        lastName: "major",
        about: "programmer",
        imageLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        planets: 1,
        followers: 0
    },
    {
        userId: 1,
        username: "marauder",
        firstName: "dune",
        lastName: "major",
        about: "programmer",
        imageLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        planets: 1,
        followers: 0
    },
    {
        userId: 1,
        username: "marauder",
        firstName: "dune",
        lastName: "major",
        about: "programmer",
        imageLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        planets: 1,
        followers: 0
    },
    {
        userId: 1,
        username: "marauder",
        firstName: "dune",
        lastName: "major",
        about: "I'm the best to ever do it, bitch. And you the best at never doing shit",
        imageLink: "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C1990%2C995&poi=%5B900%2C378%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F01%2F17%2FThe-Mandalorian-0117.jpg",
        planets: 1,
        followers: 0
    }
]

export class Pilots extends Component {
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
                <h1>Pilots</h1>
                <p>Take a look at your fellow Pilots</p>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                    >
                        <Masonry>
                        {pilots.map(({ username, about, imageLink, planets, followers }, index) => {
                            return <PilotContainer>
                                    <Card className="bg-dark" key={index}>
                                        <Card.Img src={imageLink}/>
                                        <Card.ImgOverlay>
                                            <Card.Text>
                                                <BadgeContainer>
                                                    <Badge style={{ color: 'black' }} bg="light"><Person size={15}/></Badge>
                                                </BadgeContainer>
                                                {
                                                    planets > 0 && <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                                        <Globe size={15}/>
                                                        {' '}{planets}
                                                        </Badge>
                                                    </BadgeContainer>
                                                }
                                                {
                                                    followers > 0 && <BadgeContainer>
                                                        <Badge style={{ color: 'black' }} bg="light">
                                                        <Rocket size={15}/>
                                                        {' '}{followers}
                                                        </Badge>
                                                    </BadgeContainer>
                                                }
                                            </Card.Text>
                                        </Card.ImgOverlay>
                                        <Card.Body>
                                            <Card.Text>{username}</Card.Text>
                                            <Card.Text>{about}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </PilotContainer>
                        })}
                        </Masonry>
                    </ResponsiveMasonry>
            </Fragment>
        )
    }
}