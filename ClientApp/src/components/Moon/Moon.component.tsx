import { Component, Dispatch, Fragment } from "react"
import { FixedMoonContainer, MoonPanelContainer } from "./Moon.styles"
import NotificationComponent from "../Notification/Notification.component"
import { RootState } from "../../store/store";
import { MoonFetchAllStart, moonFetchAllStart } from "../../store/moon/moon.action";
import { ConnectedProps, connect } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { PostContainer } from "../Post/Post.styles";
import { Badge, Card } from "react-bootstrap";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { ArrowsFullscreen } from "react-bootstrap-icons";

type MoonProps = ConnectedProps<typeof connector>;

const moons = [
    {
    id: "lune",
    englishName: "Moon",
    isPlanet: false,
    moons: null,
    perihelion: 363300,
    aphelion: 405500,
    mass: {
        massValue: 7.346
    },
    density: 3.344,
    gravity: 1.62,
    aroundPlanet: {
        planet: "terre"
    }
    },
    {
    id: "phobos",
    englishName: "Phobos",
    isPlanet: false,
    moons: null,
    perihelion: 9234,
    aphelion: 9518,
    mass: {
        massValue: 1.06
    },
    density: 1.9,
    gravity: 0.0057,
    aroundPlanet: {
        planet: "mars"
    }
    },
    {
    id: "deimos",
    englishName: "Deimos",
    isPlanet: false,
    moons: null,
    perihelion: 23456,
    aphelion: 23471,
    mass: {
        massValue: 1.4762
    },
    density: 1.75,
    gravity: 0.003,
    aroundPlanet: {
        planet: "mars"
    }
    },
    {
    id: "io",
    englishName: "Io",
    isPlanet: false,
    moons: null,
    perihelion: 420071,
    aphelion: 423529,
    mass: {
        massValue: 8.932
    },
    density: 3.53,
    gravity: 1.79,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "europe",
    englishName: "Europa",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.8
    },
    density: 3.01,
    gravity: 1.31,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "ganymede",
    englishName: "Ganymede",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.4819
    },
    density: 1.94,
    gravity: 1.428,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "callisto",
    englishName: "Callisto",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.0759
    },
    density: 1.83,
    gravity: 1.235,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "amalthee",
    englishName: "Amalthea",
    isPlanet: false,
    moons: null,
    perihelion: 181150,
    aphelion: 182840,
    mass: {
        massValue: 7.5
    },
    density: 3.1,
    gravity: 0.02,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "himalia",
    englishName: "Himalia",
    isPlanet: false,
    moons: null,
    perihelion: 9782900,
    aphelion: 13082000,
    mass: {
        massValue: 9.5
    },
    density: 1,
    gravity: 0.062,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "elara",
    englishName: "Elara",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 8
    },
    density: 1,
    gravity: 0.031,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "pasiphae",
    englishName: "Pasiphae",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 3
    },
    density: 1,
    gravity: 0.022,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "sinope",
    englishName: "Sinope",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 8
    },
    density: 1,
    gravity: 0.014,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "lysithea",
    englishName: "Lysithea",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 8
    },
    density: 1,
    gravity: 0.013,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "carme",
    englishName: "Carme",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0.017,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "ananke",
    englishName: "Ananke",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4
    },
    density: 1,
    gravity: 0.01,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "leda",
    englishName: "Leda",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 6
    },
    density: 1,
    gravity: 0.0073,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "thebe",
    englishName: "Thebe",
    isPlanet: false,
    moons: null,
    perihelion: 218000,
    aphelion: 226000,
    mass: {
        massValue: 8
    },
    density: 1,
    gravity: 0.02,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "adrastee",
    englishName: "Adrastea",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2
    },
    density: 1,
    gravity: 0.002,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "metis",
    englishName: "Metis",
    isPlanet: false,
    moons: null,
    perihelion: 127974,
    aphelion: 128026,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0.005,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "callirrhoe",
    englishName: "Callirrhoe",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 8.7
    },
    density: 1,
    gravity: 0.0031,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "themisto",
    englishName: "Themisto",
    isPlanet: false,
    moons: null,
    perihelion: 5909000,
    aphelion: 8874300,
    mass: {
        massValue: 6.9
    },
    density: 1,
    gravity: 0.0029,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "megaclite",
    englishName: "Megaclite",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "taygete",
    englishName: "Taygete",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.6
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "chaldene",
    englishName: "Chaldene",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 7.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "harpalyke",
    englishName: "Harpalyke",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.2
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "kalyke",
    englishName: "Kalyke",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.9
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "iocaste",
    englishName: "Iocaste",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.9
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "erinome",
    englishName: "Erinome",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "isonoe",
    englishName: "Isonoe",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 7.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "praxidike",
    englishName: "Praxidike",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "autonoe",
    englishName: "Autonoe",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 9
    },
    density: 1,
    gravity: 0.0015,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "thyone",
    englishName: "Thyone",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 9
    },
    density: 1,
    gravity: 0.0015,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "hermippe",
    englishName: "Hermippe",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 9
    },
    density: 1,
    gravity: 0.0015,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "aitne",
    englishName: "Aitne",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.5
    },
    density: 1,
    gravity: 0.0012,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "eurydome",
    englishName: "Eurydome",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.5
    },
    density: 1,
    gravity: 0.0012,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "euanthe",
    englishName: "Euanthe",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.5
    },
    density: 1,
    gravity: 0.0012,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "euporie",
    englishName: "Euporie",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "orthosie",
    englishName: "Orthosie",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0.00081,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "sponde",
    englishName: "Sponde",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0.00081,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "cale",
    englishName: "Kale",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0.00081,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "pasithee",
    englishName: "Pasithee",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0.00081,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "hegemone",
    englishName: "Hegemone",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "mneme",
    englishName: "Mneme",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "aoede",
    englishName: "Aoede",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 9
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "thelxinoe",
    englishName: "Thelxinoe",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "arche",
    englishName: "Arche",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.15
    },
    density: 1,
    gravity: 0.0012,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "callichore",
    englishName: "Kallichore",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "helice",
    englishName: "Helike",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 9
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "carpo",
    englishName: "Carpo",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "eukelade",
    englishName: "Eukelade",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 9
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "cyllene",
    englishName: "Cyllene",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "core",
    englishName: "Kore",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "herse",
    englishName: "Herse",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "s2003j2",
    englishName: "S/2003 J 2",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "eupheme",
    englishName: "Eupheme",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "s2003j4",
    englishName: "S/2003 J 4",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "eirene",
    englishName: "Eirene",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 9
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "s2003j9",
    englishName: "S/2003 J 9",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "s2003j10",
    englishName: "S/2003 J 10",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "s2003j12",
    englishName: "S/2003 J 12",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "philophrosyne",
    englishName: "Philophrosyne",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "s2003j16",
    englishName: "S/2003 J 16",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "s2003j18",
    englishName: "S/2003 J 18",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "s2003j19",
    englishName: "S/2003 J 19",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "s2003j23",
    englishName: "S/2003 J 23",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0.00081,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "mimas",
    englishName: "Mimas",
    isPlanet: false,
    moons: null,
    perihelion: 181770,
    aphelion: 189270,
    mass: {
        massValue: 3.79
    },
    density: 1.15,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "encelade",
    englishName: "Enceladus",
    isPlanet: false,
    moons: null,
    perihelion: 236830,
    aphelion: 239066,
    mass: {
        massValue: 1.08
    },
    density: 1.61,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "tethys",
    englishName: "Tethys",
    isPlanet: false,
    moons: null,
    perihelion: 294589,
    aphelion: 294648,
    mass: {
        massValue: 6.18
    },
    density: 0.985,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "dione",
    englishName: "Dione",
    isPlanet: false,
    moons: null,
    perihelion: 376580,
    aphelion: 378260,
    mass: {
        massValue: 1.095
    },
    density: 1.48,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "rhea",
    englishName: "Rhea",
    isPlanet: false,
    moons: null,
    perihelion: 526543,
    aphelion: 527597,
    mass: {
        massValue: 2.3
    },
    density: 1.24,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "titan",
    englishName: "Titan",
    isPlanet: false,
    moons: null,
    perihelion: 1186680,
    aphelion: 1257060,
    mass: {
        massValue: 1.3452
    },
    density: 1.88,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "hyperion",
    englishName: "Hyperion",
    isPlanet: false,
    moons: null,
    perihelion: 1466112,
    aphelion: 1535756,
    mass: {
        massValue: 5.6
    },
    density: 0.55,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "japet",
    englishName: "Iapetus",
    isPlanet: false,
    moons: null,
    perihelion: 3460068,
    aphelion: 3661612,
    mass: {
        massValue: 1.805
    },
    density: 1.09,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "phoebe",
    englishName: "Phoebe",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 8.292
    },
    density: 1.64,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "janus",
    englishName: "Janus",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.9
    },
    density: 0.63,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "epimethee",
    englishName: "Epimetheus",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 5.3
    },
    density: 0.64,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "helene",
    englishName: "Helene",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: null,
    density: 1.3,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "telesto",
    englishName: "Telesto",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "calypso",
    englishName: "Calypso",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 6.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "atlas",
    englishName: "Atlas",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 7
    },
    density: 0.5,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "promethee",
    englishName: "Prometheus",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.6
    },
    density: 0.48,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "pandore",
    englishName: "Pandora",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.4
    },
    density: 0.49,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "pan",
    englishName: "Pan",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.95
    },
    density: 0.42,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "ymir",
    englishName: "Ymir",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 3.97
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "paaliaq",
    englishName: "Paaliaq",
    isPlanet: false,
    moons: null,
    perihelion: 6908035,
    aphelion: 23139965,
    mass: {
        massValue: 7.25
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "tarvos",
    englishName: "Tarvos",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "ijiraq",
    englishName: "Ijiraq",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.18
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "suttungr",
    englishName: "Suttungr",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "kiviuq",
    englishName: "Kiviuq",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.79
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "mundilfari",
    englishName: "Mundilfari",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "albiorix",
    englishName: "Albiorix",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.23
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "skathi",
    englishName: "Skathi",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 3.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "erriapo",
    englishName: "Erriapus",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 6.8
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "siarnaq",
    englishName: "Siarnaq",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.35
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "thrymr",
    englishName: "Thrymr",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "narvi",
    englishName: "Narvi",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "methone",
    englishName: "Methone",
    isPlanet: false,
    moons: null,
    perihelion: 194421,
    aphelion: 194459,
    mass: {
        massValue: 2
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "pallene",
    englishName: "Pallene",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 6
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "pollux",
    englishName: "Polydeuces",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "daphnis",
    englishName: "Daphnis",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 0.34,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "aegir",
    englishName: "Aegir",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "bebhionn",
    englishName: "Bebhionn",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "bergelmir",
    englishName: "Bergelmir",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "bestla",
    englishName: "Bestla",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "farbauti",
    englishName: "Farbauti",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 9
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "fenrir",
    englishName: "Fenrir",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "fornjot",
    englishName: "Fornjot",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "hati",
    englishName: "Hati",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "hyrrokkin",
    englishName: "Hyrrokkin",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 3.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "kari",
    englishName: "Kari",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "loge",
    englishName: "Loge",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "skoll",
    englishName: "Skoll",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "surtur",
    englishName: "Surtur",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "anthe",
    englishName: "Anthe",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "jarnsaxa",
    englishName: "Jarnsaxa",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "greip",
    englishName: "Greip",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "tarqeq",
    englishName: "Tarqeq",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "egeon",
    englishName: "Aegaeon",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "s2004s7",
    englishName: "S/2004 S 7",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "s2004s12",
    englishName: "S/2004 S 12",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 9
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "s2004s13",
    englishName: "S/2004 S 13",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "s2004s17",
    englishName: "S/2004 S 17",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "s2006s1",
    englishName: "S/2006 S 1",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "s2006s3",
    englishName: "S/2006 S 3",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "s2007s2",
    englishName: "S/2007 S 2",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "s2007s3",
    englishName: "S/2007 S 3",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "s2009s1",
    englishName: "S/2009 S 1",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "ariel",
    englishName: "Ariel",
    isPlanet: false,
    moons: null,
    perihelion: 190670,
    aphelion: 191130,
    mass: {
        massValue: 12.9
    },
    density: 1.59,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "umbriel",
    englishName: "Umbriel",
    isPlanet: false,
    moons: null,
    perihelion: 265100,
    aphelion: 267500,
    mass: {
        massValue: 12.2
    },
    density: 1.46,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "titania",
    englishName: "Titania",
    isPlanet: false,
    moons: null,
    perihelion: 435800,
    aphelion: 436800,
    mass: {
        massValue: 34.2
    },
    density: 1.66,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "oberon",
    englishName: "Oberon",
    isPlanet: false,
    moons: null,
    perihelion: 582702,
    aphelion: 584336,
    mass: {
        massValue: 28.8
    },
    density: 1.56,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "miranda",
    englishName: "Miranda",
    isPlanet: false,
    moons: null,
    perihelion: 129703,
    aphelion: 130041,
    mass: {
        massValue: 6.6
    },
    density: 1.2,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "cordelia",
    englishName: "Cordelia",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "ophelia",
    englishName: "Ophelia",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 5.4
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "bianca",
    englishName: "Bianca",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 9.2
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "cressida",
    englishName: "Cressida",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 3.4
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "desdemona",
    englishName: "Desdemona",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.8
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "juliet",
    englishName: "Juliet",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 5.6
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "portia",
    englishName: "Portia",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.7
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "rosalind",
    englishName: "Rosalind",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 0.25
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "belinda",
    englishName: "Belinda",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.9
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "puck",
    englishName: "Puck",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.9
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "caliban",
    englishName: "Caliban",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "sycorax",
    englishName: "Sycorax",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "prospero",
    englishName: "Prospero",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 8.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "setebos",
    englishName: "Setebos",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 7.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "stephano",
    englishName: "Stephano",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2.2
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "trinculo",
    englishName: "Trinculo",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 3.9
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "francisco",
    englishName: "Francisco",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 7.2
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "margaret",
    englishName: "Margaret",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 5.4
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "ferdinand",
    englishName: "Ferdinand",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 5.4
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "perdita",
    englishName: "Perdita",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.8
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "mab",
    englishName: "Mab",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "cupid",
    englishName: "Cupid",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 3.8
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "uranus"
    }
    },
    {
    id: "triton",
    englishName: "Triton",
    isPlanet: false,
    moons: null,
    perihelion: 354753,
    aphelion: 354765,
    mass: {
        massValue: 2.14
    },
    density: 2.05,
    gravity: 0.78,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "nereide",
    englishName: "Nereid",
    isPlanet: false,
    moons: null,
    perihelion: 1372000,
    aphelion: 9655000,
    mass: {
        massValue: 3
    },
    density: 1,
    gravity: 0.071,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "naiade",
    englishName: "Naiad",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2
    },
    density: 1,
    gravity: 0.01,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "thalassa",
    englishName: "Thalassa",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4
    },
    density: 1,
    gravity: 0.013,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "despina",
    englishName: "Despina",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2
    },
    density: 1,
    gravity: 0.023,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "galatee",
    englishName: "Galatea",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2
    },
    density: 1,
    gravity: 0.03,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "larissa",
    englishName: "Larissa",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 5
    },
    density: 1,
    gravity: 0.034,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "protee",
    englishName: "Proteus",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 5
    },
    density: 1,
    gravity: 0.075,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "halimede",
    englishName: "Halimede",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2
    },
    density: 1,
    gravity: 0.01,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "psamathee",
    englishName: "Psamathe",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "sao",
    englishName: "Sao",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0.01,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "laomedie",
    englishName: "Laomedeia",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0.01,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "neso",
    englishName: "Neso",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "neptune"
    }
    },
    {
    id: "charon",
    englishName: "Charon",
    isPlanet: false,
    moons: null,
    perihelion: 19587,
    aphelion: 19595,
    mass: {
        massValue: 1.58
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "pluton"
    }
    },
    {
    id: "nix",
    englishName: "Nix",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "pluton"
    }
    },
    {
    id: "hydra",
    englishName: "Hydra",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 4.8
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "pluton"
    }
    },
    {
    id: "namaka",
    englishName: "Namaka",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.79
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "haumea"
    }
    },
    {
    id: "hiiaka",
    englishName: "Hiʻiaka",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.78
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "haumea"
    }
    },
    {
    id: "dysnomie",
    englishName: "Dysnomia",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 145
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "eris"
    }
    },
    {
    id: "dia",
    englishName: "Dia",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 9
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "s2004s3",
    englishName: "S/2004 S 3",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "s2004s4",
    englishName: "S/2004 S 4",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "s2004s6",
    englishName: "S/2004 S 6",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "saturne"
    }
    },
    {
    id: "s2010j1",
    englishName: "S/2010 J 1",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "s2010j2",
    englishName: "S/2010 J 2",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "jupiter"
    }
    },
    {
    id: "ceres",
    englishName: "1 Ceres",
    isPlanet: false,
    moons: null,
    perihelion: 382620000,
    aphelion: 445410000,
    mass: {
        massValue: 9.393
    },
    density: 2.161,
    gravity: 0.28,
    aroundPlanet: null
    },
    {
    id: "hebe",
    englishName: "6 Hebe",
    isPlanet: false,
    moons: null,
    perihelion: 289958000,
    aphelion: 435960000,
    mass: {
        massValue: 6.7
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "lempo",
    englishName: "47171 Lempo",
    isPlanet: false,
    moons: null,
    perihelion: 4580000000,
    aphelion: 7185000000,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "petitprince",
    englishName: "The Little Prince",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 1.2
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "eugenia"
    }
    },
    {
    id: "pulcova",
    englishName: "762 Pulcova",
    isPlanet: false,
    moons: null,
    perihelion: 427401116,
    aphelion: 517758230,
    mass: {
        massValue: 2.6
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "toutatis",
    englishName: "4179 Toutatis",
    isPlanet: false,
    moons: null,
    perihelion: 137739000,
    aphelion: 616914000,
    mass: {
        massValue: 50
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "quaoar",
    englishName: "50000 Quaoar",
    isPlanet: false,
    moons: [
        {
        moon: "Weywot"
        }
    ],
    perihelion: 6266487000,
    aphelion: 6711620000,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "steins",
    englishName: "2867 Šteins",
    isPlanet: false,
    moons: null,
    perihelion: 30867000,
    aphelion: 405132000,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "eris",
    englishName: "136199 Eris",
    isPlanet: false,
    moons: [
        {
        moon: "Dysnomie"
        }
    ],
    perihelion: 5765732799,
    aphelion: 14594512904,
    mass: {
        massValue: 1.66
    },
    density: 2.52,
    gravity: 0.82,
    aroundPlanet: null
    },
    {
    id: "astree",
    englishName: "5 Astraea",
    isPlanet: false,
    moons: null,
    perihelion: 310509000,
    aphelion: 459245000,
    mass: {
        massValue: 1.2
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "pholus",
    englishName: "5145 Pholus",
    isPlanet: false,
    moons: null,
    perihelion: 1302945000,
    aphelion: 4807509000,
    mass: {
        massValue: 7.5
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "castalia",
    englishName: "4769 Castalia",
    isPlanet: false,
    moons: null,
    perihelion: 82190000,
    aphelion: 235916000,
    mass: {
        massValue: 1.3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "remus",
    englishName: "Remus",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 2
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "sylvia"
    }
    },
    {
    id: "hector",
    englishName: "624 Hektor",
    isPlanet: false,
    moons: null,
    perihelion: 762145000,
    aphelion: 800220000,
    mass: {
        massValue: 1.4
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "kleopatra",
    englishName: "216 Kleopatra",
    isPlanet: false,
    moons: [
        {
        moon: "Alexhélios"
        },
        {
        moon: "Cléoséléné"
        }
    ],
    perihelion: 312544000,
    aphelion: 523049000,
    mass: {
        massValue: 3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "cruithne",
    englishName: "3753 Cruithne",
    isPlanet: false,
    moons: null,
    perihelion: 72415000,
    aphelion: 226104000,
    mass: {
        massValue: 1.3
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "junon",
    englishName: "3 Juno",
    isPlanet: false,
    moons: null,
    perihelion: 328870000,
    aphelion: 502080000,
    mass: {
        massValue: 2.82
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "hygie",
    englishName: "10 Hygiea",
    isPlanet: false,
    moons: null,
    perihelion: 413378000,
    aphelion: 525311000,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "lutetia",
    englishName: "21 Lutetia",
    isPlanet: false,
    moons: null,
    perihelion: 304600000,
    aphelion: 423955000,
    mass: {
        massValue: 1.7
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "mathilde",
    englishName: "253 Mathilde",
    isPlanet: false,
    moons: null,
    perihelion: 290640000,
    aphelion: 501170000,
    mass: {
        massValue: 1.03
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "iris",
    englishName: "7 Iris",
    isPlanet: false,
    moons: null,
    perihelion: 274729000,
    aphelion: 439310000,
    mass: {
        massValue: 8.4
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "eros",
    englishName: "433 Eros",
    isPlanet: false,
    moons: null,
    perihelion: 169548000,
    aphelion: 266762000,
    mass: {
        massValue: 7.2
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "vanth",
    englishName: "Vanth",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: {
        massValue: 3.6
    },
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "orcus"
    }
    },
    {
    id: "sedna",
    englishName: "90377 Sedna",
    isPlanet: false,
    moons: null,
    perihelion: 11378031000,
    aphelion: 139941508000,
    mass: {
        massValue: 1
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "chariklo",
    englishName: "10199 Chariklo",
    isPlanet: false,
    moons: null,
    perihelion: 1962000000,
    aphelion: 2799000000,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "sylvia",
    englishName: "87 Sylvia",
    isPlanet: false,
    moons: [
        {
        moon: "Rémus"
        },
        {
        moon: "Romulus"
        }
    ],
    perihelion: 48540000,
    aphelion: 563729000,
    mass: {
        massValue: 1.478
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "dactyl",
    englishName: "(243) Ida I Dactyl",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "ida"
    }
    },
    {
    id: "orcus",
    englishName: "90482 Orcus",
    isPlanet: false,
    moons: [
        {
        moon: "Vanth"
        }
    ],
    perihelion: 4535800000,
    aphelion: 7188170000,
    mass: {
        massValue: 7
    },
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "pluton",
    englishName: "Pluto",
    isPlanet: false,
    moons: [
        {
        moon: "Charon"
        },
        {
        moon: "Nix"
        },
        {
        moon: "Hydra"
        },
        {
        moon: "Kerberos"
        },
        {
        moon: "Styx"
        }
    ],
    perihelion: 4436756954,
    aphelion: 7376124302,
    mass: {
        massValue: 1.303
    },
    density: 1.89,
    gravity: 0.62,
    aroundPlanet: null
    },
    {
    id: "damocles",
    englishName: "5335 Damocles",
    isPlanet: false,
    moons: null,
    perihelion: 236400000,
    aphelion: 3304500000,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: null
    },
    {
    id: "romulus",
    englishName: "Romulus",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "sylvia"
    }
    },
    {
    id: "alexhelios",
    englishName: "Alexhelios",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "kleopatra"
    }
    },
    {
    id: "cleoselene",
    englishName: "Cleoselene",
    isPlanet: false,
    moons: null,
    perihelion: 0,
    aphelion: 0,
    mass: null,
    density: 1,
    gravity: 0,
    aroundPlanet: {
        planet: "kleopatra"
    }
    }
]

export class Moon extends Component {
    render() {
        return (
            <Fragment>
                <FixedMoonContainer className="fixed-top">
                    <MoonPanelContainer>
                        <h1>Moons</h1>
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                        >
                            <Masonry>
                            {moons?.map(({ englishName, perihelion, aphelion, mass, density, gravity, aroundPlanet }, index) => {
                                return <PostContainer key={index}>
                                    <Card className="bg-dark" key={index}>
                                        <Card.Img src={"https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                                        <Card.ImgOverlay>
                                            <BadgeContainer>
                                                <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} size={15}/></Badge>
                                            </BadgeContainer>
                                        </Card.ImgOverlay>
                                        <Card.Body>
                                            <Card.Text>{englishName}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </PostContainer>
                            })}
                            </Masonry>
                        </ResponsiveMasonry>
                    </MoonPanelContainer>
                </FixedMoonContainer>
                <NotificationComponent/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        moons: state.moon
    }
};

const mapDispatchToProps = (dispatch: Dispatch<MoonFetchAllStart>) => ({
    getMoons: () => dispatch(moonFetchAllStart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Moon);