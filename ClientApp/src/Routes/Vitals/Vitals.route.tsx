import { Component, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";
import ReactLoading from "react-loading";

import CrewComponent from "../../components/Crew/Crew.component";
import MessageComponent from "../../components/Message/Message.component";
import NotificationComponent from "../../components/Notification/Notification.component";
import PilotDashComponent from "../../components/PilotDash/PilotDash.component";
import PlanetDashComponent from "../../components/PlanetDash/PlanetDash.component";
import { RootState } from "../../store/store";
import Authentication from "../Authentication/Authentication.route";
import { ItemsContainer, VitalsContainer } from "./Vitals.styles";

export type VitalsProps = ConnectedProps<typeof connector>;

export class Vitals extends Component<VitalsProps> {
    render() {
        const { currentUser, pilot, messages, planets } = this.props;
        return (
            <Fragment>
                {
                    currentUser.currentUser == null ? 
                    <Authentication/> :
                    <>
                    {
                            currentUser.isLoading ? 
                            <div style={{ width: '50%', margin: 'auto' }}>
                                <ReactLoading type="bars" color="lightgrey" height={667} width={375}/>
                            </div> :
                            <>
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
                        </>
                    }
                    </>
                }
            </Fragment>
        )
    }
}

const mapToStateProps = (state: RootState) => {
    return { 

        currentUser: state.user,
        pilot: state.pilot,
        planets: state.planet,
        messages: state.message,
    };
};

export const connector = connect(mapToStateProps);

export default connector(Vitals);