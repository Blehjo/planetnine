import { Fragment } from "react"
import { Notification } from "../../components/Notification/Notification.component"
import { Pilots } from "../../components/Pilots/Pilots.component"
import { Col, Row } from "react-bootstrap"

export const Vitals = () => {
    return (
        <Fragment>
            <Row xs={2} style={{ paddingRight: '25rem', marginTop: '1rem' }}>
                <Col xs={6}>
                    <Pilots/>
                </Col>
                <Col xs={6}>
                    <Pilots/>
                </Col>
            </Row>
            <Row xs={2} style={{ paddingRight: '25rem', marginTop: '1rem' }}>
                <Col xs={6}>
                    <Pilots/>
                </Col>
                <Col xs={6}>
                    <Pilots/>
                </Col>
            </Row>
            <Notification/>
        </Fragment>
    )
}