import { ChangeEvent, Component, Dispatch, Fragment } from "react"
import { ConnectedProps, connect } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Badge, Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { ArrowsFullscreen } from "react-bootstrap-icons";

import { FixedMoonContainer, MoonPanelContainer } from "./Moon.styles"
import NotificationComponent from "../Notification/Notification.component"
import { RootState } from "../../store/store";
import { MoonFetchAllStart, MoonFetchSingleStart, moonFetchAllStart, moonFetchSingleStart } from "../../store/moon/moon.action";
import { CommentContainer, FormContainer, ModalContainer, PostContainer, TextContainer } from "../Post/Post.styles";
import { BadgeContainer } from "../Pilots/Pilots.styles";
import { CardContainer } from "../Notification/Notifications.styles";
import { utcConverter } from "../../utils/date/date.utils";
import { MoonCommentCreateStart, MoonCommentFetchSingleStart, moonCommentCreateStart, moonCommentFetchSingleStart } from "../../store/mooncomment/mooncomment.action";

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

    postComment() {
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
    render() {
        const { moons, mooncomments } = this.props;
        const { show } = this.state;
        return (
            <Fragment>
                <FixedMoonContainer className="fixed-top">
                    <MoonPanelContainer>
                        <h1>Moons</h1>
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}
                        >
                            <Masonry>
                            {moons.moons?.map(({ moonId, moonName, perihelion, aphelion, moonMass, temperature, gravity }, index) => {
                                return <PostContainer key={index}>
                                    <Card className="bg-dark" key={index}>
                                        <Card.Img src={"https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"}/>
                                        <Card.ImgOverlay>
                                            <BadgeContainer>
                                                <Badge style={{ color: 'black' }} bg="light"><ArrowsFullscreen onClick={() => this.fetchMoon(moonId)} style={{ cursor: 'pointer' }} size={15}/></Badge>
                                            </BadgeContainer>
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
                </FixedMoonContainer>
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
                                src={moons.singleMoon?.imageLink ? moons.singleMoon?.imageLink : "https://i.pinimg.com/originals/8e/47/2a/8e472a9d5d7d25f4a88281952aed110e.png"} 
                            />
                            </Col>
                            <Col>
                            <div>Comments</div>
                            <CommentContainer>
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
                            </CommentContainer>
                            <FormContainer>
                            <Form style={{ margin: 'auto' }} key={moons.singleMoon?.moonId} onSubmit={this.postComment}>
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
                                        <button id={moons.singleMoon?.moonId.toString()} style={{ textAlign: 'center', width: '100%', height: '100%'}} className="btn btn-light" type="submit">
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
                    <a href={`/singlemoon/${moons.singleMoon?.moonId}`} className="btn btn-dark">
                        Single View
                    </a>
                    </Modal.Footer>
                    </ModalContainer>
                </Modal>
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