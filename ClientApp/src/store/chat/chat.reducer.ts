import { AnyAction } from 'redux';

import { Chat } from './chat.types';

import {
    chatCreateStart,
    chatCreateSuccess,
    chatCreateFailed,
    chatUpdateStart,
    chatUpdateSuccess,
    chatUpdateFailed,
    chatDeleteStart,
    chatDeleteSuccess,
    chatDeleteFailed,
    chatFetchSingleStart,
    chatFetchSingleSuccess,
    chatFetchSingleFailed,
    chatFetchAllStart,
    chatFetchAllSuccess,
    chatFetchAllFailed,
} from './chat.action';

export type ChatState = {
    readonly chatId: number | null;
    readonly singleChat: Chat | null;
    readonly userChats: Chat[] | null;
    readonly chats: Chat[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: ChatState = {
    chatId: null,
    singleChat: null,
    userChats: [],
    chats: [],
    isLoading: false,
    error: null
};

export const chatReducer = (
    state = INITIAL_STATE, action: AnyAction
): ChatState => {
    if (
        chatFetchAllStart.match(action) ||
        chatFetchSingleStart.match(action)
    ) {
        return { ...state, isLoading: true }
    }  
    if (
        chatFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleChat: action.payload }
    }  
    if (
        chatCreateSuccess.match(action) ||
        chatUpdateSuccess.match(action) ||
        chatDeleteSuccess.match(action) ||
        chatFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, chats: action.payload };
    } 
    if (
        chatCreateFailed.match(action) ||
        chatUpdateFailed.match(action) ||
        chatDeleteFailed.match(action) ||
        chatFetchSingleFailed.match(action) ||
        chatFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};