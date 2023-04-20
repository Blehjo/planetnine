import { Component, Fragment } from "react";
import PostComponent from "../../components/Post/Post.component";
import InteractionComponent from "../../components/Interaction/Interaction.component";

export interface IPost {
    postId: number;
    postValue: string;
    mediaLink: string;
    type: string;
    dateCreated: Date;
    userId: number;
    comments: number;
    favorites: number;
}

export class Posts extends Component {
    render() {
        return (
            <Fragment>
                <PostComponent/>
            </Fragment>
        )
    }
}