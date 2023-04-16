import { ChangeEvent, Component, FormEvent, Fragment } from 'react';
import { Card, Row, Col, Modal, Form, Button, Image, Badge } from 'react-bootstrap';
import { ProfileProps } from '../Profile/Profile.component';
import { ModalPostContainer } from '../ModalPost/ModalPost.styles';
import { CardContainer, ModalContainer, PostContainer, TextContainer } from '../Post/Post.styles';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { BadgeContainer } from '../Pilots/Pilots.styles';
import { ArrowsFullscreen, Chat, Rocket } from 'react-bootstrap-icons';
import { utcConverter } from '../../utils/date/date.utils';

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
    showCreate: boolean;
    show: boolean;
}

export class PlanetsTab extends Component<ProfileProps, IPlanetFields> {
    constructor(props: ProfileProps) {
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
            showCreate: false,
            show: false,
        }
        this.handleLike = this.handleLike.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseCreate = this.handleCloseCreate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
    }
    
    handleLike(postId: number, type: string): void {
        this.props.likePost(postId, type);
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

    handleClick(postId: number): void {
        this.props.getPost(postId);
        this.props.getComments(postId);
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
        console.log("State: ", this.state)
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
        const { show, showCreate, planetName, planetMass, perihelion, aphelion, gravity, temperature } = this.state;
        const { planets, comments } = this.props;
        return (
            <Fragment>
            <Row style={{ marginBottom: '2rem' }} xs={1} >
                <Col>
                    <Card style={{ color: 'white', textAlign: 'center' }} className='bg-dark'>
                        <Card.Body>
                            <Card.Title style={{ cursor: 'pointer' }} onClick={this.handleCreate} >Create a planet</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {
                planets.userPlanets?.length ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3, 1050: 4}}
                >
                <Masonry>
                {planets.userPlanets?.map(({ planetId, planetName, planetMass, perihelion, aphelion, gravity, temperature, imageLink, imageSource, favorites, type }, index) => {
                    return <PostContainer key={index}>
                        <Card className="bg-dark" key={index}>
                            <Card.Img src={imageLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                            <Card.ImgOverlay>
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(planetId)} size={15}/></Badge>
                                </BadgeContainer>
                                {
                                    <BadgeContainer><Badge style={{ color: 'black' }} bg="light">
                                        <Chat size={15}/>
                                        {` ${comments != null ? comments : ""}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                {
                                    <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light">
                                        <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(planetId, type)} size={15}/>
                                        {` ${favorites != null ? favorites : ""}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                            </Card.ImgOverlay>
                            <Card.Body>
                                <Card.Text>{planetName}</Card.Text>
                            </Card.Body>
                        </Card>
                    </PostContainer>
                })}
                </Masonry>
            </ResponsiveMasonry> : 
            <Col xs={12}>
                <Card style={{ color: 'white', textAlign: 'center' }} className="bg-dark">
                    <Card.Title>"Stay tuned. Currently no planets..."</Card.Title>
                </Card>
            </Col>
        }
        <Modal 
            size="lg"
            show={show} 
            onHide={() => this.handleClose()}
        >
            <ModalContainer>
            <Modal.Header closeButton>
                <Modal.Title >Pilot Log</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={8}>
                    <Image
                        fluid
                        src={planets.singlePlanet?.imageLink ? planets.singlePlanet?.imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                    />
                    {planets.singlePlanet?.planetName}
                    </Col>
                    <Col>
                    <div>Comments</div>
                    {
                        comments.comments?.map(({ commentId, commentValue, mediaLink, dateCreated }) => {
                            return <CardContainer>
                                <Card className="bg-dark" key={commentId}>
                                    <TextContainer>
                                        <Card.Text>{commentValue}</Card.Text>
                                        <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                    </TextContainer>
                                </Card>
                            </CardContainer>
                        })
                    }
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="dark" onClick={() => this.handleClose()}>
                Close
            </Button>
            <Button variant="dark" onClick={() => this.handleClose()}>
                Single View
            </Button>
            </Modal.Footer>
            </ModalContainer>
        </Modal>
        <Modal show={showCreate} onHide={() => this.handleClose()}>
            <ModalPostContainer>
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
            <Button variant="secondary" onClick={() => this.handleCloseCreate()}>
                Close
            </Button>
            <Button type="submit" variant="primary">
                Log
            </Button>
            </Modal.Footer>
            </Form>
            </ModalPostContainer>
        </Modal>
        </Fragment>
        );
    }
}