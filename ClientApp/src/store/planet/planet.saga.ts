import { takeLatest, put, all, call } from 'typed-redux-saga';

import { CHAT_ACTION_TYPES } from './planet.types';

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
} from './planet.action';

import { 
    getSingleChat,
    getAllChats,
    getUserChats,
    getUsersChats,
    getChats, 
    addChat, 
    editChat,
    deleteChat
} from '../../utils/api/chat.api';

export function* fetchCategoriesAsync() {
    try {
      const chats = yield* call(getAllChats);
      yield* put(chatFetchAllSuccess(chats));
    } catch (error) {
      yield* put(chatFetchAllFailed(error as Error));
    }
}
  
export function* onFetchCategories() {
    yield* takeLatest(
      CHAT_ACTION_TYPES.FETCH_ALL_START,
      fetchCategoriesAsync
    );
}

export function* getSnapshotFromChat(chat, additionalDetails) {
    try {
        const chatSnapshot = yield call(
            getSingleChat,
            chat.chatId,
            additionalDetails
        );
        yield put(chatCreateSuccess({ id: chatSnapshot.chatId, ...chatSnapshot.data }));
    } catch (error) {
        yield put(chatCreateFailed(error));
    }
}

export function* createChat({ payload: { title } }) {
    try {
        const chat = yield call(
            addChat,
            title,
        );
        yield call(getSnapshotFromChat, chat);
    } catch (error) {
        yield put(chatCreateFailed(error));
    }
}

export function* getUserInfoChats() {
    try {
        const chat = yield call(getChats);
        if (!chat) return;
        yield call(chatFetchAllSuccess, chat);
    } catch (error) {
        yield put(chatFetchAllFailed(error));
    }
}

export function* onChatStart() {
    yield takeLatest(CHAT_ACTION_TYPES.CREATE_START, createChat);
}

export function* onFetchStart() {
    yield takeLatest(CHAT_ACTION_TYPES.FETCH_ALL_START, getUserChats);
}

export function* planetSagas() {
    yield all([
        call(onChatStart),
        call(onFetchStart)
    ]);
}