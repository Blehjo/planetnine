import { Component, Fragment } from "react";

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
            <Fragment/>
            )
    }
}