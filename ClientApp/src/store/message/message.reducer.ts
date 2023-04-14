import { AnyAction } from 'redux';

import { Message } from './message.types';

import {
    messageCreateStart,
    messageCreateSuccess,
    messageCreateFailed,
    messageUpdateStart,
    messageUpdateSuccess,
    messageUpdateFailed,
    messageDeleteStart,
    messageDeleteSuccess,
    messageDeleteFailed,
    messageFetchSingleStart,
    messageFetchSingleSuccess,
    messageFetchSingleFailed,
    messageFetchAllStart,
    messageFetchAllSuccess,
    messageFetchAllFailed,
    messageFetchUserMessagesSuccess,
    messageFetchUserMessagesStart,
} from './message.action';

export type MessageState = {
    readonly messageId: number | null;
    readonly singleMessage: Message | null;
    readonly userMessages: Message[] | null;
    readonly messages: Message[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: MessageState = {
    messageId: null,
    singleMessage: null,
    userMessages: [],
    messages: [],
    isLoading: false,
    error: null,
};

export const messageReducer = (
    state = INITIAL_STATE, action: AnyAction
): MessageState => {
    if (
        messageFetchAllStart.match(action) ||
        messageFetchSingleStart.match(action) ||
        messageFetchUserMessagesStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    } 
    if (
        messageFetchSingleSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, singleMessage: action.payload }
    } 
    if (
        messageFetchUserMessagesSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, userMessages: action.payload }
    } 
    if (
        messageCreateSuccess.match(action) ||
        messageUpdateSuccess.match(action) ||
        messageDeleteSuccess.match(action) ||
        messageFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, messages: action.payload };
    } 
    if (
        messageCreateFailed.match(action) ||
        messageUpdateFailed.match(action) ||
        messageDeleteFailed.match(action) ||
        messageFetchSingleFailed.match(action) ||
        messageFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};