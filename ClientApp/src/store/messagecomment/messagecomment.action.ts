import { MESSAGECOMMENT_ACTION_TYPES, MessageComment } from './messagecomment.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type MessageCreateStart = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.CREATE_START, MessageComment
>;

export type MessageCreateSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.CREATE_SUCCESS, 
    MessageComment[]
>;

export type MessageCreateFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type MessageUpdateStart = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.UPDATE_START,
    MessageComment
>;

export type MessageUpdateSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.UPDATE_SUCCESS, 
    MessageComment[]
>;

export type MessageUpdateFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type MessageDeleteStart = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.DELETE_START,
    MessageComment
>;

export type MessageDeleteSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.DELETE_SUCCESS, 
    MessageComment[]
>;

export type MessageDeleteteFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type MessageFetchSingleStart = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_START,
    number
>;

export type MessageFetchSingleSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    MessageComment
>;

export type MessageFetchSingleFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type MessageFetchUserChatsStart = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_START,
    number
>;

export type MessageFetchUserChatsSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_SUCCESS, 
    MessageComment[]
>;

export type MessageFetchUserChatsFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_FAILED,
    Error
>;

export type MessageFetchAllStart = Action<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_START
>;

export type MessageFetchAllSuccess = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    MessageComment[]
>;

export type MessageFetchAllFailed = ActionWithPayload<
    MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const messagecommentCreateStart = withMatcher(
    (Message: MessageComment): MessageCreateStart => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.CREATE_START, Message)
);

export const messagecommentCreateSuccess = withMatcher(
    (Message: MessageComment[]): MessageCreateSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.CREATE_SUCCESS, Message)
);

export const messagecommentCreateFailed = withMatcher(
    (error: Error) => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.CREATE_START, error)
);
 
export const messagecommentUpdateStart = withMatcher(
    (Message: MessageComment): MessageUpdateStart => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.UPDATE_START, Message)
);

export const messagecommentUpdateSuccess = withMatcher(
    (Message: MessageComment[]): MessageUpdateSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.UPDATE_SUCCESS, Message)
);

export const messagecommentUpdateFailed = withMatcher(
    (error: Error): MessageUpdateFailed => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.UPDATE_FAILED, error)
);

export const messagecommentDeleteStart = withMatcher(
    (Message: MessageComment): MessageDeleteStart => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.DELETE_START, Message)
);

export const messagecommentDeleteSuccess = withMatcher(
    (Message: MessageComment[]): MessageDeleteSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.DELETE_SUCCESS, Message)
);

export const messagecommentDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.DELETE_START, error)
);

export const messagecommentFetchSingleStart = withMatcher(
    (MessageId: number): MessageFetchSingleStart => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_START, MessageId)
);

export const messagecommentFetchSingleSuccess = withMatcher(
    (Message: MessageComment): MessageFetchSingleSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, Message)
);

export const messagecommentFetchSingleFailed = withMatcher(
    (error: Error): MessageFetchSingleFailed => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const messagecommentFetchUserChatsStart = withMatcher(
    (MessageId: number): MessageFetchUserChatsStart => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_START, MessageId)
);

export const messagecommentFetchUserChatsSuccess = withMatcher(
    (Message: MessageComment[]): MessageFetchUserChatsSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_SUCCESS, Message)
);

export const messagecommentFetchUserChatsFailed = withMatcher(
    (error: Error): MessageFetchUserChatsFailed => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_USER_MESSAGECOMMENTS_FAILED, error)
);

export const messagecommentFetchAllStart = withMatcher(
    (Message: MessageComment[]): MessageFetchAllStart => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_START, Message)
);

export const messagecommentFetchAllSuccess = withMatcher(
    (Message: MessageComment[]): MessageFetchAllSuccess => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_SUCCESS, Message)
);

export const messagecommentFetchAllFailed = withMatcher(
    (error: Error): MessageFetchAllFailed => 
    createAction(MESSAGECOMMENT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);