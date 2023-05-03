import { ChangeEvent, Component, Dispatch, Fragment } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Badge, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";

import { FixedContainer, PlanetPanelContainer } from "./Planet.styles";
import { RootState } from "../../store/store";
import { PlanetFetchAllStart, PlanetFetchSingleStart, planetFetchAllStart, planetFetchSingleStart } from "../../store/planet/planet.action";
import { CommentContainer, FormContainer, ModalContainer, PostContainer, TextContainer } from "../Post/Post.styles";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { ArrowsFullscreen } from "react-bootstrap-icons";
import NotificationComponent from "../Notification/Notification.component";
import { CardContainer } from "../Notification/Notifications.styles";
import { utcConverter } from "../../utils/date/date.utils";
import { PlanetCommentCreateStart, PlanetCommentFetchSingleStart, planetcommentCreateStart, planetcommentFetchSingleStart } from "../../store/planetcomment/planetcomment.action";

type PlanetProps = ConnectedProps<typeof connector>;

interface IDefaultForm {
    show: boolean;
    imageFile: any;
    imageSource: string | ArrayBuffer | null | undefined;
    commentValue: string;
}

export class Planet extends Component<PlanetProps, IDefaultForm> {
    constructor(props: PlanetProps) {
        super(props);
        this.state = {
            show: false,
            imageFile: null,
            imageSource: "",
            commentValue: ""
        }
        this.postComment = this.postComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.fetchPlanet = this.fetchPlanet.bind(this);
        this.showPreview = this.showPreview.bind(this);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        });
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    postComment() {
        const { commentValue, imageFile } = this.state;
        const { planets } = this.props;
        const postId = planets.singlePlanet?.planetId ? planets.singlePlanet.planetId : 0
        this.props.createComment(commentValue, imageFile, postId);
    }

    fetchPlanet(planetId: number): void {
        this.props.getPlanet(planetId);
        this.props.getComments(planetId);
        this.setState({
            show: !this.state.show
        })
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
    render() {
        const { show } = this.state;
        const { planets, planetcomments } = this.props;
        return (
            <Fragment>
                <FixedContainer className="fixed-top">
                    <PlanetPanelContainer>
                        <h1>Planets</h1>
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}
                        >
                            <Masonry>
                            {planets.planets?.map(({ planetId, planetName, perihelion, aphelion, planetMass, temperature, gravity, imageLink }, index) => {
                                return <PostContainer key={index}>
                                    <Card className="bg-dark" key={index}>
                                        <Card.Img src={imageLink ? imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                                        <Card.ImgOverlay>
                                            <BadgeContainer>
                                                <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen onClick={() => this.fetchPlanet(planetId)} style={{ cursor: 'pointer' }} size={15}/></Badge>
                                            </BadgeContainer>
                                        </Card.ImgOverlay>
                                        <Card.Body>
                                            <Card.Text>{planetName}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </PostContainer>
                            })}
                            </Masonry>
                        </ResponsiveMasonry>
                    </PlanetPanelContainer>
                </FixedContainer>
                <NotificationComponent/>
                <Modal 
                    size="lg"
                    show={show} 
                    onHide={() => this.handleClose()}
                >
                    <ModalContainer>
                    <Modal.Header closeButton>
                        <Modal.Title>{planets.singlePlanet?.planetName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={8}>
                            <Image
                                style={{ height: 'auto', width: '100%' }}
                                fluid
                                src={planets.singlePlanet?.imageLink ? planets.singlePlanet?.imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                            />
                            </Col>
                            <Col>
                            <div>Comments</div>
                            <CommentContainer>
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
                            </CommentContainer>
                            <FormContainer>
                            <Form style={{ margin: 'auto' }} key={planets.singlePlanet?.planetId} onSubmit={this.postComment}>
                                <Row style={{ marginBottom: '3rem', justifyContent: 'center' }} xs={1}>
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
                                            Post
                                        </button>
                                    </Col>                
                                </Row>
                            </Form>
                            </FormContainer>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-dark" onClick={() => this.handleClose()}>
                        Close
                    </button>
                    <button className="btn btn-dark" >
                    <a style={{ textDecoration: 'none', color: 'white' }} href={`/singleplanet/${planets.singlePlanet?.planetId}`}>
                        Single View
                    </a>
                    </button>
                    </Modal.Footer>
                    </ModalContainer>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        planets: state.planet,
        planetcomments: state.planetcomment
    }
};

const mapDispatchToProps = (dispatch: Dispatch<PlanetFetchAllStart | PlanetFetchSingleStart | PlanetCommentCreateStart | PlanetCommentFetchSingleStart>) => ({
    getPlanets: () => dispatch(planetFetchAllStart()),
    getPlanet: (planetId: number) => dispatch(planetFetchSingleStart(planetId)),
    getComments: (planetId: number) => dispatch(planetcommentFetchSingleStart(planetId)),
    createComment: (commentValue: string, imageFile: File, postId: number) => dispatch(planetcommentCreateStart(commentValue, imageFile, postId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Planet);