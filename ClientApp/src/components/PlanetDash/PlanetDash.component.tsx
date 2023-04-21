import { Component, Dispatch } from "react";
import { PlanetContainer, PlanetDashPanel } from "./PlanetDash.styles";
import { Planet } from "../../store/planet/planet.types";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { PostContainer } from "../Post/Post.styles";
import { Badge, Card } from "react-bootstrap";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { ArrowsFullscreen } from "react-bootstrap-icons";
import { RootState } from "../../store/store";
import { PlanetFetchAllStart, planetFetchAllStart } from "../../store/planet/planet.action";
import { ConnectedProps, connect } from "react-redux";
import { HeaderContainer, MarginContainer } from "../PilotDash/PilotDash.styles";
import { CardHolder } from "../Crew/Crew.styles";

const planets = [
    {
        planetName: "Uranus",
        perihelion: 2734998229,
        aphelion: 3006318143,
        mass: {},
        density: 1.27,
        gravity: 8.87,
        imageLink: "https://images.english.elpais.com/resizer/BH_KvY_lAzwSrpp8v7D55nGax8A=/1960x1470/filters:focal(2464x2210:2474x2220)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/WQ773ELGFRDOHJ46MOLRXKJ7AY.jpg",
        discoveredBy: "William Herschel"
    },
    {
        planetName: "Neptune",
        perihelion: 4459753056,
        aphelion: 4537039826,
        mass: {},
        density: 1.638,
        gravity: 11.15,
        imageLink: "https://solarsystem.nasa.gov/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbkp5IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cb7cb2868fd8b4892788893961c20975baffeb52/neptune_480x320.jpg?disposition=inline",
        discoveredBy: "Urbain Le Verrier, John Couch Adams, Johann Galle"
    },
    {
        planetName: "Jupiter",
        perihelion: 740379835,
        aphelion: 816620000,
        mass: {},
        density: 1.3262,
        gravity: 24.79,
        imageLink: "https://solarsystem.nasa.gov/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdGxyIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--229ba26c079b7122001319d5dcffec49c8d4e0cb/STSCI-H-p1936a-f-640.jpg?disposition=attachment",
        discoveredBy: ""
    },
    {
        planetName: "Mars",
        perihelion: 206700000,
        aphelion: 249200000,
        mass: {},
        density: 3.9341,
        gravity: 3.71,
        imageLink: "https://solarsystem.nasa.gov/system/stellar_items/image_files/6_mars.jpg",
        discoveredBy: ""
    },
    {
        planetName: "Mercury",
        perihelion: 46001200,
        aphelion: 69816900,
        mass: {},
        density: 5.4291,
        gravity: 3.7,
        imageLink: "https://solarsystem.nasa.gov/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc0VRIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b43e79a5b43d2063c4866ccff66bede5faff17b8/mercury_th.jpg",
        discoveredBy: ""
    },
    {
        planetName: "Saturn",
        perihelion: 1349823615,
        aphelion: 1503509229,
        mass: {},
        density: 0.6871,
        gravity: 10.44,
        imageLink: "https://solarsystem.nasa.gov/system/stellar_items/image_files/38_saturn_1600x900.jpg",
        discoveredBy: ""
    },
    {
        planetName: "Earth",
        perihelion: 147095000,
        aphelion: 152100000,
        mass: {},
        density: 5.5136,
        gravity: 9.8,
        imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Earth_from_Space.jpg/2048px-Earth_from_Space.jpg",
        discoveredBy: ""
    },
    {
        planetName: "Venus",
        perihelion: 107477000,
        aphelion: 108939000,
        mass: {},
        density: 5.243,
        gravity: 8.87,
        imageLink: "https://solarsystem.nasa.gov/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBajl5IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1771be6bd46710c30aa93cd6c3ababe23ad52681/480x320_venus.png?disposition=inline",
        discoveredBy: ""
    },

]

type PlanetDashProps = ConnectedProps<typeof connector>;

export class PlanetDash extends Component {
    render() {
        return(
            <PlanetDashPanel>
                <HeaderContainer>
                <div>Planets</div>
                </HeaderContainer>
                <CardHolder>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry>
                    {planets?.map(({ planetName, perihelion, aphelion, mass, density, gravity, imageLink, discoveredBy }, index) => {
                        return <PlanetContainer key={index}>
                            <Card className="bg-dark" key={index}>
                                <Card.Img src={imageLink ? imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                                <Card.ImgOverlay>
                                    <ArrowsFullscreen style={{ cursor: 'pointer' }} size={15}/>
                                </Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text>{planetName}</Card.Text>
                                </Card.Body>
                            </Card>
                        </PlanetContainer>
                    })}
                    </Masonry>
                </ResponsiveMasonry>
                </CardHolder>
            </PlanetDashPanel>
        );
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

export default connector(PlanetDash);