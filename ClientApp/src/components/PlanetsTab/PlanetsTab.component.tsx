import { ChangeEvent, Component, FormEvent, Fragment } from 'react';
import { Card, Row, Col, Modal, Form, Button, Image, Badge } from 'react-bootstrap';
import { ProfileProps } from '../Profile/Profile.component';
import { ModalPostContainer } from '../ModalPost/ModalPost.styles';
import { CardContainer, CommentContainer, ModalContainer, PostContainer, TextContainer } from '../Post/Post.styles';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { BadgeContainer } from '../Pilots/Pilots.styles';
import { ArrowsFullscreen, Chat, Rocket, Send, XCircle } from 'react-bootstrap-icons';
import { utcConverter } from '../../utils/date/date.utils';
import { PlanetState } from '../../store/planet/planet.reducer';

interface IPlanetFields extends ICommentFields{
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
    showDelete: boolean;
    planetId: number | null;
}

interface ICommentFields {
    commentValue: string;
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
            commentValue: "",
            showDelete: false,
            planetId: null
        }
        this.handleLike = this.handleLike.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseCreate = this.handleCloseCreate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.postComment = this.postComment.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    postComment() {
        const { commentValue, imageFile } = this.state;
        const { planets } = this.props;
        const planetId = planets.singlePlanet?.planetId ? planets.singlePlanet.planetId : 0
        this.props.createPlanetComment(commentValue, imageFile, planetId);
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

    handleClick(planetId: number): void {
        this.props.getPlanet(planetId);
        this.props.getPlanetComments(planetId);
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
        this.handleCloseCreate();
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    handleDelete(): void {
        this.props.deletePlanet(this.state.planetId!);
        this.handleCloseDelete();
    }
    
    handleCloseDelete(): void {
        this.setState({
            showDelete: !this.state.showDelete
        });
    }

    handleDeleteClick(planetId: number): void {
        this.setState({
            planetId: planetId
        })
        this.handleCloseDelete();
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

    componentDidMount(): void {
        this.props.getPlanets();
    }

    componentDidUpdate(prevProps: Readonly<{ planets: PlanetState; } & { getPlanets: () => void; }>, prevState: Readonly<IPlanetFields>, snapshot?: any): void {
        if (this.props.planets.userPlanets?.length != prevProps.planets.userPlanets?.length) {
            this.props.getPlanets();
        }
    }

    render() {
        const { show, showCreate, showDelete, planetName, planetMass, perihelion, aphelion, gravity, temperature } = this.state;
        const { planets, planetcomments } = this.props;
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
                    columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
                >
                <Masonry>
                {planets.userPlanets?.map(({ planetId, planetName, planetMass, perihelion, aphelion, gravity, temperature, imageLink, imageSource, favorites, type }, index) => {
                    return <PostContainer key={index}>
                        <Card className="bg-dark" key={index}>
                            <Card.Img src={imageLink ? imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                            <Card.ImgOverlay>
                            <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(planetId)} size={15}/></Badge>
                                </BadgeContainer>
                                {
                                    <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light">
                                        <Rocket style={{ cursor: 'pointer' }} onClick={() => this.handleLike(planetId, type)} size={15}/>
                                        {` ${favorites != null ? favorites : ""}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                </div>
                                <Col xs={3}>
                                <XCircle onClick={() => this.handleDeleteClick(planetId)} key={planetId} style={{ background: "white", borderRadius: ".5rem", color: "black", cursor: "pointer", position: "absolute", right: "5", top: "5" }}/>
                                </Col>
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
                    <Card.Title>"Currently no planets... Let's change that!"</Card.Title>
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
                <Modal.Title >{planets.singlePlanet?.planetName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={8}>
                    <Image
                        fluid
                        style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                        src={planets.singlePlanet?.imageLink ? planets.singlePlanet?.imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                    />
                    </Col>
                    <Col>
                    <CommentContainer>
                    <div>Comments</div>
                    <div style={{ height: "65%", overflowY: "auto" }}>
                    {
                        planetcomments.comments?.map(({ planetCommentId, commentValue, mediaLink, dateCreated }) => {
                            return <CardContainer>
                                <Card className="bg-dark" key={planetCommentId}>
                                    <TextContainer>
                                        <Card.Text>{commentValue}</Card.Text>
                                        <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                    </TextContainer>
                                </Card>
                            </CardContainer>
                        })
                    }
                    </div>
                        <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={planets.singlePlanet?.planetId} onSubmit={this.postComment}>
                            <Row style={{ marginBottom: '3rem', justifyContent: 'center' }}>
                            <Col xs={12}>
                            <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Control style={{ height: '.5rem' }} name="commentValue" as="textarea" onChange={this.handleChange} placeholder=" Write your comment here" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group className="mb-3" controlId="formMedia">
                                        <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                    </Form.Group>
                                </Col>
                                </Row>
                                </Col>
                                <Col xs={12}>
                                    <button id={planets.singlePlanet?.planetId.toString()} style={{ textAlign: 'center', width: '100%', height: '100%'}} className="btn btn-light" type="submit">
                                        <Send/>
                                    </button>
                                </Col>                
                            </Row>
                        </Form>
                        </CommentContainer>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
            <button className="btn btn-dark" onClick={() => this.handleClose()}>
                Close
            </button>
            <button className="btn btn-dark">
            <a style={{ textDecoration: 'none', color: 'white' }} href={`/singleplanet/${planets.singlePlanet?.planetId}`}>
                Single View
            </a>
            </button>
            </Modal.Footer>
            </ModalContainer>
        </Modal>
        <Modal show={showCreate} onHide={() => this.handleCloseCreate()}>
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
            <button className="btn btn-secondary" onClick={() => this.handleCloseCreate()}>
                Close
            </button>
            <button type="submit" className="btn btn-primary">
                Log
            </button>
            </Modal.Footer>
            </Form>
            </ModalPostContainer>
        </Modal>
        <Modal show={showDelete} onHide={() => this.handleCloseDelete()}>
            <Modal.Body style={{ textAlign: "center", color: "black" }}>
                Are you sure you want to delete this planet?
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "center" }}>
            <button className="btn btn-secondary" onClick={() => this.handleCloseDelete()}>
                Cancel
            </button>
            <button onClick={() => this.handleDelete()} className="btn btn-primary">
                Delete
            </button>
            </Modal.Footer>
        </Modal>
        </Fragment>
        );
    }
}