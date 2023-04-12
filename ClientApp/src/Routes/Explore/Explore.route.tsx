import { Component, Fragment } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { ExploreContainer, ExploreFontContainer, ExplorePanel, ImageContainer, ImageOverlayContainer } from "./Explore.styles";

const contentArray = [
    {
        type: "Planets",
        path: "/planets",
        media_location_url: "https://i.imgur.com/BEIcwEa.jpg",
        id: 1
    },
    {
        type: "Crew",
        path: "/crew",
        media_location_url: "https://i.imgur.com/ijeK4AL.jpg",
        id: 2
    },
    {
        type: "Profiles",
        path: "/profiles",
        media_location_url: "https://i.imgur.com/HxNGjRH.jpg",
        id: 3
    },
    {
        type: "Posts",
        path: "/posts",
        media_location_url: "https://i.imgur.com/7Nxg9uE.jpg",
        id: 4
    },
    {
        type: "Chats",
        path: "/chats",
        media_location_url: "https://i.imgur.com/WsUbtP6.jpg",
        id: 5
    },
    {
        type: "News",
        path: "/news",
        media_location_url: "https://i.imgur.com/ceyA482.jpg",
        id: 6
    }
]

export class Explore extends Component {
    render() {
        return(
            <Fragment>
                <h1>Explore</h1>
                <Row xs={2} key="groups">
                    {contentArray?.map(({ id, media_location_url, type, path }) => (
                        <Col key={id}>
                            <Card.Link  href={`${path}`}>
                                <ExplorePanel>
                                    <Card
                                        className="bg-dark"
                                        key={id}
                                    >
                                        <ImageContainer>
                                            <Card.Img style={{ position: 'relative', borderRadius: ".5rem", width: "100%", height: '25rem', objectFit: "cover" }} src={media_location_url} alt={type} />
                                        </ImageContainer>
                                        <Card.ImgOverlay >
                                            <ExploreFontContainer>
                                                <Card.Title id='explorefont'>{type}</Card.Title>
                                            </ExploreFontContainer>
                                        </Card.ImgOverlay>
                                    </Card>
                                </ExplorePanel>
                            </Card.Link>
                        </Col>
                    ))}
                </Row>
            </Fragment>
        );
    }
}