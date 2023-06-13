import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { Badge, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { Envelope, Globe, Person, Rocket, Send } from 'react-bootstrap-icons';
import ReactLoading from "react-loading";
import { ConnectedProps, connect } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { MessageCreateStart, MessageSetID, messageCreateStart, messageSetId } from "../../store/message/message.action";
import { MessageCommentCreateStart, messagecommentCreateStart } from "../../store/messagecomment/messagecomment.action";
import { PilotFetchAllStart, PilotFetchSingleStart, pilotFetchAllStart, pilotFetchSingleStart } from "../../store/pilot/pilot.action";
import { RootState } from "../../store/store";
import { addMessage } from "../../utils/api/message.api";
import { BadgeContainer, PilotContainer } from "./Pilots.styles";

type PilotProps = ConnectedProps<typeof connector>;

type PilotStates = {
    openModal: boolean;
    messageValue: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
}

export class Pilots extends Component<PilotProps, PilotStates> {
    constructor(props: PilotProps) {
        super(props);
        this.handleMessage = this.handleMessage.bind(this);
        this.openMessage = this.openMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            openModal: false,
            messageValue: "",
            imageSource: "",
            imageFile: null
        }
    }

    handleClick(userId: number): void {
        this.props.getPilot(userId);
    }

    openMessage() {
        this.setState({
            openModal: !this.state.openModal
        })
    }

    async handleMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { messageValue, imageFile } = this.state;
        const { singlePilot } = this.props.pilots;

        await addMessage(singlePilot?.username!)
        .then((response) => this.props.setId(response.messageId));

        this.props.createMessageComment(this.props.messages.messageId!, messageValue, imageFile);

        this.openMessage();

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
        this.props.getAllPilots();
    }

    render() {
        const { pilots } = this.props;
        const { openModal } = this.state;
        return (
            <Fragment>
                {
                pilots.isLoading ? 
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <ReactLoading type="bars" color="lightgrey" height={375} width={375}/>
                </div> :
                <>
                <h1>Pilots</h1>
                <p>Take a look at your fellow Pilots</p>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 3, 1050: 4 }}
                >
                    <Masonry>
                    {pilots.pilots?.map(({ username, about, imageLink, imageSource, planets, followers, userId }, index) => {
                        return <PilotContainer key={index}>
                            <Card className="bg-dark" key={index}>
                                <Card.Img src={imageLink ? imageSource : "https://t3.ftcdn.net/jpg/04/37/12/40/360_F_437124090_g3px49FczWcCdl3zvGbrkxH9TdiY3yRa.jpg"}/>
                                <Card.ImgOverlay>
                                <div style={{ cursor: "pointer", position: "absolute", left: "0", top: "0" }}>
                                    <BadgeContainer>
                                    <a href={`/profile/${userId}`}>
                                        <Badge style={{ color: 'black' }} bg="light"><Person style={{ cursor: 'pointer' }} size={15}/></Badge>
                                    </a>
                                    </BadgeContainer>
                                    <BadgeContainer>
                                        <Badge style={{ color: 'black' }} bg="light">
                                            <Envelope 
                                                style={{ cursor: 'pointer' }} 
                                                onClick={() => {
                                                    this.handleClick(userId);
                                                    this.openMessage();
                                                }} 
                                                size={15}
                                            />
                                        </Badge>
                                    </BadgeContainer>
                                    {
                                        planets && 
                                        <BadgeContainer>
                                            <Badge style={{ color: 'black' }} bg="light">
                                            <Globe size={15}/>
                                            {` ${planets}`}
                                            </Badge>
                                        </BadgeContainer> 
                                    }
                                    {
                                        followers && 
                                        <BadgeContainer>
                                            <Badge style={{ color: 'black' }} bg="light">
                                            <Rocket size={15}/>
                                            {` ${followers}`}
                                            </Badge>
                                        </BadgeContainer>
                                    }
                                    </div>
                                </Card.ImgOverlay>
                                <Card.Body>
                                    <Card.Text>{username}</Card.Text>
                                    <Card.Text>{about}</Card.Text>
                                </Card.Body>
                            </Card>
                        </PilotContainer>
                    })}
                    </Masonry>
                </ResponsiveMasonry>
                <Modal show={openModal} onHide={this.openMessage}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ color: 'black' }}>Send a message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleMessage}>
                            <Row style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.Control style={{ height: '.5rem' }} name="messageValue" as="textarea" onChange={this.handleChange} placeholder=" Write your message here" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Col xs={9}>
                                    <Form.Group className="mb-3" controlId="formMedia">
                                        <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <button id={"post?.postId.toString()"} style={{ textAlign: 'center', width: '100%', height: 'auto'}} className="btn btn-light" type="submit">
                                        <Send/>
                                    </button>
                                </Col>                
                            </Row>
                        </Form>
                    </Modal.Body>
                </Modal>
                </>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        pilots: state.pilot,
        messages: state.message
    };
};

const mapDispatchToProps = (dispatch: Dispatch<PilotFetchAllStart | MessageSetID | PilotFetchSingleStart | MessageCreateStart | MessageCommentCreateStart>) => ({
	getAllPilots: () => dispatch(pilotFetchAllStart()),
    getPilot: (userId: number ) => dispatch(pilotFetchSingleStart(userId)),
    sendMessage: (messageValue: string) => dispatch(messageCreateStart(messageValue)),
    createMessageComment: (messageId: number, messageValue: string, mediaLink: File) => dispatch(messagecommentCreateStart(messageId, messageValue, mediaLink)),
    setId: (messageId: number) => dispatch(messageSetId(messageId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Pilots);