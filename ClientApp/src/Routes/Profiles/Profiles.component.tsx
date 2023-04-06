import { Component, Fragment } from "react";
import { ProfileContainer } from "./Profiles.styles";
import { Card, Row } from "react-bootstrap";

export interface IProfile {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    about: string;
    imageLink: string;
    planets: number;
    followers: number;
}

const pilots: IProfile[] = [
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

export class Profiles extends Component {
    state = {
        pilots: pilots
    }
    render() {
        const { pilots } = this.state;
        return (
            <Fragment>
                <h1>Pilots</h1>
                <p>Take a look at your fellow Pilots</p>
                <ProfileContainer>
                    <Row xs={4}>
                    {pilots.map(({ username, firstName, about, imageLink, planets, followers }, index) => {
                        return <Card className="bg-dark" key={index}>
                                <Card.Img src={imageLink}/>
                                <Card.Body>
                                <Card.Text>{username}</Card.Text>
                                    <Card.Text>{about}</Card.Text>
                                </Card.Body>
                            </Card>
                    })}
                    </Row>
                </ProfileContainer>
            </Fragment>
        )
    }
}