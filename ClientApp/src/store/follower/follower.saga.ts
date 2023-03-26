import { takeLatest, put, all, call } from 'redux-saga/effects';

import { FOLLOWER_ACTION_TYPES } from './follower.types';

import {
    followerCreateStart,
    followerCreateSuccess,
    followerCreateFailed,
    followerUpdateStart,
    followerUpdateSuccess,
    followerUpdateFailed,
    followerDeleteStart,
    followerDeleteSuccess,
    followerDeleteFailed,
    followerFetchSingleStart,
    followerFetchSingleSuccess,
    followerFetchSingleFailed,
    followerFetchAllStart,
    followerFetchAllSuccess,
    followerFetchAllFailed,
} from './follower.action';

import { 
    getSingleFollower,
    getAllFollowers,
    getUserFollowers,
    getUsersFollowers,
    getFollowers, 
    addFollower, 
    editFollower,
    deleteFollower
} from '../../utils/api/follower.api';

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
      FOLLOWER_ACTION_TYPES.FETCH_ALL_START,
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
    yield takeLatest(FOLLOWER_ACTION_TYPES.CREATE_START, createChat);
}

export function* onFetchStart() {
    yield takeLatest(FOLLOWER_ACTION_TYPES.FETCH_ALL_START, getUserChats);
}

export function* followerSagas() {
    yield all([
        call(onChatStart),
        call(onFetchStart)
    ]);
}