import { Component, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { PilotsContainer } from "./Pilots.styles";

export class Pilots extends Component {
    render() {
        return(
            <PilotsContainer>
                <h1>Pilots</h1>
            </PilotsContainer>
        );
    }
}