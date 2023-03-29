import { AnyAction } from 'redux';

import { Moon } from './moon.types';

import {
    moonCreateStart,
    moonCreateSuccess,
    moonCreateFailed,
    moonUpdateStart,
    moonUpdateSuccess,
    moonUpdateFailed,
    moonDeleteStart,
    moonDeleteSuccess,
    moonDeleteFailed,
    moonFetchSingleStart,
    moonFetchSingleSuccess,
    moonFetchSingleFailed,
    moonFetchAllStart,
    moonFetchAllSuccess,
    moonFetchAllFailed,
} from './moon.action';

export type MoonState = {
    readonly moonId: number | null;
    readonly singleMoon: Moon | null;
    readonly userMoons: Moon[] | null;
    readonly moons: Moon[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: MoonState = {
    moonId: null,
    singleMoon: null,
    userMoons: [],
    moons: [],
    isLoading: false,
    error: null
};

export const moonReducer = (
    state = INITIAL_STATE, action: AnyAction
): MoonState => {
    if (
        moonFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        moonCreateSuccess.match(action) ||
        moonUpdateSuccess.match(action) ||
        moonDeleteSuccess.match(action) ||
        moonFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, moons: action.payload };
    } 
    if (
        moonCreateFailed.match(action) ||
        moonUpdateFailed.match(action) ||
        moonDeleteFailed.match(action) ||
        moonFetchSingleFailed.match(action) ||
        moonFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};