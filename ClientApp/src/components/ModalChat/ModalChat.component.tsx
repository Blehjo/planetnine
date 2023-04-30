import { ChangeEvent, Component, Dispatch, Fragment } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Robot } from 'react-bootstrap-icons';

import { BoxChatContainer, ModalChatContainer } from "./ModalChat.styles";
import { RootState } from "../../store/store";
import { ChatCreateStart, chatCreateStart } from "../../store/chat/chat.action";
import { ChatCommentCreateStart, chatcommentCreateStart } from "../../store/chatcomment/chatcomment.action";
import { ConnectedProps, connect } from "react-redux";
import { Chat } from "../../store/chat/chat.types";

type ModalChatProps = ConnectedProps<typeof connector>;

interface IModalChatProps {
    title: string;
    chatcommentValue: string;
    mediaLink: any;
    show: boolean;
}

export class ModalChat extends Component<ModalChatProps, IModalChatProps> {
    constructor(props: ModalChatProps) {
        super(props);
        this.state = {
            show: false,
            title: "",
            chatcommentValue: "",
            mediaLink: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const { title, chatcommentValue, mediaLink } = this.state;
        const { chats } = this.props;
        this.props.createChat(title);
        const chatId = chats.singleChat?.chatId ? chats.singleChat.chatId : 0;
        this.props.createChatComment(chatId, chatcommentValue, mediaLink)
        this.handleClose();
    }

    render() {
        const { show, title, chatcommentValue } = this.state;
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
                    <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formMember">
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Inquiry request subject"
                            autoFocus
                            value={title}
                            onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="formInquiry"
                        placeholder="inquire with your crew"
                        >
                        <Form.Control
                            name="chatcommentValue"
                            value={chatcommentValue}
                            onChange={this.handleChange}
                            as="textarea" rows={3} 
                        />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => this.handleClose()}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={() => this.handleSubmit()}>
                        Log
                    </button>
                    </Modal.Footer>
                    </ModalChatContainer>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    chats: state.chat
});

const mapDispatchToProps = (dispatch: Dispatch<ChatCreateStart | ChatCommentCreateStart>) => ({
    createChat: (title: string) => dispatch(chatCreateStart(title)),
    createChatComment: (chatId: number, chatValue: string | null, imageFile: File | null) => dispatch(chatcommentCreateStart(chatId, chatValue, imageFile))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ModalChat);