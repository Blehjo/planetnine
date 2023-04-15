import { Component, Dispatch, Fragment } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";
import { Globe } from 'react-bootstrap-icons';

import { BoxPlanetContainer, ModalPlanetContainer } from "./ModalPlanet.styles";
import { RootState } from "../../store/store";
import { Moon } from "../../store/moon/moon.types";
import { MoonCreateStart, moonCreateStart } from "../../store/moon/moon.action";
import { PlanetCreateStart, planetCreateStart } from "../../store/planet/planet.action";

type ModalPlanetProps = ConnectedProps<typeof connector>;

export class ModalPlanet extends Component<ModalPlanetProps> {
    state = {
        show: false,
        moonMass: 0, 
        moonName: "", 
        perihelion: 0, 
        aphelion: 0, 
        gravity: 0, 
        temperature: 0, 
        imageLink: "", 
        planetId: 0,
        imageFile: null,
    }

    handleClick() {
        this.setState({
            show: !this.state.show
        })
    }

    handleClose() {
        this.setState({
            show: !this.state.show
        })
    }

    handleSubmit() {
        const { moonMass, moonName, perihelion, aphelion, gravity, temperature, planetId, imageLink, imageFile} = this.state;
        this.props.createMoon(moonMass, moonName, perihelion, aphelion, gravity, temperature, planetId, imageLink, imageFile);
    }

    render() {
        const { show } = this.state;
        return(
            <Fragment>
                <BoxPlanetContainer>
                    <Globe color="black" onClick={() => this.handleClick()} size={55}/>
                </BoxPlanetContainer>
                <Modal show={show} onHide={() => this.handleClose()}>
                    <ModalPlanetContainer>
                    <Modal.Header closeButton>
                    <Modal.Title>Inquiry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formMember">
                        <Form.Control
                            type="text"
                            placeholder="new crew member"
                            autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="formInquiry"
                        placeholder="inquire with your crew"
                        >
                        <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.handleSubmit()}>
                        Log
                    </Button>
                    </Modal.Footer>
                    </ModalPlanetContainer>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    planets: state.planet
});

const mapDispatchToProps = (dispatch: Dispatch<PlanetCreateStart>) => ({
    createMoon: (moonMass: number, 
        moonName: string, 
        perihelion: number, 
        aphelion: number, 
        gravity: number, 
        temperature: number, 
        planetId: number,
        imageLink: string, 
        imageFile: File | null
    ) => dispatch(planetCreateStart(moonMass, 
        moonName, 
        perihelion, 
        aphelion, 
        gravity, 
        temperature, 
        planetId,
        imageLink,
        imageFile 
))});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ModalPlanet);