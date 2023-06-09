import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { Badge, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import ReactLoading from "react-loading";
import { ConnectedProps, connect } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { ArrowsFullscreen, Send } from "react-bootstrap-icons";
import { PlanetFetchAllStart, PlanetFetchSingleStart, planetFetchAllStart, planetFetchSingleStart } from "../../store/planet/planet.action";
import { PlanetState } from "../../store/planet/planet.reducer";
import { PlanetCommentCreateStart, PlanetCommentFetchSingleStart, planetcommentCreateStart, planetcommentFetchSingleStart } from "../../store/planetcomment/planetcomment.action";
import { PlanetCommentState } from "../../store/planetcomment/planetcomment.reducer";
import { RootState } from "../../store/store";
import { utcConverter } from "../../utils/date/date.utils";
import NotificationComponent from "../Notification/Notification.component";
import { CardContainer } from "../Notification/Notifications.styles";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { CommentContainer, ModalContainer, PostContainer, TextContainer } from "../Post/Post.styles";
import { PlanetPanelContainer } from "./Planet.styles";

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

    postComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
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

    componentDidUpdate(prevProps: Readonly<{ planets: PlanetState; planetcomments: PlanetCommentState; } & { getPlanets: () => void; getPlanet: (planetId: number) => void; getComments: (planetId: number) => void; createComment: (commentValue: string, imageFile: File, postId: number) => void; }>, prevState: Readonly<IDefaultForm>, snapshot?: any): void {
        if (this.props.planets.singlePlanet?.planetId != prevProps.planets.singlePlanet?.planetId) {
            this.props.getComments(this.props.planets.singlePlanet?.planetId!);
        }
    }

    render() {
        const { show } = this.state;
        const { planets, planetcomments } = this.props;
        return (
            <Fragment>
                {
                planets.isLoading || planetcomments.isLoading ? 
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <ReactLoading type="bars" color="lightgrey" height={375} width={375}/>
                </div> :
                <>
                <PlanetPanelContainer>
                    <h1>Planets</h1>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}
                    >
                        <Masonry>
                        {planets.planets?.map(({ planetId, planetName, brief, perihelion, aphelion, planetMass, temperature, gravity, imageLink }, index) => {
                            return <PostContainer key={index}>
                                <Card className="bg-dark" key={index}>
                                    <Card.Img src={imageLink ? imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                                    <Card.ImgOverlay>
                                    <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                                        <BadgeContainer>
                                            <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen onClick={() => this.fetchPlanet(planetId)} style={{ cursor: 'pointer' }} size={15}/></Badge>
                                        </BadgeContainer>
                                    </div>
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
                                fluid
                                style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                                src={planets.singlePlanet?.imageLink ? planets.singlePlanet?.imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                            />
                            <Card style={{ marginTop: "1rem" }} className="bg-dark" key={planets.singlePlanet?.planetId}>
                                <TextContainer>
                                {planets.singlePlanet?.brief}
                                </TextContainer>
                            </Card>
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
                    <button className="btn btn-dark" >
                    <a style={{ textDecoration: 'none', color: 'white' }} href={`/singleplanet/${planets.singlePlanet?.planetId}`}>
                        Single View
                    </a>
                    </button>
                    </Modal.Footer>
                    </ModalContainer>
                </Modal>
                </>
                }
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