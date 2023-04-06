import { Component } from "react";
import { CommentBarContainer, CommentContainer } from "./Comment.styles";

export class Comment extends Component {
    render() {
        return(
            <CommentBarContainer className="fixed-top">
                <CommentContainer>
                    <h1>Comments</h1>
                </CommentContainer>
            </CommentBarContainer>
        );
    }
}