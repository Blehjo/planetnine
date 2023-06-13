import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { Card, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { Plus, XCircle } from "react-bootstrap-icons";
import ReactLoading from "react-loading";
import { ConnectedProps, connect } from "react-redux";

import NotificationComponent from "../../components/Notification/Notification.component";
import { MessageList } from "../../components/Searchbar/MessageList.component";
import { SearchBox } from "../../components/Searchbar/SearchBox.component";
import { FavoriteCreateStart, favoriteCreateStart } from "../../store/favorite/favorite.action";
import { MessageDeleteStart, MessageFetchSingleStart, MessageFetchUserMessagesStart, MessageSetID, messageDeleteStart, messageFetchSingleStart, messageFetchUserMessagesStart, messageSetId } from "../../store/message/message.action";
import { MessageState } from "../../store/message/message.reducer";
import { MessageCommentCreateStart, MessageCommentFetchSingleStart, messagecommentCreateStart, messagecommentFetchSingleStart } from "../../store/messagecomment/messagecomment.action";
import { MessageCommentState } from "../../store/messagecomment/messagecomment.reducer";
import { MessageComment } from "../../store/messagecomment/messagecomment.types";
import { RootState } from "../../store/store";
import { UserState } from "../../store/user/user.reducer";
import { User } from "../../store/user/user.types";
import { TextBox } from "../ArtificialIntelligence/ArtificialIntelligence.styles";
import Authentication from "../Authentication/Authentication.route";
import { CollectionContainer, FormContainer, JustifyLeft, JustifyRight, MessageContainer, MessagebarContainer, RowContainer } from "./Messages.styles";

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
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClickEvent = this.handleClickEvent.bind(this);
    }

    handleClose(): void {
        this.setState({
            show: !this.state.show
        })
    }

    handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { messageValue, imageFile } = this.state;
        this.props.createMessageComment(this.props.messages.messageId!, messageValue, imageFile);
        // this.handleClose();
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

    handleDelete(messageId: number): void {
        this.props.deleteMessage(messageId);
    }

    async handleClick(messageId: number) {
        await this.props.setId(messageId);
        this.props.getMessageComments(this.props.messages?.messageId!);
    }

    onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ searchField: event.target.value });
    };

    componentDidMount(): void {
        this.props.getAllMessages();

        fetch('https://planetnineserver.azurewebsites.net/api/user')
        .then(response => response.json())
        .then(users => this.setState({ users: users }));
       
        fetch('https://planetnineserver.azurewebsites.net/api/messagecomment')
        .then(response => response.json())
        .then(messages => this.setState({ userMessages: messages }));
    }

    componentDidUpdate(prevProps: Readonly<{ messages: MessageState; messagecomments: MessageCommentState; currentUser: UserState; } & { getAllMessages: () => void; getMessage: (messageId: number) => void; getMessageComments: (messageId: number) => void; createMessageComment: (messageId: number, messageValue: string, mediaLink: File) => void; likeMessage: (messageId: number, contentType: string) => void; deleteMessage: (messageId: number) => void; setId: (messageId: number) => void; }>, prevState: Readonly<IDefaultForms>, snapshot?: any): void {
        if (this.props.currentUser.currentUser != prevProps.currentUser.currentUser) {
            fetch('https://planetnineserver.azurewebsites.net/api/messagecomment')
            .then(response => response.json())
            .then(messages => this.setState({ userMessages: messages }));
        }
    }

    render() {
        const { messageValue, searchField, show, users, userMessages } = this.state;
        const { messages, messagecomments, currentUser } = this.props;
        const filteredUsers = users.filter(user =>
            user.username?.toLowerCase().includes(searchField.toLowerCase()));
        const filteredMessages = userMessages.filter(message =>
            message.messageValue.toLowerCase().includes(searchField.toLowerCase()));
        return (
            <Fragment>
                {
                    currentUser.currentUser == null ? 
                    <Authentication/> :
                    <>
                {
                messages.isLoading || messagecomments.isLoading ? 
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <ReactLoading type="bars" color="lightgrey" height={375} width={375}/>
                </div> :
                <>
                <MessagebarContainer className="fixed-top">
                    <MessageContainer>
                        <Row xs={2} md={2} lg={1} xl={2}>
                            <Col xs={12} md={5} lg={7} xl={3}>
                                <CollectionContainer>
                                <h1>Comms<Plus size={40} style={{ cursor: 'pointer' }} /></h1>
                                    <input style={{ marginTop: '1rem', marginBottom: '1rem', borderRadius: ".1rem", width: "auto" }} onClick={this.handleClickEvent} placeholder="Search" />
                                    <Modal show={show} onHide={this.handleClickEvent}>
                                        <SearchBox onSearchChange={this.onSearchChange} />
                                        <div>
                                            {searchField.length > 0 && <MessageList users={filteredUsers} messages={filteredMessages}/>}
                                        </div>
                                    </Modal>
                                    {
                                        messages.userMessages?.map(({ messageId, messageValue, userId, messageComments, user }) => {
                                            return (
                                                <Card onClick={() => this.handleClick(messageId)} bg="dark" style={{ margin: '.2rem .2rem 1rem .2rem', cursor: 'pointer' }} key={messageId}>
                                                    <Row key={userId} xs={3}>
                                                        <Col xs={4}>
                                                            <Image style={{ borderRadius: '.4rem', margin: '.5rem', width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={user.imageLink ? `https://planetnineserver.azurewebsites.net/Images/${user.imageLink}` : "https://t3.ftcdn.net/jpg/04/37/12/40/360_F_437124090_g3px49FczWcCdl3zvGbrkxH9TdiY3yRa.jpg"} />
                                                        </Col>
                                                        <Col xs={5}>
                                                            <div style={{ alignSelf: 'flex-start' }}>
                                                                <div>
                                                                    {messageValue}
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col xs={1}>
                                                            <XCircle onClick={() => this.handleDelete(messageId)} />
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            )
                                        })
                                    }
                                </CollectionContainer>
                            </Col>
                            <Col xs={12} md={7} lg={7} xl={9}>
                                <FormContainer>
                                    <Form onSubmit={this.handleSubmit}>
                                        <RowContainer>
                                        <Row>
                                            <Col>
                                                {
                                                    messagecomments.userMessagecomments?.map(({ messageCommentId, mediaLink, imageSource, messageValue, userId, user }) => {
                                                        return (
                                                            <div>
                                                                {
                                                                userId == currentUser.currentUser?.userId ? 
                                                                <>
                                                                <JustifyRight key={messageCommentId}> 
                                                                    <Card style={{ width: '50%', padding: '.5rem' }} key={messageCommentId}>
                                                                        <Row key={userId} xs={2}>
                                                                            <Col xs={4}>
                                                                                <Image style={{ borderRadius: '.2rem', width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={user?.imageLink ? `https://planetnineserver.azurewebsites.net/Images/${user.imageLink}` : "https://t3.ftcdn.net/jpg/04/37/12/40/360_F_437124090_g3px49FczWcCdl3zvGbrkxH9TdiY3yRa.jpg"} />
                                                                            </Col>
                                                                            <Col xs={8}>
                                                                                <div style={{ color: 'black', textAlign: 'left' }}>
                                                                                    {messageValue}
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Card>
                                                                </JustifyRight> 
                                                                <JustifyRight>
                                                                    {
                                                                        mediaLink && 
                                                                        <Card style={{ width: '50%', padding: '.5rem' }}>
                                                                        <Row xs={1}>
                                                                            <Col>
                                                                                <Image fluid style={{ borderRadius: '.2rem', width: '20rem', height: '20rem', objectFit: 'cover' }} src={`https://planetnineserver.azurewebsites.net/Images/${mediaLink}`}/>
                                                                            </Col>
                                                                        </Row>
                                                                        </Card>
                                                                    }
                                                                </JustifyRight> 
                                                                </> : 
                                                                <>
                                                                <JustifyLeft key={messageCommentId}> 
                                                                    <Card style={{ width: '50%', padding: '.5rem' }} key={messageCommentId}>
                                                                        <Row key={userId} xs={2}>
                                                                            <Col xs={4}>
                                                                                <Image style={{ borderRadius: '.2rem', width: '2rem', height: '2rem', objectFit: 'cover' }} fluid src={user?.imageLink ? `https://planetnineserver.azurewebsites.net/Images/${user.imageLink}` : "https://t3.ftcdn.net/jpg/04/37/12/40/360_F_437124090_g3px49FczWcCdl3zvGbrkxH9TdiY3yRa.jpg"} />
                                                                            </Col>
                                                                            <Col xs={8}>
                                                                                <div style={{ color: 'black', textAlign: 'left' }}>
                                                                                    {messageValue}
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </Card>
                                                                </JustifyLeft>
                                                                <JustifyLeft>
                                                                    {
                                                                        mediaLink && 
                                                                        <Card style={{ width: '50%', padding: '.5rem' }}>
                                                                        <Row xs={1}>
                                                                            <Col>
                                                                                <Image fluid style={{ borderRadius: '.2rem', width: '20rem', height: '20rem', objectFit: 'cover' }} src={`https://planetnineserver.azurewebsites.net/Images/${mediaLink}`}/>
                                                                            </Col>
                                                                        </Row>
                                                                        </Card>
                                                                    }
                                                                </JustifyLeft> 
                                                                </>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Col>
                                        </Row>
                                        </RowContainer>
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
                </>
                }
                </>
            }
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return { 
        messages: state.message,
        messagecomments: state.messagecomment,
        currentUser: state.user

    };
};

const mapDispatchToProps = (dispatch: Dispatch<MessageFetchUserMessagesStart | MessageFetchSingleStart | MessageCommentCreateStart | MessageCommentFetchSingleStart | FavoriteCreateStart | MessageDeleteStart | MessageSetID>) => ({
	getAllMessages: () => dispatch(messageFetchUserMessagesStart()),
    getMessage: (messageId: number) => dispatch(messageFetchSingleStart(messageId)),
    getMessageComments: (messageId: number) => dispatch(messagecommentFetchSingleStart(messageId)),
    createMessageComment: (messageId: number, messageValue: string, mediaLink: File) => dispatch(messagecommentCreateStart(messageId, messageValue, mediaLink)),
    likeMessage: (messageId: number, contentType: string) => dispatch(favoriteCreateStart(messageId, contentType)),
    deleteMessage: (messageId: number) => dispatch(messageDeleteStart(messageId)),
    setId: (messageId: number) => dispatch(messageSetId(messageId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Messages);