import { Component, Fragment } from "react";

export interface IChat {
    chatId: number;
    title: string;
    type: string;
    dateCreated?: Date;
    userId: number;
    chatComments: number;
    comments: number;
    favorites: number;
}

export class Chats extends Component {
    render() {
        return (
            <Fragment>

            </Fragment>
        )
    }
}