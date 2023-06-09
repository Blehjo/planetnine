import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from 'react';
import { Card, Row, Col, Modal, Form, Button, Image, Badge } from 'react-bootstrap';
import { ModalPostContainer } from '../ModalPost/ModalPost.styles';
import { CardContainer, CommentContainer, ModalContainer, PostContainer, TextContainer } from '../Post/Post.styles';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { BadgeContainer } from '../Pilots/Pilots.styles';
import { ArrowsFullscreen, Chat, Rocket, Send } from 'react-bootstrap-icons';
import { utcConverter } from '../../utils/date/date.utils';
import { ConnectedProps, connect } from 'react-redux';
import { PlanetFetchOtherUserPlanetsStart, PlanetFetchSingleStart, planetFetchOtherUserPlanetsStart, planetFetchSingleStart } from '../../store/planet/planet.action';
import { PlanetCommentCreateStart, PlanetCommentFetchSingleStart, planetcommentCreateStart, planetcommentFetchSingleStart } from '../../store/planetcomment/planetcomment.action';
import { RootState } from '../../store/store';

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
}

interface ICommentFields {
    commentValue: string;
}

export type ProfileProps = ConnectedProps<typeof connector>;

type UserInfo = ProfileProps & {
    userId?: number;
}

export class SinglePlanetsTab extends Component<UserInfo, IPlanetFields> {
    constructor(props: UserInfo) {
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
            commentValue: ""
        }
        this.handleCreate = this.handleCreate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseCreate = this.handleCloseCreate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    postComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { commentValue, imageFile } = this.state;
        const { planets } = this.props;
        const planetId = planets.singlePlanet?.planetId ? planets.singlePlanet.planetId : 0
        this.props.createPlanetComment(commentValue, imageFile, planetId);
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
        this.props.getPlanets(this.props.userId!);
    }

    componentDidUpdate(prevProps: Readonly<UserInfo>, prevState: Readonly<IPlanetFields>, snapshot?: any): void {
        if (this.props.planets.singlePlanet?.planetId != prevProps.planets.singlePlanet?.planetId) {
            this.props.getPlanetComments(this.props.planets.singlePlanet?.planetId!);
            this.setState({
                commentValue: ""
            })
        }
    }

    render() {
        const { show, showCreate, planetName, planetMass, perihelion, aphelion, gravity, temperature } = this.state;
        const { planets, planetcomments } = this.props;
        return (
            <Fragment>
            {
                planets.planets?.length ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
                >
                <Masonry>
                {planets.planets?.map(({ planetId, planetName, planetMass, perihelion, aphelion, gravity, temperature, imageLink, imageSource, favorites, type }, index) => {
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
                                        <Rocket style={{ cursor: 'pointer' }} size={15}/>
                                        {` ${favorites != null ? favorites : ""}`}
                                        </Badge>
                                    </BadgeContainer>
                                }
                                </div>
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
                <Card style={{ color: 'white', textAlign: 'center', padding: "1rem" }} className="bg-dark">
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
                <Modal.Title >{planets.singlePlanet?.planetName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={8}>
                    <Card.Img style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }} src={planets.singlePlanet?.imageLink ? planets.singlePlanet.imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
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
            <a className="btn btn-dark" href={`/singleplanet/${planets.singlePlanet?.planetId}`}>
                Single View
            </a>
            </Modal.Footer>
            </ModalContainer>
        </Modal>
        </Fragment>
        );
    }
}

const mapToStateProps = (state: RootState) => {
    return { 
        userprofile: state.userprofile,
        currentUser: state.user,
        pilot: state.pilot,
        posts: state.post,
        comments: state.comment,
        mooncomments: state.mooncomment,
        planetcomments: state.planetcomment,
        moons: state.moon,
        planets: state.planet,
        chats: state.chat,
        chatComments: state.chatcomment
    };
};

const mapDispatchToProps = (dispatch: Dispatch<PlanetCommentCreateStart | PlanetFetchSingleStart | PlanetCommentFetchSingleStart | PlanetFetchOtherUserPlanetsStart>) => ({
    getPlanetComments: (planetId: number) => dispatch(planetcommentFetchSingleStart(planetId)),
    getPlanets: (userId: number) => dispatch(planetFetchOtherUserPlanetsStart(userId)),
    getPlanet: (planetId: number) => dispatch(planetFetchSingleStart(planetId)),
    createPlanetComment: (commentValue: string, imageFile: File, planetId: number) => dispatch(planetcommentCreateStart(commentValue, imageFile, planetId))
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(SinglePlanetsTab);