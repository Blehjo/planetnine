import { Component, Fragment } from "react";
import { Notification } from "../../components/Notification/Notification.component";
import { Col, Row } from "react-bootstrap";
import { Crew } from "../../components/Crew/Crew.component";

import { VitalsContainer } from "./Vitals.styles";
import { PlanetDash } from "../../components/PlanetDash/PlanetDash.component";
import PilotDashComponent from "../../components/PilotDash/PilotDash.component";
import MessageComponent from "../../components/Message/Message.component";


export class Vitals extends Component {
    render() {

        return (
            <Fragment>
                <VitalsContainer>
                <Row xs={2} style={{ marginTop: '1rem' }}>
                    <Col xs={6}>
                        <PilotDashComponent/>
                    </Col>
                    <Col xs={6}>
                        <Crew/>
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
                <Notification/>
            </Fragment>
        )
    }
}