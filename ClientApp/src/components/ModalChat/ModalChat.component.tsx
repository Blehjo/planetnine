import { ChangeEvent, Component, Dispatch, FormEvent, Fragment } from "react";
import { Anchor, Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Robot } from 'react-bootstrap-icons';

import { BoxChatContainer, ModalChatContainer } from "./ModalChat.styles";
import { RootState } from "../../store/store";
import { ChatCreateStart, ChatSetID, chatCreateStart, chatSetId } from "../../store/chat/chat.action";
import { ChatCommentCreateStart, chatcommentCreateStart } from "../../store/chatcomment/chatcomment.action";
import { ConnectedProps, connect } from "react-redux";
import { Chat } from "../../store/chat/chat.types";
import { addChat } from "../../utils/api/chat.api";
import { callArtoo } from "../../utils/api/completion.api";
import { DropdownContainer } from "../../routes/ArtificialIntelligence/ArtificialIntelligence.styles";
import { ArtificialIntelligenceState } from "../../store/artificialintelligence/artificialintelligence.reducer";
import { ChatState } from "../../store/chat/chat.reducer";
import { ChatCommentState } from "../../store/chatcomment/chatcomment.reducer";

type ModalChatProps = ConnectedProps<typeof connector>;

interface IModalChatProps {
    title: string;
    chatcommentValue: string;
    mediaLink: any;
    show: boolean;
    artificialId: number;
    chatId: number;
    searchField: string;
    imageFile: any;
    chatValue: string;
    dropdown: string;
}

export class ModalChat extends Component<ModalChatProps, IModalChatProps> {
    constructor(props: ModalChatProps) {
        super(props);
        this.state = {
            show: false,
            title: "",
            chatcommentValue: "",
            mediaLink: null,
            artificialId: 0,
            chatId: 0,
            searchField: "",
            imageFile: null,
            chatValue: "",
            dropdown: "Choose"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropDown = this.handleDropDown.bind(this);
        this.speakWith = this.speakWith.bind(this);
    }

    handleDropDown(name: string, artificialId: number): void {
        this.setState({
            dropdown: name,
            artificialId: artificialId
        })
    }
    
    handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        this.setState({
            ...this.state, [name]: value
        })
    }

    handleClick() {
        this.setState({
            show: !this.state.show
        })
    }

    handleClose() {
        this.setState({
            show: !this.state.show
        })
    }

    handleSubmit() {
        const { title, artificialId, chatcommentValue, chatValue, mediaLink } = this.state;
        const { chats } = this.props;
        this.props.createChat(title, artificialId);
        const chatId = chats.singleChat?.chatId ? chats.singleChat.chatId : 0;
        this.props.createChatComment(chatId, chatValue, mediaLink)
        this.handleClose();
    }

    async speakWith(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("State: ",this.state)
        const { artificialId, chatValue, chatId, imageFile } = this.state;
        const { chats } = this.props;
        try {
            if (chats.chatId == null) {
                await addChat(chatValue, artificialId)
                .then((response) => this.props.setId(response.chatId))
                .then((response) => this.props.createChatComment(this.props.chats.chatId!, chatValue, imageFile));

                await callArtoo(chatValue)
                .then((response) => this.props.createChatComment(this.props.chats.chatId!, response.data, imageFile));
            } else {
                this.props.createChatComment(this.props.chats.chatId!, chatValue, imageFile);

                await callArtoo(chatValue)
                .then((response) => this.props.createChatComment(this.props.chats.chatId!, response.data, imageFile));
            }
        } catch (error: any) {
            if (error) {
                alert(error)
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<{ artificialIntelligence: ArtificialIntelligenceState; chats: ChatState; chatcomments: ChatCommentState; } & { createChat: (title: string, artificialIntelligenceId: number) => void; createChatComment: (chatId: number, chatValue: string, imageFile: File) => void; setId: (chatId: number) => void; }>, prevState: Readonly<IModalChatProps>, snapshot?: any): void {
        if (this.props.chatcomments.chatcomments?.length != prevProps.chatcomments.chatcomments?.length) {
            this.setState({
                chatValue: ""
            })
        }
    }

    render() {
        const { show, chatValue, dropdown } = this.state;
        const { artificialIntelligence, chats, chatcomments } = this.props;
        return(
            <Fragment>
                <BoxChatContainer>
                    <Robot className="bg-danger rounded modalIcon" onClick={() => this.handleClick()}/>
                </BoxChatContainer>
                <Modal show={show} onHide={() => this.handleClose()}>
                    <ModalChatContainer>
                    <Modal.Header closeButton>
                    <Modal.Title>Inquiry</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.speakWith}>
                    <Modal.Body>
                        <Dropdown as={Anchor} style={{ padding: '1rem', margin: '1rem', width: '80%' }}>
                        {/* <DropdownContainer> */}
                        <Dropdown.Toggle split variant="dark" id="dropdown">
                            {dropdown}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            {
                                artificialIntelligence.userArtificialIntelligences ? artificialIntelligence.userArtificialIntelligences.map(({ artificialIntelligenceId, name, role }) => {
                                    return (
                                        <Dropdown.Item as={Anchor} onClick={() => this.handleDropDown(name, artificialIntelligenceId)} key={artificialIntelligenceId?.toString()}>
                                            {`${name}   `}
                                        </Dropdown.Item>
                                    )}) 
                                : <Dropdown.Item as={Anchor}>
                                    Add Crew Members
                                </Dropdown.Item>
                            }
                        </Dropdown.Menu>
                        {/* </DropdownContainer> */}
                        </Dropdown>
                        <Form.Group
                        className="mb-3"
                        controlId="formInquiry"
                        placeholder="inquire with your crew"
                        >
                        <Form.Control
                            style={{ height: '.5rem' }}
                            name="chatValue"
                            value={chatValue}
                            onChange={this.handleChange}
                            as="textarea" rows={3} 
                            placeholder="Give your command"
                        />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <div className="btn btn-secondary" onClick={this.handleClose}>
                        Close
                    </div>
                    <input value="Log" type="submit" className="btn btn-primary" />
                    </Modal.Footer>
                    </Form>
                    </ModalChatContainer>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    artificialIntelligence: state.artificialIntelligence,
    chats: state.chat,
    chatcomments: state.chatcomment
});

const mapDispatchToProps = (dispatch: Dispatch<ChatCreateStart | ChatCommentCreateStart | ChatSetID>) => ({
    createChat: (title: string, artificialIntelligenceId: number) => dispatch(chatCreateStart(title, artificialIntelligenceId)),
    createChatComment: (chatId: number, chatValue: string, imageFile: File) => dispatch(chatcommentCreateStart(chatId, chatValue, imageFile)),
    setId: (chatId: number) => dispatch(chatSetId(chatId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ModalChat);