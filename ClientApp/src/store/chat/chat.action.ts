import { CHAT_ACTION_TYPES, Chat } from './chat.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type ChatCreateStart = ActionWithPayload<
    CHAT_ACTION_TYPES.CREATE_START, Chat
>;

export type ChatCreateSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.CREATE_SUCCESS, 
    Chat[]
>;

export type ChatCreateFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type ChatUpdateStart = ActionWithPayload<
    CHAT_ACTION_TYPES.UPDATE_START,
    Chat
>;

export type ChatUpdateSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.UPDATE_SUCCESS, 
    Chat[]
>;

export type ChatUpdateFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type ChatDeleteStart = ActionWithPayload<
    CHAT_ACTION_TYPES.DELETE_START,
    Chat
>;

export type ChatDeleteSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.DELETE_SUCCESS, 
    Chat[]
>;

export type ChatDeleteteFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type ChatFetchSingleStart = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_SINGLE_START,
    number
>;

export type ChatFetchSingleSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Chat
>;

export type ChatFetchSingleFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type ChatFetchUserChatsStart = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_USER_CHATS_START,
    number
>;

export type ChatFetchUserChatsSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_USER_CHATS_SUCCESS, 
    Chat[]
>;

export type ChatFetchUserChatsFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_USER_CHATS_FAILED,
    Error
>;

export type ChatFetchAllStart = Action<
    CHAT_ACTION_TYPES.FETCH_ALL_START
>;

export type ChatFetchAllSuccess = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Chat[]
>;

export type ChatFetchAllFailed = ActionWithPayload<
    CHAT_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const chatCreateStart = withMatcher(
    (chat: Chat): ChatCreateStart => 
    createAction(CHAT_ACTION_TYPES.CREATE_START, chat)
);

export const chatCreateSuccess = withMatcher(
    (chat: Chat[]): ChatCreateSuccess => 
    createAction(CHAT_ACTION_TYPES.CREATE_SUCCESS, chat)
);

export const chatCreateFailed = withMatcher(
    (error: Error) => 
    createAction(CHAT_ACTION_TYPES.CREATE_START, error)
);
 
export const chatUpdateStart = withMatcher(
    (chat: Chat): ChatUpdateStart => 
    createAction(CHAT_ACTION_TYPES.UPDATE_START, chat)
);

export const chatUpdateSuccess = withMatcher(
    (chat: Chat[]): ChatUpdateSuccess => 
    createAction(CHAT_ACTION_TYPES.UPDATE_SUCCESS, chat)
);

export const chatUpdateFailed = withMatcher(
    (error: Error): ChatUpdateFailed => 
    createAction(CHAT_ACTION_TYPES.UPDATE_FAILED, error)
);

export const chatDeleteStart = withMatcher(
    (chat: Chat): ChatDeleteStart => 
    createAction(CHAT_ACTION_TYPES.DELETE_START, chat)
);

export const chatDeleteSuccess = withMatcher(
    (chat: Chat[]): ChatDeleteSuccess => 
    createAction(CHAT_ACTION_TYPES.DELETE_SUCCESS, chat)
);

export const chatDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(CHAT_ACTION_TYPES.DELETE_START, error)
);

export const chatFetchSingleStart = withMatcher(
    (chatId: number): ChatFetchSingleStart => 
    createAction(CHAT_ACTION_TYPES.FETCH_SINGLE_START, chatId)
);

export const chatFetchSingleSuccess = withMatcher(
    (chat: Chat): ChatFetchSingleSuccess => 
    createAction(CHAT_ACTION_TYPES.FETCH_SINGLE_SUCCESS, chat)
);

export const chatFetchSingleFailed = withMatcher(
    (error: Error): ChatFetchSingleFailed => 
    createAction(CHAT_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const chatFetchUserChatsStart = withMatcher(
    (chatId: number): ChatFetchUserChatsStart => 
    createAction(CHAT_ACTION_TYPES.FETCH_USER_CHATS_START, chatId)
);

export const chatFetchUserChatsSuccess = withMatcher(
    (chat: Chat[]): ChatFetchUserChatsSuccess => 
    createAction(CHAT_ACTION_TYPES.FETCH_USER_CHATS_SUCCESS, chat)
);

export const chatFetchUserChatsFailed = withMatcher(
    (error: Error): ChatFetchUserChatsFailed => 
    createAction(CHAT_ACTION_TYPES.FETCH_USER_CHATS_FAILED, error)
);

export const chatFetchAllStart = withMatcher(
    (chat: Chat[]): ChatFetchAllStart => 
    createAction(CHAT_ACTION_TYPES.FETCH_ALL_START, chat)
);

export const chatFetchAllSuccess = withMatcher(
    (chat: Chat[]): ChatFetchAllSuccess => 
    createAction(CHAT_ACTION_TYPES.FETCH_ALL_SUCCESS, chat)
);

export const chatFetchAllFailed = withMatcher(
    (error: Error): ChatFetchAllFailed => 
    createAction(CHAT_ACTION_TYPES.FETCH_ALL_FAILED, error)
);