import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { Badge, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { ArrowsFullscreen, Send } from "react-bootstrap-icons";
import ReactLoading from "react-loading";
import { ConnectedProps, connect } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { MoonFetchAllStart, MoonFetchSingleStart, moonFetchAllStart, moonFetchSingleStart } from "../../store/moon/moon.action";
import { MoonState } from "../../store/moon/moon.reducer";
import { MoonCommentCreateStart, MoonCommentFetchSingleStart, moonCommentCreateStart, moonCommentFetchSingleStart } from "../../store/mooncomment/mooncomment.action";
import { MoonCommentState } from "../../store/mooncomment/mooncomment.reducer";
import { RootState } from "../../store/store";
import { utcConverter } from "../../utils/date/date.utils";
import NotificationComponent from "../Notification/Notification.component";
import { CardContainer } from "../Notification/Notifications.styles";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { CommentContainer, ModalContainer, PostContainer, TextContainer } from "../Post/Post.styles";
import { MoonPanelContainer } from "./Moon.styles";

type MoonProps = ConnectedProps<typeof connector>;

interface IDefaultForm {
    show: boolean;
    imageFile: any;
    imageSource: string | ArrayBuffer | null | undefined;
    commentValue: string;
}

export class Moon extends Component<MoonProps, IDefaultForm> {
    constructor(props: MoonProps) {
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
        this.fetchMoon = this.fetchMoon.bind(this);
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
        const { moons } = this.props;
        const moonId = moons.singleMoon?.moonId ? moons.singleMoon.moonId : 0
        this.props.createComment(commentValue, imageFile, moonId);
    }

    fetchMoon(moonId: number): void {
        this.props.getMoon(moonId);
        this.props.getComments(moonId);
        this.setState({
            show: !this.state.show
        });
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
        this.props.getMoons();
    }

    componentDidUpdate(prevProps: Readonly<{ moons: MoonState; mooncomments: MoonCommentState; } & { getMoons: () => void; getMoon: (moonId: number) => void; getComments: (moonId: number) => void; createComment: (commentValue: string, imageFile: File, moonId: number) => void; }>, prevState: Readonly<IDefaultForm>, snapshot?: any): void {
        if (this.props.moons.userMoons?.length != prevProps.moons.userMoons?.length) {
            this.props.getComments(this.props.moons.singleMoon?.moonId!);
        }
    }
    render() {
        const { moons, mooncomments } = this.props;
        const { show } = this.state;
        return (
            <Fragment>
                {
                moons.isLoading || mooncomments.isLoading ? 
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <ReactLoading type="bars" color="lightgrey" height={375} width={375}/>
                </div> :
                <>
                <MoonPanelContainer>
                    <h1>Moons</h1>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}
                    >
                        <Masonry>
                        {moons.moons?.map(({ moonId, moonName, imageLink, perihelion, aphelion, moonMass, temperature, gravity }, index) => {
                            return <PostContainer key={index}>
                                <Card className="bg-dark" key={index}>
                                    <Card.Img src={imageLink ? imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                                    <Card.ImgOverlay>
                                    <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                                        <BadgeContainer>
                                            <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen onClick={() => this.fetchMoon(moonId)} style={{ cursor: 'pointer' }} size={15}/></Badge>
                                        </BadgeContainer>
                                    </div>
                                    </Card.ImgOverlay>
                                    <Card.Body>
                                        <Card.Text>{moonName}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </PostContainer>
                        })}
                        </Masonry>
                    </ResponsiveMasonry>
                </MoonPanelContainer>
                <NotificationComponent/>
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
                                src={moons.singleMoon?.imageLink ? moons.singleMoon?.imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                            />
                            <Card style={{ marginTop: "1rem" }} className="bg-dark" key={moons.singleMoon?.moonId}>
                                <TextContainer>
                                {moons.singleMoon?.brief}
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
                    <a href={`/singlemoon/${moons.singleMoon?.moonId}`} className="btn btn-dark">
                        Single View
                    </a>
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
        moons: state.moon,
        mooncomments: state.mooncomment
    }
};

const mapDispatchToProps = (dispatch: Dispatch<MoonFetchAllStart | MoonFetchSingleStart | MoonCommentCreateStart | MoonCommentFetchSingleStart>) => ({
    getMoons: () => dispatch(moonFetchAllStart()),
    getMoon: (moonId: number) => dispatch(moonFetchSingleStart(moonId)),
    getComments: (moonId: number) => dispatch(moonCommentFetchSingleStart(moonId)),
    createComment: (commentValue: string, imageFile: File, moonId: number) => dispatch(moonCommentCreateStart(commentValue, imageFile, moonId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Moon);