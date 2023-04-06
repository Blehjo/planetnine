import { Component, Fragment } from "react";
import { getAllPosts } from "../../utils/api/post.api";
import { Post } from "../../store/post/post.types";
import { PostComponent } from "../../components/Post/Post.component";

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
    state = {
        post: "hello"
    }

    async getContent(): Promise<Post[]> {
        const response = await getAllPosts();
        console.log("Response: ", response)
        return response;
    }

    componentDidMount(): void {
        this.getContent();
    }

    render() {
        return (
            <Fragment>
                <PostComponent/>
            </Fragment>
        )
    }
}