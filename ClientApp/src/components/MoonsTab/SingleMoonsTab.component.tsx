import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from 'react';
import { Card, Row, Col, Modal, Form, Image, Badge } from 'react-bootstrap';
import { ModalPostContainer } from '../ModalPost/ModalPost.styles';
import { CardContainer, CommentContainer, ModalContainer, PostContainer, TextContainer } from '../Post/Post.styles';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { BadgeContainer } from '../Pilots/Pilots.styles';
import { ArrowsFullscreen, Chat, Rocket, Send } from 'react-bootstrap-icons';
import { utcConverter } from '../../utils/date/date.utils';
import { ConnectedProps, connect } from 'react-redux';
import { MoonCreateStart, MoonFetchOtherUserMoonsStart, MoonFetchSingleStart, moonFetchOtherUserMoonsStart, moonFetchSingleStart } from '../../store/moon/moon.action';
import { MoonCommentCreateStart, MoonCommentFetchSingleStart, moonCommentCreateStart, moonCommentFetchSingleStart } from '../../store/mooncomment/mooncomment.action';
import { RootState } from '../../store/store';

interface IMoonFields extends IMoonComment{
    moonName: string;
    moonMass: string;
    perihelion: string;
    aphelion: string;
    gravity: string;
    temperature: string;
    imageLink: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    planetId: number | null;
    showCreate: boolean;
    show: boolean;
}

interface IMoonComment {
    commentValue: string;
}

export type ProfileProps = ConnectedProps<typeof connector>;

type UserInfo = ProfileProps & {
    userId?: number;
}

export class SingleMoonsTab extends Component<UserInfo, IMoonFields> {
    constructor(props: UserInfo) {
        super(props);
        this.state = {
            moonName: "",
            moonMass: "",
            perihelion: "",
            aphelion: "",
            gravity: "",
            temperature: "",
            imageLink: "",
            imageSource: "",
            imageFile: null,
            planetId: null,
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
        const { moons } = this.props;
        const moonId = moons.singleMoon?.moonId ? moons.singleMoon.moonId : 0
        this.props.createMoonComment(commentValue, imageFile, moonId);
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

    handleClick(moonId: number): void {
        this.props.getMoon(moonId);
        this.props.getMoonComments(moonId);
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
        this.props.getMoons(this.props.userId!);
    }

    componentDidUpdate(prevProps: Readonly<UserInfo>, prevState: Readonly<IMoonFields>, snapshot?: any): void {
        if (this.props.moons.userMoons?.length != prevProps.moons.userMoons?.length) {
            this.props.getMoonComments(this.props.moons.singleMoon?.moonId!);
        }
    }

    render() {
        const { show, showCreate, moonName, moonMass, perihelion, aphelion, gravity, temperature, planetId } = this.state;
        const { moons, mooncomments } = this.props;
        return (
            <Fragment>
            {
                moons.moons?.length ?
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 2, 750: 3, 900: 3, 1050: 4}}
                >
                <Masonry>
                {moons.moons?.map(({ moonId, moonName, moonMass, perihelion, aphelion, gravity, temperature, planetId, imageLink, imageSource, favorites, type }, index) => {
                    return <PostContainer key={index}>
                        <Card className="bg-dark" key={index}>
                            <Card.Img src={imageLink ? imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                            <Card.ImgOverlay>
                            <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                                <BadgeContainer>
                                    <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen style={{ cursor: 'pointer' }} onClick={() => this.handleClick(moonId)} size={15}/></Badge>
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
                                <Card.Text>{moonName}</Card.Text>
                            </Card.Body>
                        </Card>
                    </PostContainer>
                })}
                </Masonry>
            </ResponsiveMasonry> : 
            <Col xs={12}>
                <Card style={{ color: 'white', textAlign: 'center', padding: "1rem" }} className="bg-dark">
                    <Card.Title>"Stay tuned. Currently no moons..."</Card.Title>
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
                <Modal.Title >{moons.singleMoon?.moonName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={8}>
                    <Image
                        fluid
                        style={{ borderRadius: '.2rem', objectFit: 'cover', width: '30rem', height: '30rem' }}
                        src={moons.singleMoon?.imageLink ? moons.singleMoon?.imageSource : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                    />
                    <Card style={{ marginTop: "1rem" }} className="bg-dark" key={moons.singleMoon?.moonId}>
                        <TextContainer>
                        {moons.singleMoon?.moonName}
                        </TextContainer>
                    </Card>
                    </Col>
                    <Col>
                    <CommentContainer>
                    <div>Comments</div>
                    <div style={{ height: "65%", overflowY: "auto" }}>
                    {
                        mooncomments.mooncomments?.map(({ moonCommentId, commentValue, mediaLink, dateCreated }) => {
                            return <CardContainer>
                                <Card className="bg-dark" key={moonCommentId}>
                                    <TextContainer>
                                        <Card.Text>{commentValue}</Card.Text>
                                        <Card.Text>{utcConverter(dateCreated)}</Card.Text>
                                    </TextContainer>
                                </Card>
                            </CardContainer>
                        })
                    }
                     </div>
                            <Form style={{ margin: 'auto', position: "absolute", bottom: "0" }} key={moons.singleMoon?.moonId} onSubmit={this.postComment}>
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
                                        <button id={moons.singleMoon?.moonId.toString()} style={{ textAlign: 'center', width: '100%', height: '100%'}} className="btn btn-light" type="submit">
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
            <a className="btn btn-dark" href={`/singlemoon/${moons.singleMoon?.moonId}`}>
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

const mapDispatchToProps = (dispatch: Dispatch<MoonCreateStart |  MoonFetchOtherUserMoonsStart | MoonCommentFetchSingleStart | MoonFetchSingleStart | MoonCommentCreateStart>) => ({
    createMoonComment: (commentValue: string, imageFile: File, postId: number) => dispatch(moonCommentCreateStart(commentValue, imageFile, postId)),
    getMoonComments: (moonId: number) => dispatch(moonCommentFetchSingleStart(moonId)),
    getMoons: (userId: number) => dispatch(moonFetchOtherUserMoonsStart(userId)),
    getMoon: (moonId: number) => dispatch(moonFetchSingleStart(moonId)) 
});

export const connector = connect(mapToStateProps, mapDispatchToProps);

export default connector(SingleMoonsTab);