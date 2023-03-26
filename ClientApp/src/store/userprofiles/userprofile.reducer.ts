import { AnyAction } from 'redux';

import { Userprofile } from './userprofile.types';

import {
    userprofileCreateStart,
    userprofileCreateSuccess,
    userprofileCreateFailed,
    userprofileUpdateStart,
    userprofileUpdateSuccess,
    userprofileUpdateFailed,
    userprofileDeleteStart,
    userprofileDeleteSuccess,
    userprofileDeleteFailed,
    userprofileFetchSingleStart,
    userprofileFetchSingleSuccess,
    userprofileFetchSingleFailed,
    userprofileFetchAllStart,
    userprofileFetchAllSuccess,
    userprofileFetchAllFailed,
} from './userprofile.action';

export type UserprofileState = {
    readonly userprofileId: number | null;
    readonly userprofile: Userprofile | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: UserprofileState = {
    userprofileId: null,
    userprofile: null,
    isLoading: false,
    error: null,
};

export const userprofileReducer = (
    state = INITIAL_STATE, action: AnyAction
): UserprofileState => {
    if (
        userprofileFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        userprofileCreateStart.match(action) ||
        userprofileUpdateStart.match(action) ||
        userprofileDeleteStart.match(action) || 
        userprofileFetchSingleSuccess.match(action) ||
        userprofileCreateSuccess.match(action) ||
        userprofileUpdateSuccess.match(action) ||
        userprofileDeleteSuccess.match(action) ||
        userprofileFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: true, userprofile: action.payload };
    }
    if (
        userprofileFetchSingleStart.match(action)
    ) {
        return { ...state, isLoading: true, userprofileId: action.payload };
    }  
    if (
        userprofileCreateFailed.match(action) ||
        userprofileUpdateFailed.match(action) ||
        userprofileDeleteFailed.match(action) ||
        userprofileFetchSingleFailed.match(action) ||
        userprofileFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};