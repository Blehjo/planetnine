import { Component } from "react";
import { MessageContainer } from "./Message.styles";

export class Message extends Component {
    render() {
        return(
            <MessageContainer>
                <h1>Messages</h1>
            </MessageContainer>
        );
    }
}