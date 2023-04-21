import { Component } from "react"
import { PlanetContainer } from "./Planets.styles"
import PlanetComponent from "../../components/Planet/Planet.component"

export class Planets extends Component {
    render() {
        return (
            <PlanetContainer>
                <PlanetComponent/>
            </PlanetContainer>
        )
    }
}