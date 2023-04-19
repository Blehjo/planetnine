import { Component, Dispatch, Fragment } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Robot } from 'react-bootstrap-icons';

import { BoxChatContainer, ModalChatContainer } from "./ModalChat.styles";
import { RootState } from "../../store/store";
import { ChatCreateStart, chatCreateStart } from "../../store/chat/chat.action";
import { ChatCommentCreateStart, chatcommentCreateStart } from "../../store/chatcomment/chatcomment.action";
import { ConnectedProps, connect } from "react-redux";
import { Chat } from "../../store/chat/chat.types";

type ModalChatProps = ConnectedProps<typeof connector>;

export class ModalChat extends Component<ModalChatProps> {
    state = {
        show: false,
        title: "",
        chatcommentValue: "",
        mediaLink: null
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
        return this.props.createChat(title)
        // .toPromise()
        // .then((response: Chat) => this.props.createChatComment(response.chatId, chatcommentValue, mediaLink))
    }

    render() {
        const { show } = this.state;
        return(
            <Fragment>
                <BoxChatContainer>
                    <Robot onClick={() => this.handleClick()} size={55}/>
                </BoxChatContainer>
                <Modal show={show} onHide={() => this.handleClose()}>
                    <ModalChatContainer>
                    <Modal.Header closeButton>
                    <Modal.Title>Inquiry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formMember">
                        <Form.Control
                            type="text"
                            placeholder="Inquiry request subject"
                            autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="formInquiry"
                        placeholder="inquire with your crew"
                        >
                        <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.handleSubmit()}>
                        Log
                    </Button>
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