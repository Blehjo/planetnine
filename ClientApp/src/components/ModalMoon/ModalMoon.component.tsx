import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";
import { MoonFill } from 'react-bootstrap-icons';

import { BoxMoonContainer, ModalMoonContainer } from "./ModalMoon.styles";
import { RootState } from "../../store/store";
import { Moon } from "../../store/moon/moon.types";
import { MoonCreateStart, moonCreateStart } from "../../store/moon/moon.action";

type ModalMoonProps = ConnectedProps<typeof connector>;

interface IMoonFields {
    moonName: string;
    moonMass: string;
    perihelion: string;
    aphelion: string;
    gravity: string;
    temperature: string;
    planetId: number | null;
    imageLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    showCreate: boolean;
    show: boolean;
}

export class ModalMoon extends Component<ModalMoonProps, IMoonFields> {
    constructor(props: ModalMoonProps) {
        super(props);
        this.state = {
            moonName: "",
            moonMass: "",
            perihelion: "",
            aphelion: "",
            gravity: "",
            temperature: "",
            planetId: null,
            imageLink: "",
            imageSource: "",
            imageFile: null,
            showCreate: false,
            show: false,
        }
        this.handleCreate = this.handleCreate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseCreate = this.handleCloseCreate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
    }

    handleCreate(): void {
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }
    
    handleCloseCreate(): void {
        this.setState({
            showCreate: !this.state.showCreate
        });
    }

    handleClick(): void {;
        this.setState({
            showCreate: !this.state.showCreate
        });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { moonName, moonMass, perihelion, aphelion, gravity, temperature, planetId, imageLink, imageFile } = this.state;
        try {
            this.props.createMoon(moonMass, moonName, perihelion, aphelion, gravity, temperature, planetId, imageLink, imageFile);
        } catch (error) {
            if (error) {
                alert('Try again, please');
            } 
        }
        this.handleCloseCreate();
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
        const { showCreate, moonMass, moonName, perihelion, aphelion, gravity, temperature, planetId, imageLink, imageFile } = this.state;
        return(
            <Fragment>
                <BoxMoonContainer>
                    <MoonFill className="bg-warning rounded modalIcon" onClick={() => this.handleClick()}/>
                </BoxMoonContainer>
                <Modal show={showCreate} onHide={() => this.handleCloseCreate()}>
                    <ModalMoonContainer>
                    <Modal.Header closeButton>
                    <Modal.Title>Document Moon</Modal.Title>
                    </Modal.Header>
                    <Form autoComplete="off" onSubmit={this.handleSubmit}>
                        <Modal.Body>
                            <Row xs={2}>
                            <Col>
                            <Form.Group className="mb-3" controlId="formPlanetName">
                            <Form.Control
                                onChange={this.handleChange}
                                name="moonName"
                                value={moonName}
                                type="moonName"
                                as="input"
                                placeholder="Moon Name"
                                autoFocus
                                />
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group className="mb-3" controlId="formMoonMass">
                            <Form.Control
                                onChange={this.handleChange}
                                name="moonMass"
                                value={moonMass}
                                type="moonMass"
                                as="input"
                                placeholder="Moon Mass"
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
                                name="Temperature"
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
                        <button className="btn btn-secondary" onClick={() => this.handleCloseCreate()}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Log
                        </button>
                        </Modal.Footer>
                    </Form>
                    </ModalMoonContainer>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    moons: state.moon
});

const mapDispatchToProps = (dispatch: Dispatch<MoonCreateStart>) => ({
    createMoon: (moonMass: string, moonName: string, perihelion: string, aphelion: string, gravity: string, temperature: string, planetId: number | null, imageLink: string, imageFile: File) => dispatch(moonCreateStart(moonMass, moonName, perihelion, aphelion, gravity, temperature, planetId, imageLink, imageFile))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ModalMoon);