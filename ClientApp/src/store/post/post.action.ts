import { POST_ACTION_TYPES, Post } from './post.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type PostCreateStart = ActionWithPayload<
    POST_ACTION_TYPES.CREATE_START, Post
>;

export type PostCreateSuccess = ActionWithPayload<
    POST_ACTION_TYPES.CREATE_SUCCESS, 
    Post[]
>;

export type PostCreateFailed = ActionWithPayload<
    POST_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type PostUpdateStart = ActionWithPayload<
    POST_ACTION_TYPES.UPDATE_START,
    Post
>;

export type PostUpdateSuccess = ActionWithPayload<
    POST_ACTION_TYPES.UPDATE_SUCCESS, 
    Post[]
>;

export type PostUpdateFailed = ActionWithPayload<
    POST_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type PostDeleteStart = ActionWithPayload<
    POST_ACTION_TYPES.DELETE_START,
    Post
>;

export type PostDeleteSuccess = ActionWithPayload<
    POST_ACTION_TYPES.DELETE_SUCCESS, 
    Post[]
>;

export type PostDeleteteFailed = ActionWithPayload<
    POST_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type PostFetchSingleStart = ActionWithPayload<
    POST_ACTION_TYPES.FETCH_SINGLE_START,
    number
>;

export type PostFetchSingleSuccess = ActionWithPayload<
    POST_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Post
>;

export type PostFetchSingleFailed = ActionWithPayload<
    POST_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type PostFetchUserChatsStart = ActionWithPayload<
    POST_ACTION_TYPES.FETCH_USER_POSTS_START,
    number
>;

export type PostFetchUserChatsSuccess = ActionWithPayload<
    POST_ACTION_TYPES.FETCH_USER_POSTS_SUCCESS, 
    Post[]
>;

export type PostFetchUserChatsFailed = ActionWithPayload<
    POST_ACTION_TYPES.FETCH_USER_POSTS_FAILED,
    Error
>;

export type PostFetchAllStart = Action<
    POST_ACTION_TYPES.FETCH_ALL_START
>;

export type PostFetchAllSuccess = ActionWithPayload<
    POST_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Post[]
>;

export type PostFetchAllFailed = ActionWithPayload<
    POST_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const postCreateStart = withMatcher(
    (Post: Post): PostCreateStart => 
    createAction(POST_ACTION_TYPES.CREATE_START, Post)
);

export const postCreateSuccess = withMatcher(
    (Post: Post[]): PostCreateSuccess => 
    createAction(POST_ACTION_TYPES.CREATE_SUCCESS, Post)
);

export const postCreateFailed = withMatcher(
    (error: Error) => 
    createAction(POST_ACTION_TYPES.CREATE_START, error)
);
 
export const postUpdateStart = withMatcher(
    (Post: Post): PostUpdateStart => 
    createAction(POST_ACTION_TYPES.UPDATE_START, Post)
);

export const postUpdateSuccess = withMatcher(
    (Post: Post[]): PostUpdateSuccess => 
    createAction(POST_ACTION_TYPES.UPDATE_SUCCESS, Post)
);

export const postUpdateFailed = withMatcher(
    (error: Error): PostUpdateFailed => 
    createAction(POST_ACTION_TYPES.UPDATE_FAILED, error)
);

export const postDeleteStart = withMatcher(
    (Post: Post): PostDeleteStart => 
    createAction(POST_ACTION_TYPES.DELETE_START, Post)
);

export const postDeleteSuccess = withMatcher(
    (Post: Post[]): PostDeleteSuccess => 
    createAction(POST_ACTION_TYPES.DELETE_SUCCESS, Post)
);

export const postDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(POST_ACTION_TYPES.DELETE_START, error)
);

export const postFetchSingleStart = withMatcher(
    (PostId: number): PostFetchSingleStart => 
    createAction(POST_ACTION_TYPES.FETCH_SINGLE_START, PostId)
);

export const postFetchSingleSuccess = withMatcher(
    (Post: Post): PostFetchSingleSuccess => 
    createAction(POST_ACTION_TYPES.FETCH_SINGLE_SUCCESS, Post)
);

export const postFetchSingleFailed = withMatcher(
    (error: Error): PostFetchSingleFailed => 
    createAction(POST_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const postFetchUserChatsStart = withMatcher(
    (PostId: number): PostFetchUserChatsStart => 
    createAction(POST_ACTION_TYPES.FETCH_USER_POSTS_START, PostId)
);

export const postFetchUserChatsSuccess = withMatcher(
    (Post: Post[]): PostFetchUserChatsSuccess => 
    createAction(POST_ACTION_TYPES.FETCH_USER_POSTS_SUCCESS, Post)
);

export const postFetchUserChatsFailed = withMatcher(
    (error: Error): PostFetchUserChatsFailed => 
    createAction(POST_ACTION_TYPES.FETCH_USER_POSTS_FAILED, error)
);

export const postFetchAllStart = withMatcher(
    (Post: Post[]): PostFetchAllStart => 
    createAction(POST_ACTION_TYPES.FETCH_ALL_START, Post)
);

export const postFetchAllSuccess = withMatcher(
    (Post: Post[]): PostFetchAllSuccess => 
    createAction(POST_ACTION_TYPES.FETCH_ALL_SUCCESS, Post)
);

export const postFetchAllFailed = withMatcher(
    (error: Error): PostFetchAllFailed => 
    createAction(POST_ACTION_TYPES.FETCH_ALL_FAILED, error)
);