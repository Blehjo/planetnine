import { ChangeEvent, Component, Dispatch, FormEvent, Fragment, MouseEventHandler } from "react";
import { Anchor, Button, ButtonGroup, Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Plus, Robot, XCircle } from "react-bootstrap-icons";
import { RootState } from "../../store/store";
import { ArtificialIntelligenceCreateStart, ArtificialIntelligenceFetchSingleStart, ArtificialIntelligenceFetchUsersStart, artificialIntelligenceCreateStart, artificialIntelligenceFetchSingleStart, artificialIntelligenceFetchUsersStart } from "../../store/artificialintelligence/artificialintelligence.action";
import { ConnectedProps, connect } from "react-redux";
import { ModalPostContainer } from "../../components/ModalPost/ModalPost.styles";
import CrewPanelComponent from "../../components/CrewPanel/CrewPanel.component";
import { AiContainer, ChatContainer, CrewContainer, DropdownContainer, FirstColumnContainer, FormContainer, HeadingContainer, TextBox, UserAiContainer } from "./ArtificialIntelligence.styles";
import { ChatDeleteStart, ChatFetchUserChatsStart, chatCreateStart, chatDeleteStart, chatFetchUserChatsStart } from "../../store/chat/chat.action";
import { ChatCommentCreateStart, ChatCommentFetchSingleStart, chatcommentCreateStart, chatcommentFetchSingleStart } from "../../store/chatcomment/chatcomment.action";

type ArtificialIntelligenceProps = ConnectedProps<typeof connector>;

interface IDefaultForms extends IChatForm {
    name: string;
    role: string;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    show: boolean;
    dropdown: string;
}

interface IChatForm {
    chatValue: string;
}

