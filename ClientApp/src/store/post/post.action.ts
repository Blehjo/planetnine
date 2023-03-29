import { POST_ACTION_TYPES, Post } from './post.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type PostCreateStart = ActionWithPayload<
    POST_ACTION_TYPES.CREATE_START, { postValue: string, mediaLink: string }
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
    { postId: number, postValue: string, mediaLink: string }
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
    { postId: number }
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
    { postId: number }
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
    { userId: number }
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
    (post: Post): PostCreateStart => 
    createAction(POST_ACTION_TYPES.CREATE_START, post)
);

export const postCreateSuccess = withMatcher(
    (post: Post[]): PostCreateSuccess => 
    createAction(POST_ACTION_TYPES.CREATE_SUCCESS, post)
);

export const postCreateFailed = withMatcher(
    (error: Error) => 
    createAction(POST_ACTION_TYPES.CREATE_START, error)
);
 
export const postUpdateStart = withMatcher(
    (post: Post): PostUpdateStart => 
    createAction(POST_ACTION_TYPES.UPDATE_START, post)
);

export const postUpdateSuccess = withMatcher(
    (post: Post[]): PostUpdateSuccess => 
    createAction(POST_ACTION_TYPES.UPDATE_SUCCESS, post)
);

export const postUpdateFailed = withMatcher(
    (error: Error): PostUpdateFailed => 
    createAction(POST_ACTION_TYPES.UPDATE_FAILED, error)
);

export const postDeleteStart = withMatcher(
    (post: Post): PostDeleteStart => 
    createAction(POST_ACTION_TYPES.DELETE_START, post)
);

export const postDeleteSuccess = withMatcher(
    (post: Post[]): PostDeleteSuccess => 
    createAction(POST_ACTION_TYPES.DELETE_SUCCESS, post)
);

export const postDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(POST_ACTION_TYPES.DELETE_START, error)
);

export const postFetchSingleStart = withMatcher(
    (postId: number): PostFetchSingleStart => 
    createAction(POST_ACTION_TYPES.FETCH_SINGLE_START, postId)
);

export const postFetchSingleSuccess = withMatcher(
    (post: Post): PostFetchSingleSuccess => 
    createAction(POST_ACTION_TYPES.FETCH_SINGLE_SUCCESS, post)
);

export const postFetchSingleFailed = withMatcher(
    (error: Error): PostFetchSingleFailed => 
    createAction(POST_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const postFetchUserChatsStart = withMatcher(
    (postId: number): PostFetchUserChatsStart => 
    createAction(POST_ACTION_TYPES.FETCH_USER_POSTS_START, postId)
);

export const postFetchUserChatsSuccess = withMatcher(
    (post: Post[]): PostFetchUserChatsSuccess => 
    createAction(POST_ACTION_TYPES.FETCH_USER_POSTS_SUCCESS, post)
);

export const postFetchUserChatsFailed = withMatcher(
    (error: Error): PostFetchUserChatsFailed => 
    createAction(POST_ACTION_TYPES.FETCH_USER_POSTS_FAILED, error)
);

export const postFetchAllStart = withMatcher(
    (post: Post[]): PostFetchAllStart => 
    createAction(POST_ACTION_TYPES.FETCH_ALL_START, post)
);

export const postFetchAllSuccess = withMatcher(
    (post: Post[]): PostFetchAllSuccess => 
    createAction(POST_ACTION_TYPES.FETCH_ALL_SUCCESS, post)
);

export const postFetchAllFailed = withMatcher(
    (error: Error): PostFetchAllFailed => 
    createAction(POST_ACTION_TYPES.FETCH_ALL_FAILED, error)
);