import { Component } from "react";
import { MoonContainer } from "./Moons.styles";
import { Notification } from "../../components/Notification/Notification.component";
import { Moon } from "../../components/Moon/Moon.component";

export class Moons extends Component {
    render() {
        return (
            <MoonContainer>
                <Moon/>
            </MoonContainer>
        )
    }
}