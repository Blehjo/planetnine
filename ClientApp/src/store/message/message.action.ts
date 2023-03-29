import { MESSAGE_ACTION_TYPES, Message } from './message.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type MessageCreateStart = ActionWithPayload<
    MESSAGE_ACTION_TYPES.CREATE_START, { messageValue: string }
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
    { messageId: number, messageValue: string }
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
    { messageId: number }
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
    { messageId: number }
>;

export type MessageFetchSingleSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Message
>;

export type MessageFetchSingleFailed = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type MessageFetchUserMessagesStart = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_START,
    { userId: number }
>;

export type MessageFetchUserMessagesSuccess = ActionWithPayload<
    MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_SUCCESS, 
    Message[]
>;

export type MessageFetchUserMessagesFailed = ActionWithPayload<
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
    (messageValue: string): MessageCreateStart => 
    createAction(MESSAGE_ACTION_TYPES.CREATE_START, { messageValue })
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
    (messageId: number, messageValue: string): MessageUpdateStart => 
    createAction(MESSAGE_ACTION_TYPES.UPDATE_START, { messageId, messageValue })
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
    (messageId: number): MessageDeleteStart => 
    createAction(MESSAGE_ACTION_TYPES.DELETE_START, { messageId })
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
    (messageId: number): MessageFetchSingleStart => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_SINGLE_START, { messageId })
);

export const messageFetchSingleSuccess = withMatcher(
    (Message: Message): MessageFetchSingleSuccess => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, Message)
);

export const messageFetchSingleFailed = withMatcher(
    (error: Error): MessageFetchSingleFailed => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const messageFetchUserMessagesStart = withMatcher(
    (userId: number): MessageFetchUserMessagesStart => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_START, { userId })
);

export const messageFetchUserMessagesSuccess = withMatcher(
    (Message: Message[]): MessageFetchUserMessagesSuccess => 
    createAction(MESSAGE_ACTION_TYPES.FETCH_USER_MESSAGES_SUCCESS, Message)
);

export const messageFetchUserMessagesFailed = withMatcher(
    (error: Error): MessageFetchUserMessagesFailed => 
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