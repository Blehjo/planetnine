import { Component, Fragment } from "react"
import { Notification } from "../../components/Notification/Notification.component"
import { Col, Row } from "react-bootstrap"
import { Crew } from "../../components/Crew/Crew.component"
import { Message } from "../../components/Message/Message.component"
import { Planets } from "../../components/Planets/Planets.component"
import { PilotDash } from "../../components/PilotDash/PilotDash.component"


export class Vitals extends Component {
    render() {

        return (
            <Fragment>
                <Row xs={2} style={{ paddingRight: '25rem', marginTop: '1rem' }}>
                    <Col xs={6}>
                        <PilotDash/>
                    </Col>
                    <Col xs={6}>
                        <Crew/>
                    </Col>
                </Row>
                <Row xs={2} style={{ paddingRight: '25rem', marginTop: '1rem' }}>
                    <Col xs={6}>
                        <Message/>
                    </Col>
                    <Col xs={6}>
                        <Planets/>
                    </Col>
                </Row>
                <Notification/>
            </Fragment>
        )
    }
}