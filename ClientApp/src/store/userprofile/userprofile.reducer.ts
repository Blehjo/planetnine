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
    readonly userprofiles: Userprofile[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: UserprofileState = {
    userprofileId: null,
    userprofile: null,
    userprofiles: [],
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
        userprofileFetchSingleSuccess.match(action) 
    ) {
        return { ...state, userprofile: action.payload, isLoading: true }
    }
    if (
        userprofileFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, userprofiles: action.payload };
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