export class ArtificialIntelligence extends Component<ArtificialIntelligenceProps, IDefaultForms> {
    constructor(props: ArtificialIntelligenceProps) {
        super(props);
        this.state = {
            name: "",
            role: "",
            imageSource: "",
            imageFile: null,
            show: false,
            chatValue: "",
            dropdown: "Choose "
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.convertImages = this.convertImages.bind(this);
        this.handleGetMessages = this.handleGetMessages.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDropDown = this.handleDropDown.bind(this);
    }

    handleDropDown(name: string): void {
        this.setState({
            dropdown: name
        })
    }

    handleCommand() {

    }

    handleDelete(chatId: number): void {
        this.props.deleteChat(chatId)
    }

    handleGetMessages(chatId: number): void {
        this.props.getChatComments(chatId);
    }

    handleClick(): void {
        this.setState({
            show: !this.state.show
        })
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        })
    }

    handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { name, role, imageFile } = this.state;
        try {
            this.props.createCrewMember(name, role, imageFile);
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

    convertImages (value: string) {
        if (value.startsWith("https")) {
          const images = value.split("%3D");
          images.pop()
          return <div style={{ textAlign: 'center'}}>
            {images?.map((image) => (<img style={{ margin: '1rem', height: '20rem', width: '20rem' }} key={images.indexOf(image)} src={image + "%3D"} />))}
          </div>
        }
        return value;
    }

    componentDidMount(): void {
        this.props.getAllCrew();
        this.props.getChats();
    }

    render() {
        const { chats, chatcomments, artificialIntelligence } = this.props;
        const { show, name, role, chatValue, dropdown } = this.state;
        return (
            <Fragment>
            <AiContainer className="fixed-top">
            <UserAiContainer>
            <Row>
            <Col xs={12} md={5} lg={4} xl={3}>
                <CrewContainer>
                <h1>Artoo<Plus size={40} style={{ cursor: 'pointer' }} onClick={this.handleClick}/></h1>
                {chats.userChats ? chats.userChats.map(({ chatId, title }) => (
                    <FirstColumnContainer>
                    <HeadingContainer>
                    <Row>
                        <Col xs={8}>
                        <div onClick={() => this.handleGetMessages(chatId)} key={chatId} >
                        {title}
                        </div>
                        </Col>
                        <Col xs={3}>
                        <XCircle onClick={() => this.handleDelete(chatId)} key={chatId}/>
                        </Col>
                    </Row>
                    </HeadingContainer>
                    </FirstColumnContainer>
                )) : 
                <Card style={{ margin: '.5rem'}}>
                    <Card.Body>
                    Create An Account To Start Your Inquiries
                    </Card.Body>
                </Card>
                }
                </CrewContainer>
            </Col>
            <Col md={7} lg={8} xl={9}>
                <FormContainer>
                <Form >
                <Dropdown as={Anchor} style={{ padding: '1rem', margin: '1rem' }}>
                <DropdownContainer>
                <Dropdown.Toggle split variant="dark" id="dropdown">
                    {dropdown}
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    {
                        artificialIntelligence.userArtificialIntelligences ? artificialIntelligence.userArtificialIntelligences.map(({ artificialIntelligenceId, name, role }) => {
                            return (
                                <Dropdown.Item as={Anchor} onClick={() => this.handleDropDown(name)} key={artificialIntelligenceId?.toString()}>
                                    {name}
                                </Dropdown.Item>
                            )}) 
                            : <Dropdown.Item as={Anchor}>
                            Add Crew Members
                        </Dropdown.Item>
                    }
                </Dropdown.Menu>
                </DropdownContainer>
                </Dropdown>
                <CrewContainer>
                <Row style={{ padding: '2rem', overflowY: 'auto' }}>
                    <Col>
                    {
                        chatcomments.userChatcomments ? chatcomments.userChatcomments.map(({ chatCommentId, chatValue }) => { 
                        return (
                        <ChatContainer  key={chatCommentId}>
                            <div key={chatValue}>
                            {this.convertImages(chatValue)}
                            </div>
                        </ChatContainer>
                    )}) :
                    <Card >
                        <Card.Body>
                        <Robot style={{ margin: 'auto', display: 'flex', justifyContent: 'center', width: '50%' }} color="black" size={300}/>
                        </Card.Body>
                    </Card>
                    }
                    </Col>
                </Row>
                </CrewContainer>
                <TextBox>
                <Row  xs={2}>
                    <Col xs={8} md={10}>
                    <Form.Group className="mb-3" controlId="request">
                        <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={chatValue} name="chatValue" placeholder="Give your command" />
                    </Form.Group>
                    </Col>
                    <Col xs={2}>
                    <button className="btn btn-light" type="submit">
                        Go
                    </button>
                    </Col>
                </Row>
                </TextBox>
                </Form>
                </FormContainer>
                </Col>
                </Row>
            </UserAiContainer>
            </AiContainer>
            <Modal show={show} onHide={this.handleClose}>
                <ModalPostContainer>
                <Modal.Header closeButton>
                <Modal.Title>Data log</Modal.Title>
                </Modal.Header>
                <Form autoComplete="off" onSubmit={this.handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formName">
                    <Form.Control
                        onChange={this.handleChange}
                        name="name"
                        value={name}
                        type="name"
                        as="input"
                        placeholder="Crew member name"
                        autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRole">
                    <Form.Control
                        onChange={this.handleChange}
                        name="role"
                        value={role}
                        type="role"
                        as="input"
                        placeholder="Crew member role"
                        autoFocus
                        />
                    </Form.Group>
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
                </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-light" onClick={() => this.handleClose()}>
                    Close
                </button>
                <button type="submit" className="btn btn-light">
                    Log
                </button>
                </Modal.Footer>
                </Form>
                </ModalPostContainer>
            </Modal>
            <CrewPanelComponent/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        artificialIntelligence: state.artificialIntelligence,
        chats: state.chat,
        chatcomments: state.chatcomment
    };
};

const mapDispatchToProps = (dispatch: Dispatch<ArtificialIntelligenceFetchUsersStart | ArtificialIntelligenceFetchSingleStart | ArtificialIntelligenceCreateStart | ChatFetchUserChatsStart | ChatCommentCreateStart | ChatCommentFetchSingleStart | ChatDeleteStart>) => ({
	getAllCrew: () => dispatch(artificialIntelligenceFetchUsersStart()),
    getCrew: (userId: number ) => dispatch(artificialIntelligenceFetchSingleStart(userId)),
    createCrewMember: (name: string, role: string, imageFile: File) => dispatch(artificialIntelligenceCreateStart(name, role, imageFile)),
    sendCommand: (chatId: number, chatValue: string, imageFile: File) => dispatch(chatcommentCreateStart(chatId, chatValue, imageFile)),
    getChats: () => dispatch(chatFetchUserChatsStart()),
    getChatComments: (chatId: number) => dispatch(chatcommentFetchSingleStart(chatId)),
    deleteChat: (chatId: number) => dispatch(chatDeleteStart(chatId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ArtificialIntelligence);