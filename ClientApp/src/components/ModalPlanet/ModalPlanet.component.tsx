import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";
import { Globe } from 'react-bootstrap-icons';

import { BoxPlanetContainer, ModalPlanetContainer } from "./ModalPlanet.styles";
import { RootState } from "../../store/store";
import { PlanetCreateStart, planetCreateStart } from "../../store/planet/planet.action";

type ModalPlanetProps = ConnectedProps<typeof connector>;

interface IPlanetFields {
    planetName: string;
    planetMass: string;
    perihelion: string;
    aphelion: string;
    gravity: string;
    temperature: string;
    imageLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
}

export class ModalPlanet extends Component<ModalPlanetProps, IPlanetFields> {
    constructor(props: ModalPlanetProps) {
        super(props);
        this.state = {
            planetName: "",
            planetMass: "",
            perihelion: "",
            aphelion: "",
            gravity: "",
            temperature: "",
            imageLink: "",
            imageSource: "",
            imageFile: null,
            show: false,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleClick(): void {;
        this.setState({
            show: !this.state.show
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { planetName, planetMass, perihelion, aphelion, gravity, temperature, imageLink, imageFile } = this.state;
        try {
            this.props.createPlanet(planetName, planetMass, perihelion, aphelion, gravity, temperature, imageLink, imageFile);
        } catch (error) {
            if (error) {
                alert('Try again, please');
            } 
        }
        this.handleClose();
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    showPreview(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
          const { files } = event.target;
          const selectedFiles = files as FileList;
          let imageFile = selectedFiles[0];
          const reader = new FileReader();
          reader.onload = x => {
            this.setState({
              ...this.state,
              imageFile,
              imageSource: x.target?.result
            });
          }
          reader.readAsDataURL(imageFile);
        } else {
          this.setState({
              ...this.state,
              imageFile: null,
              imageSource: null
          });
        }
    }

    render() {
        const { show, planetName, planetMass, perihelion, aphelion, gravity, temperature } = this.state;
        return(
            <Fragment>
                <BoxPlanetContainer>
                    <Globe className="bg-white rounded modalIcon" color="black" onClick={() => this.handleClick()} />
                </BoxPlanetContainer>
                <Modal show={show} onHide={() => this.handleClose()}>
                    <ModalPlanetContainer>
                    <Modal.Header closeButton>
                    <Modal.Title>Document Planet</Modal.Title>
                    </Modal.Header>
                    <Form autoComplete="off" onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <Row xs={2}>
                        <Col>
                        <Form.Group className="mb-3" controlId="formPlanetName">
                        <Form.Control
                            onChange={this.handleChange}
                            name="planetName"
                            value={planetName}
                            type="planetName"
                            as="input"
                            placeholder="Planet Name"
                            autoFocus
                            />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3" controlId="formPlanetMass">
                        <Form.Control
                            onChange={this.handleChange}
                            name="planetMass"
                            value={planetMass}
                            type="planetMass"
                            as="input"
                            placeholder="Planet Mass"
                            autoFocus
                            />
                        </Form.Group>
                        </Col>
                        </Row>
                        <Row xs={2}>
                            <Col>
                        <Form.Group className="mb-3" controlId="formPerihelion">
                        <Form.Control
                            onChange={this.handleChange}
                            name="perihelion"
                            value={perihelion}
                            type="perihelion"
                            as="input"
                            placeholder="Perihelion"
                            autoFocus
                            />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3" controlId="formAphelion">
                        <Form.Control
                            onChange={this.handleChange}
                            name="aphelion"
                            value={aphelion}
                            type="aphelion"
                            as="input"
                            placeholder="Aphelion"
                            autoFocus
                            />
                        </Form.Group>
                        </Col>
                        </Row>
                        <Row xs={2}>
                            <Col>
                        <Form.Group className="mb-3" controlId="formGravity">
                        <Form.Control
                            onChange={this.handleChange}
                            name="gravity"
                            value={gravity}
                            type="gravity"
                            as="input"
                            placeholder="Gravity"
                            autoFocus
                            />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3" controlId="formTemperature">
                        <Form.Control
                            onChange={this.handleChange}
                            name="temperature"
                            value={temperature}
                            type="Temperature"
                            as="input"
                            placeholder="Temperature"
                            autoFocus
                            />
                        </Form.Group>
                        </Col>
                        </Row>
                        <Row>
                        <Form.Group
                        className="mb-3"
                        controlId="formFile"
                        >
                        <Form.Control 
                            as="input"
                            name="mediaLink"
                            onChange={this.showPreview}
                            accept="image/*"
                            type="file" 
                            placeholder="Media"
                        />
                        </Form.Group>
                        </Row>
                    </Modal.Body>
            <Modal.Footer>
            <button className="btn btn-secondary" onClick={() => this.handleClose()}>
                Close
            </button>
            <button type="submit" className="btn btn-primary">
                Log
            </button>
            </Modal.Footer>
            </Form>
            </ModalPlanetContainer>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    planets: state.planet,
    comments: state.comment
});

const mapDispatchToProps = (dispatch: Dispatch<PlanetCreateStart>) => ({
    createPlanet: (planetMass: string, 
        planetName: string, 
        perihelion: string, 
        aphelion: string, 
        gravity: string, 
        temperature: string, 
        imageLink: string, 
        imageFile: File
    ) => dispatch(planetCreateStart(planetMass, 
        planetName, 
        perihelion, 
        aphelion, 
        gravity, 
        temperature, 
        imageLink,
        imageFile 
))});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ModalPlanet);