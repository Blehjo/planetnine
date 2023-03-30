import { takeLatest, put, all, call } from 'typed-redux-saga';

import { ArtificialIntelligence, ARTIFICIALINTELLIGENCE_ACTION_TYPES } from './artificialintelligence.types';

import {
    artificialIntelligenceCreateSuccess,
    artificialIntelligenceCreateFailed,
    artificialIntelligenceUpdateSuccess,
    artificialIntelligenceUpdateFailed,
    artificialIntelligenceDeleteSuccess,
    artificialIntelligenceDeleteFailed,
    artificialIntelligenceFetchSingleSuccess,
    artificialIntelligenceFetchSingleFailed,
    artificialIntelligenceFetchAllSuccess,
    artificialIntelligenceFetchAllFailed,
    ArtificialIntelligenceCreateStart,
    ArtificialIntelligenceUpdateStart,
    ArtificialIntelligenceDeleteStart,
    ArtificialIntelligenceFetchSingleStart,
    ArtificialIntelligenceFetchAllStart,
    ArtificialIntelligenceFetchUsersStart
} from './artificialintelligence.action';

import { 
    getSingleArtificialIntelligence,
    getUserArtificialIntelligences,
    getUsersArtificialIntelligences,
    getAllArtificialIntelligences,
    addArtificialIntelligence,
    editArtificialIntelligence,
    deleteArtificialIntelligence
} from '../../utils/api/artificialintelligence.api';

export function* createArtificialIntelligence({ payload: { name, role, imageLink }}: ArtificialIntelligenceCreateStart ) {
    try {
        const artificialIntelligence = yield* call(
            addArtificialIntelligence,
            name,
            role,
            imageLink
        ); 
        yield* put(artificialIntelligenceCreateSuccess(artificialIntelligence));
    } catch (error) {
        yield* put(artificialIntelligenceCreateFailed(error as Error));
    }
}

export function* updateChat({ payload: { artificialIntelligenceId, name, role, imageLink }}: ArtificialIntelligenceUpdateStart) {
    try {
        const artificialIntelligence = yield* call(
            editArtificialIntelligence,
            artificialIntelligenceId,
            name,
            role,
            imageLink
        ); 
        yield* put(artificialIntelligenceUpdateSuccess(artificialIntelligence));
    } catch (error) {
        yield* put(artificialIntelligenceCreateFailed(error as Error));
    }
}

export function* removeChat({ payload: { artificialIntelligenceId }}: ArtificialIntelligenceDeleteStart) {
    try {
        const artificialIntelligences = yield* call(
            deleteArtificialIntelligence,
            artificialIntelligenceId
        ); 
        yield* put(artificialIntelligenceDeleteSuccess(artificialIntelligences));
    } catch (error) {
        yield* put(artificialIntelligenceDeleteFailed(error as Error));
    }
}

export function* fetchUserArtificialIntelligences() {
    try {
        const artificialIntelligence = yield* call(getUsersArtificialIntelligences);
        if (!artificialIntelligence) return;
        yield* call(artificialIntelligenceFetchAllSuccess, artificialIntelligence);
    } catch (error) {
        yield* put(artificialIntelligenceFetchAllFailed(error as Error));
    }
}

export function* fetchOtherUsersChats({ payload: { userId } }: ArtificialIntelligenceFetchUsersStart) {
    try {
        const artificialIntelligences = yield* call(
            getUserArtificialIntelligences,
            userId
        );
        if (!artificialIntelligences) return;
        yield* call(artificialIntelligenceFetchAllSuccess, artificialIntelligences);
    } catch (error) {
        yield* put(artificialIntelligenceFetchAllFailed(error as Error));
    }
}

export function* fetchSingleChatAsync({ 
    payload: { artificialIntelligenceId } }: ArtificialIntelligenceFetchSingleStart) {
    try {
        const artificialIntelligenceSnapshot = yield* call(
            getSingleArtificialIntelligence,
            artificialIntelligenceId 
        );
        yield* put(artificialIntelligenceFetchSingleSuccess(artificialIntelligenceSnapshot as ArtificialIntelligence));
    } catch (error) {
        yield* put(artificialIntelligenceFetchSingleFailed(error as Error));
    }
}

export function* fetchAllChatsAsync() {
    try {
        const artificialIntelligences = yield* call(getAllArtificialIntelligences);
        yield* put(artificialIntelligenceFetchAllSuccess(artificialIntelligences));
    } catch (error) {
        yield* put(artificialIntelligenceFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.CREATE_START, 
        createArtificialIntelligence
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.UPDATE_START, 
        updateChat
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.DELETE_START, 
        removeChat
    );
}

export function* onFetchUserChatsStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_USER_ARTIFICIALINTELLIGENCE_START, 
        fetchUserArtificialIntelligences
    );
}

export function* onFetchSingleChatStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSingleChatAsync
    );
}
  
export function* onFetchChatsStart() {
    yield* takeLatest(
        ARTIFICIALINTELLIGENCE_ACTION_TYPES.FETCH_ALL_START,
        fetchAllChatsAsync
    );
}

export function* artificialIntelligenceSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserChatsStart),
        call(onFetchSingleChatStart),
        call(onFetchChatsStart)
    ]);
}