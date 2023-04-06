import { Component, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { PilotDashContainer } from "./PilotDash.styles";

export class PilotDash extends Component {
    render() {
        return(
            <PilotDashContainer>
                <h1>Pilots</h1>
            </PilotDashContainer>
        );
    }
}