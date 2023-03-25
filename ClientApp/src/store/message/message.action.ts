import { MESSAGE_ACTION_TYPES, Message } from './message.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type MessageCreateStart = ActionWithPayload<
    MESSAGE_ACTION_TYPES.CREATE_START, Message
>;

export type MessageCreateSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.CREATE_SUCCESS, 
    Message[]
>;

export type MessageCreateFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type MessageUpdateStart = ActionWithPayload<
    MESSAGE_ACTION_TYPES.UPDATE_START,
    Message
>;

export type MessageUpdateSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.UPDATE_SUCCESS, 
    Message[]
>;

export type MessageUpdateFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type MessageDeleteStart = ActionWithPayload<
    MESSAGE_ACTION_TYPES.DELETE_START,
    Message
>;

export type MessageDeleteSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.DELETE_SUCCESS, 
    Message[]
>;

export type MessageDeleteteFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type MessageFetchSingleStart = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_SINGLE_START,
    number
>;

export type MessageFetchSingleSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Message
>;

export type MessageFetchSingleFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type MessageFetchUserChatsStart = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_START,
    number
>;

export type MessageFetchUserChatsSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_SUCCESS, 
    Message[]
>;

export type MessageFetchUserChatsFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_FAILED,
    Error
>;

export type MessageFetchAllStart = Action<
    MESSAGE_ACTION_TYPES.FETCH_ALL_START
>;

export type MessageFetchAllSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Message[]
>;

export type MessageFetchAllFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const messageCreateStart = withMatcher(
    (Message: Message): MessageCreateStart => 
    createAction(MESSAGE_ACTION_TYPES.CREATE_START, Message)
);

export const messageCreateSuccess = withMatcher(
    (Message: Message[]): MessageCreateSuccess => 
    createAction(MESSAGE_ACTION_TYPES.CREATE_SUCCESS, Message)
);

export const messageCreateFailed = withMatcher(
    (error: Error) => 
    createAction(MESSAGE_ACTION_TYPES.CREATE_START, error)
);
 
export const messageUpdateStart = withMatcher(
    (Message: Message): MessageUpdateStart => 
    createAction(MESSAGE_ACTION_TYPES.UPDATE_START, Message)
);

export const messageUpdateSuccess = withMatcher(
    (Message: Message[]): MessageUpdateSuccess => 
    createAction(MESSAGE_ACTION_TYPES.UPDATE_SUCCESS, Message)
);

export const messageUpdateFailed = withMatcher(
    (error: Error): MessageUpdateFailed => 
    createAction(MESSAGE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const messageDeleteStart = withMatcher(
    (Message: Message): MessageDeleteStart => 
    createAction(MESSAGE_ACTION_TYPES.DELETE_START, Message)
);

export const messageDeleteSuccess = withMatcher(
    (Message: Message[]): MessageDeleteSuccess => 
    createAction(MESSAGE_ACTION_TYPES.DELETE_SUCCESS, Message)
);

export const messageDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(MESSAGE_ACTION_TYPES.DELETE_START, error)
);

export const messageFetchSingleStart = withMatcher(
    (MessageId: number): MessageFetchSingleStart => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_SINGLE_START, MessageId)
);

export const messageFetchSingleSuccess = withMatcher(
    (Message: Message): MessageFetchSingleSuccess => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, Message)
);

export const messageFetchSingleFailed = withMatcher(
    (error: Error): MessageFetchSingleFailed => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const messageFetchUserChatsStart = withMatcher(
    (MessageId: number): MessageFetchUserChatsStart => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_START, MessageId)
);

export const messageFetchUserChatsSuccess = withMatcher(
    (Message: Message[]): MessageFetchUserChatsSuccess => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_SUCCESS, Message)
);

export const messageFetchUserChatsFailed = withMatcher(
    (error: Error): MessageFetchUserChatsFailed => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_FAILED, error)
);

export const messageFetchAllStart = withMatcher(
    (Message: Message[]): MessageFetchAllStart => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_ALL_START, Message)
);

export const messageFetchAllSuccess = withMatcher(
    (Message: Message[]): MessageFetchAllSuccess => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_ALL_SUCCESS, Message)
);

export const messageFetchAllFailed = withMatcher(
    (error: Error): MessageFetchAllFailed => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);