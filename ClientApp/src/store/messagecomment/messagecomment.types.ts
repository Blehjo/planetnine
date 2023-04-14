import { Favorite } from "../favorite/favorite.types";
import { User } from "../user/user.types";
export enum MESSAGECOMMENT_ACTION_TYPES  {
    CREATE_START = 'message/CREATE_START',
    CREATE_SUCCESS = 'message/CREATE_SUCCESS',
    CREATE_FAILED = 'message/CREATE_FAILED',
    UPDATE_START = 'message/UPDATE_START',
    UPDATE_SUCCESS = 'message/UPDATE_SUCCESS',
    UPDATE_FAILED = 'message/UPDATE_FAILED',
    DELETE_START = 'message/DELETE_START',
    DELETE_SUCCESS = 'message/DELETE_SUCCESS',
    DELETE_FAILED = 'message/DELETE_FAILED',
    FETCH_SINGLE_START = 'message/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'message/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'message/FETCH_SINGLE_FAILED',
    FETCH_USER_MESSAGECOMMENTS_START = 'message/FETCH_USER_MESSAGECOMMENTS_START',
    FETCH_USER_MESSAGECOMMENTS_SUCCESS = 'message/FETCH_USER_MESSAGECOMMENTS_SUCCESS',
    FETCH_USER_MESSAGECOMMENTS_FAILED = 'message/FETCH_USER_MESSAGECOMMENTS_FAILED',
    FETCH_ALL_START = 'message/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'message/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'message/FETCH_ALL_FAILED',
};

export type MessageComment = {
    messageCommentId: number | null;
    messageValue: string | null;
    mediaLink: string | null;
    type: string | null;
    dateCreated: Date;
    messageId: number | null;
    userId: number | null;
    user: User | null;
    favorites: Favorite[] | null;
}