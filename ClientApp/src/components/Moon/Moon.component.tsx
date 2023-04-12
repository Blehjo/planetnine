import { Component, Fragment } from "react"
import { FixedMoonContainer, MoonPanelContainer } from "./Moon.styles"
import NotificationComponent from "../Notification/Notification.component"


export class Moon extends Component {
    render() {
        return (
            <Fragment>
                <FixedMoonContainer className="fixed-top">
                    <MoonPanelContainer>
                        <h1>Moons</h1>
                    </MoonPanelContainer>
                </FixedMoonContainer>
                <NotificationComponent/>
            </Fragment>
        )
    }
}