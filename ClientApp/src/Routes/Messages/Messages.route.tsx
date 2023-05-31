import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { CollectionContainer, FormContainer, MessageContainer, MessagebarContainer, UserMessageContainer } from "./Messages.styles";
import NotificationComponent from "../../components/Notification/Notification.component";
import { RootState } from "../../store/store";
import { MessageDeleteStart,  MessageFetchSingleStart, messageDeleteStart } from "../../store/message/message.action";
import { MessageCommentFetchSingleStart, messagecommentFetchSingleStart } from "../../store/messagecomment/messagecomment.action";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { messageFetchUserMessagesStart } from "../../store/message/message.action";
import { MessageFetchUserMessagesStart } from "../../store/message/message.action";
import { messageFetchSingleStart } from "../../store/message/message.action";
import { ConnectedProps, connect } from "react-redux";
import { Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { Plus, XCircle } from "react-bootstrap-icons";
import { TextBox } from "../ArtificialIntelligence/ArtificialIntelligence.styles";
import { SearchBox } from "../../components/Searchbar/SearchBox.component";
import { CardList } from "../../components/Searchbar/CardList.component";
import { User } from "../../store/user/user.types";
import { MessageList } from "../../components/Searchbar/MessageList.component";
import { Message } from "../../store/message/message.types";
import { MessageComment } from "../../store/messagecomment/messagecomment.types";

type MessagesProps = ConnectedProps<typeof connector>;

interface IDefaultForms extends IMessageForm {
    users: User[];
    userMessages: MessageComment[];
    messageId: number;
    show: boolean;
    imageSource: string | ArrayBuffer | null | undefined;
    imageFile: any;
    searchField: string;
}

interface IMessageForm {
    messageValue: string;
}

export class Messages extends Component<MessagesProps, IDefaultForms> {
    constructor(props: MessagesProps) {
        super(props);
        this.state = {
            users: [],
            userMessages: [],
            messageId: 0,
            show: false,
            imageSource: "",
            imageFile: null,
            messageValue: "",
            searchField: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showPreview = this.showPreview.bind(this);
        this.convertImages = this.convertImages.bind(this);
        this.handleGetMessages = this.handleGetMessages.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClickEvent = this.handleClickEvent.bind(this);
    }

    handleGetMessages(chatId: number): void {
        // this.props.getChatComments(chatId);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        })
    }

    handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { messageValue, imageFile } = this.state;
        this.handleClose();
    }

    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }

    handleClickEvent() {
        this.setState({ show: !this.state.show });
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

    // componentDidUpdate(prevProps: Readonly<{ artificialIntelligence: ArtificialIntelligenceState; chats: ChatState; chatcomments: ChatCommentState; } & { getAllCrew: () => void; getCrew: (userId: number) => void; createCrewMember: (name: string, role: string, imageFile: File) => void; createChat: (title: string, artificialId: number) => void; createComment: (chatId: number, chatValue: string, imageFile: File) => void; getChats: () => void; getChatComments: (chatId: number) => void; deleteChat: (chatId: number) => void; }>, prevState: Readonly<IDefaultForms>, snapshot?: any): void {

    // }

    handleDelete(messageId: number): void {
        this.props.deleteMessage(messageId);
    }

    handleClick(messageId: number): void {
        this.props.getMessage(messageId);
    }

    onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ searchField: event.target.value });
    };

    componentDidMount(): void {
        this.props.getAllMessages();

        fetch('https://planetnineservers.azurewebsites.net/api/user')
        .then(response => response.json())
        .then(users => this.setState({ users: users }));
       
        fetch('https://planetnineservers.azurewebsites.net/api/messagecomment')
        .then(response => response.json())
        .then(messages => this.setState({ userMessages: messages }));
    }

    render() {
        const { messageValue, searchField, show, users, userMessages } = this.state;
        const { messages, messagecomments } = this.props;
        const filteredUsers = users.filter(user =>
            user.username?.toLowerCase().includes(searchField.toLowerCase()));
        const filteredMessages = userMessages.filter(message =>
            message.messageValue.toLowerCase().includes(searchField.toLowerCase()));
        return (
            <Fragment>
                <MessagebarContainer className="fixed-top">
                    <MessageContainer>
                        <Row>
                            <Col xs={12} md={5} lg={4} xl={3}>
                                <CollectionContainer>
                                <h1>Messages<Plus size={40} style={{ cursor: 'pointer' }} /></h1>
                                    <input style={{ marginTop: '1rem', borderRadius: ".1rem", width: "auto" }} onClick={this.handleClickEvent} placeholder="Search" />
                                    <Modal show={show} onHide={this.handleClickEvent}>
                                        <SearchBox onSearchChange={this.onSearchChange} />
                                        <div>
                                            {searchField.length > 0 && <MessageList users={filteredUsers} messages={filteredMessages}/>}
                                        </div>
                                    </Modal>
                                    {
                                        messages.userMessages?.map(({ messageId, messageValue, userId, messageComments, user }) => {
                                            return (
                                                <Card bg="dark" style={{ margin: '1rem', cursor: 'pointer' }} key={messageId}>
                                                    <Row key={userId} xs={3}>
                                                        <Col xs={2}>
                                                            <Image style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={user.imageLink ? `https://planetnineservers.azurewebsites.net/Images/${user.imageLink}` : "https://t3.ftcdn.net/jpg/04/37/12/40/360_F_437124090_g3px49FczWcCdl3zvGbrkxH9TdiY3yRa.jpg"} />
                                                        </Col>
                                                        <Col xs={7}>
                                                            <div onClick={() => this.handleClick(messageId)}>
                                                                {messageValue}
                                                            </div>
                                                        </Col>
                                                        <Col xs={2}>
                                                            <XCircle onClick={() => this.handleDelete(messageId)} />
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            )
                                        })
                                    }
                                </CollectionContainer>
                            </Col>
                            <Col md={7} lg={8} xl={9}>
                                <FormContainer>
                                    <Form>
                                        <Row style={{ padding: '2rem', overflowY: 'auto' }}>
                                            <Col>
                                                {
                                                    messagecomments.messagecomments?.map(({ messageCommentId, mediaLink, messageValue, userId, user }) => {
                                                        return (
                                                            <Card key={messageCommentId}>
                                                                <Row key={userId} xs={2}>
                                                                    <Col xs={2}>
                                                                        <Image style={{ width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={user?.imageLink ? `https://planetnineservers.azurewebsites.net/Images/${user.imageLink}` : "https://t3.ftcdn.net/jpg/04/37/12/40/360_F_437124090_g3px49FczWcCdl3zvGbrkxH9TdiY3yRa.jpg"} />
                                                                    </Col>
                                                                    <Col xs={8}>
                                                                        {messageValue}
                                                                    </Col>
                                                                </Row>
                                                            </Card>
                                                        )
                                                    })
                                                }
                                            </Col>
                                        </Row>
                                        <TextBox>
                                            <Row xs={2}>
                                                <Col xs={9} sm={10} md={8} lg={8} xl={10}>
                                                    <Form.Group className="mb-3" controlId="request">
                                                        <Form.Control style={{ height: '.5rem' }} as="textarea" onChange={this.handleChange} value={messageValue} name="messageValue" placeholder="Write a message" />
                                                    </Form.Group>
                                                    <Row style={{ justifyContent: 'center' }}>
                                                        <Col xs={12}>
                                                            <Form.Group className="mb-3" controlId="formMedia">
                                                                <Form.Control onChange={this.showPreview} name="mediaLink" as="input" accept="image/*" type="file" placeholder="Media" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={2} md={2} lg={2}>
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
                    </MessageContainer>
                </MessagebarContainer>
                <NotificationComponent />
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        messages: state.message,
        messagecomments: state.messagecomment 
    };
};

const mapDispatchToProps = (dispatch: Dispatch<MessageFetchUserMessagesStart | MessageFetchSingleStart | MessageCommentFetchSingleStart | FavoriteCreateStart | MessageDeleteStart>) => ({
	getAllMessages: () => dispatch(messageFetchUserMessagesStart()),
    getMessage: (messageId: number) => dispatch(messageFetchSingleStart(messageId)),
    getMessageComments: (messageId: number) => dispatch(messagecommentFetchSingleStart(messageId)),
    likeMessage: (messageId: number, contentType: string) => dispatch(favoriteCreateStart(messageId, contentType)),
    deleteMessage: (messageId: number) => dispatch(messageDeleteStart(messageId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Messages);