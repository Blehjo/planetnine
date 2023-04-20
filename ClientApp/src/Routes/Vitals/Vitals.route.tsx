import { Component, Fragment } from "react";
import { Col, Row } from "react-bootstrap";

import { VitalsContainer } from "./Vitals.styles";
import { PlanetDash } from "../../components/PlanetDash/PlanetDash.component";
import PilotDashComponent from "../../components/PilotDash/PilotDash.component";
import MessageComponent from "../../components/Message/Message.component";
import NotificationComponent from "../../components/Notification/Notification.component";
import CrewComponent from "../../components/Crew/Crew.component";


export class Vitals extends Component {
    render() {

        return (
            <Fragment>
                <VitalsContainer className="fixed-top">
                <Row xs={2} style={{ marginTop: '1rem' }}>
                    <Col xs={6}>
                        <PilotDashComponent/>
                    </Col>
                    <Col xs={6}>
                        <CrewComponent/>
                    </Col>
                </Row>
                <Row xs={2} style={{ marginTop: '1rem' }}>
                    <Col xs={6}>
                        <MessageComponent/>
                    </Col>
                    <Col xs={6}>
                        <PlanetDash/>
                    </Col>
                </Row>
                </VitalsContainer>
                <NotificationComponent/>
            </Fragment>
        )
    }
}