import { Component, Fragment } from "react"
import { FixedContainer, PlanetPanelContainer } from "./Planet.styles"
import { Notification } from "../Notification/Notification.component"

export class Planet extends Component {
    render() {
        return (
            <Fragment>
                <FixedContainer className="fixed-top">
                    <PlanetPanelContainer>
                        <h1>Planets</h1>
                    </PlanetPanelContainer>
                </FixedContainer>
                <Notification/>
            </Fragment>
        )
    }
}