import { Component, Fragment } from "react";
import { Col, Row } from "react-bootstrap";

import { ItemsContainer, VitalsContainer } from "./Vitals.styles";
import PilotDashComponent from "../../components/PilotDash/PilotDash.component";
import MessageComponent from "../../components/Message/Message.component";
import NotificationComponent from "../../components/Notification/Notification.component";
import CrewComponent from "../../components/Crew/Crew.component";
import PlanetDashComponent from "../../components/PlanetDash/PlanetDash.component";


export class Vitals extends Component {
    render() {

        return (
            <Fragment>
                <VitalsContainer className="fixed-top">
                <ItemsContainer>
                <Row xs={2} sm={1} md={1} lg={2} style={{ marginTop: '1rem' }}>
                    <Col md={12}>
                        <PlanetDashComponent/>
                    </Col>
                    <Col md={12}>
                        <CrewComponent/>
                    </Col>
                </Row>
                <Row xs={2} sm={1} md={1} lg={2} style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                    <Col md={12}>
                        <MessageComponent/>
                    </Col>
                    <Col md={12}>
                        <PilotDashComponent/>
                    </Col>
                </Row>
                </ItemsContainer>
                </VitalsContainer>
                <NotificationComponent/>
            </Fragment>
        )
    }
}