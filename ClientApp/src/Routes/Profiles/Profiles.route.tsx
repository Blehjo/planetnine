import { Component, Fragment } from "react";
import PilotsComponent, { Pilots } from "../../components/Pilots/Pilots.component";

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

export class Profiles extends Component {
    render() {
        return (
            <Fragment>
                <PilotsComponent/>
            </Fragment>
        )
    }
}