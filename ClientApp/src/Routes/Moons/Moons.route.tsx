import { Component } from "react";
import { MoonContainer } from "./Moons.styles";
import MoonComponent from "../../components/Moon/Moon.component";


export class Moons extends Component {
    render() {
        return (
            <MoonContainer>
                <MoonComponent/>
            </MoonContainer>
        )
    }
}