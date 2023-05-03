import { ChangeEvent, Component, Dispatch } from "react";
import { PlanetContainer, PlanetDashPanel } from "./PlanetDash.styles";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { CommentContainer, FormContainer, ModalContainer, TextContainer } from "../Post/Post.styles";
import { Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { ArrowsFullscreen } from "react-bootstrap-icons";
import { RootState } from "../../store/store";
import { PlanetFetchSingleStart, PlanetFetchUserPlanetsStart, planetFetchSingleStart, planetFetchUserPlanetsStart } from "../../store/planet/planet.action";
import { ConnectedProps, connect } from "react-redux";
import { HeaderContainer, MarginContainer } from "../PilotDash/PilotDash.styles";
import { CardHolder } from "../Crew/Crew.styles";
import { CardContainer } from "../Notification/Notifications.styles";
import { utcConverter } from "../../utils/date/date.utils";
import { PlanetCommentCreateStart, PlanetCommentFetchSingleStart, planetcommentCreateStart, planetcommentFetchSingleStart } from "../../store/planetcomment/planetcomment.action";

type PlanetDashProps = ConnectedProps<typeof connector>;

interface ICurrentState extends IPlanetComment {
    show: boolean;
}

interface IPlanetComment {
    imageLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    commentValue: string;
}

export class PlanetDash extends Component<PlanetDashProps, ICurrentState> {
    constructor(props: PlanetDashProps) {
        super(props);
        this.state = {
            show: false,
            commentValue: "",
            imageLink: "",
            imageSource: "",
            imageFile: null
        }
        this.postComment = this.postComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
    }

    postComment() {
        const { commentValue, imageFile } = this.state;
        const { planets } = this.props;
        const planetId = planets.singlePlanet?.planetId ? planets.singlePlanet.planetId : 0
        this.props.createPlanetComment(commentValue, imageFile, planetId);
    }

    handleClick(planetId: number): void {
        this.props.getPlanet(planetId);
        this.props.getPlanetComments(planetId);
        this.setState({
            show: !this.state.show
        });
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
        const { planets, planetcomments } = this.props;
        const { show } = this.state;
        return(
            <PlanetDashPanel>
                <HeaderContainer>
                <div>Planets</div>
                </HeaderContainer>
                <CardHolder>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry>
                    {planets.userPlanets?.map(({ planetId, planetName, perihelion, aphelion, planetMass, temperature, gravity, imageLink }, index) => {
                        return <PlanetContainer key={index}>
                            <Card className="bg-dark" key={index}>
                                <Card.Img src={imageLink ? imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                                <Card.ImgOverlay>
                                    <ArrowsFullscreen onClick={() => this.handleClick(planetId)} style={{ cursor: 'pointer' }} size={15}/>
                                </Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text>{planetName}</Card.Text>
                                </Card.Body>
                            </Card>
                        </PlanetContainer>
                    })}
                    </Masonry>
                </ResponsiveMasonry>
                </CardHolder>
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
                                            <Row style={{ marginBottom: '1rem' }}>
                                                <Col xs={11}>
                                                    <Form.Group>
                                                        <Form.Control style={{ height: '.5rem' }} name="commentValue" as="textarea" onChange={this.handleChange} placeholder=" Write your comment here" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row >
                                                <Col xs={8}>
                                                    <Form.Group className="mb-3" controlId="formMedia">
                                                        <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={2}>
                                                    <button id={planets.singlePlanet?.planetId.toString()} className="btn btn-light" type="submit">
                                                        Post
                                                    </button>
                                                </Col>                
                                            </Row>
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
                    <button className="btn btn-dark" onClick={() => this.handleClose()}>
                        Single View
                    </button>
                    </Modal.Footer>
                    </ModalContainer>
                </Modal>
            </PlanetDashPanel>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        planets: state.planet,
        planetcomments: state.planetcomment
    }
};

const mapDispatchToProps = (dispatch: Dispatch<PlanetFetchUserPlanetsStart | PlanetFetchSingleStart | PlanetCommentFetchSingleStart | PlanetCommentCreateStart>) => ({
    getPlanets: () => dispatch(planetFetchUserPlanetsStart()),
    getPlanet: (planetId: number) => dispatch(planetFetchSingleStart(planetId)),
    getPlanetComments: (planetId: number) => dispatch(planetcommentFetchSingleStart(planetId)),
    createPlanetComment: (commentValue: string, imageFile: File, planetId: number) => dispatch(planetcommentCreateStart(commentValue, imageFile, planetId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(PlanetDash);