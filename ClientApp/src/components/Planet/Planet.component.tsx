import { Component, Dispatch, Fragment } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Badge, Card } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";

import { FixedContainer, PlanetPanelContainer } from "./Planet.styles";
import { RootState } from "../../store/store";
import { PlanetFetchAllStart, planetFetchAllStart } from "../../store/planet/planet.action";
import { PostContainer } from "../Post/Post.styles";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { ArrowsFullscreen } from "react-bootstrap-icons";
import NotificationComponent from "../Notification/Notification.component";

type PlanetProps = ConnectedProps<typeof connector>;

export class Planet extends Component<PlanetProps> {
    constructor(props: PlanetProps) {
        super(props);
    }

    componentDidMount(): void {
        this.props.getPlanets();
        console.log("Planets: ", this.props.planets)
    }
    render() {
        const { planets } = this.props;
        return (
            <Fragment>
                <FixedContainer className="fixed-top">
                    <PlanetPanelContainer>
                        <h1>Planets</h1>
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                        >
                            <Masonry>
                            {planets.planets?.map(({ planetName, perihelion, aphelion, planetMass, temperature, gravity, imageLink }, index) => {
                                return <PostContainer key={index}>
                                    <Card className="bg-dark" key={index}>
                                        <Card.Img src={imageLink ? imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                                        <Card.ImgOverlay>
                                            <BadgeContainer>
                                                <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15}/></Badge>
                                            </BadgeContainer>
                                        </Card.ImgOverlay>
                                        <Card.Body>
                                            <Card.Text>{planetName}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </PostContainer>
                            })}
                            </Masonry>
                        </ResponsiveMasonry>
                    </PlanetPanelContainer>
                </FixedContainer>
                <NotificationComponent/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        planets: state.planet
    }
};

const mapDispatchToProps = (dispatch: Dispatch<PlanetFetchAllStart>) => ({
    getPlanets: () => dispatch(planetFetchAllStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Planet);