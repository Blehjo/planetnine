import { Component } from "react"
import { PlanetContainer } from "./Planets.styles"
import { Notification } from "../../components/Notification/Notification.component"
import { Planet } from "../../components/Planet/Planet.component"

export class Planets extends Component {
    render() {
        return (
            <PlanetContainer>
                <Planet/>
            </PlanetContainer>
        )
    }
}