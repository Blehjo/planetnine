import { MOON_ACTION_TYPES, Moon } from './moon.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type MoonCreateStart = ActionWithPayload<
    MOON_ACTION_TYPES.CREATE_START, Moon
>;

export type MoonCreateSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.CREATE_SUCCESS, 
    Moon[]
>;

export type MoonCreateFailed = ActionWithPayload<
    MOON_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type MoonUpdateStart = ActionWithPayload<
    MOON_ACTION_TYPES.UPDATE_START,
    Moon
>;

export type MoonUpdateSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.UPDATE_SUCCESS, 
    Moon[]
>;

export type MoonUpdateFailed = ActionWithPayload<
    MOON_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type MoonDeleteStart = ActionWithPayload<
    MOON_ACTION_TYPES.DELETE_START,
    Moon
>;

export type MoonDeleteSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.DELETE_SUCCESS, 
    Moon[]
>;

export type MoonDeleteteFailed = ActionWithPayload<
    MOON_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type MoonFetchSingleStart = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_SINGLE_START,
    number
>;

export type MoonFetchSingleSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Moon
>;

export type MoonFetchSingleFailed = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type MoonFetchUserChatsStart = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_USER_MOONS_START,
    number
>;

export type MoonFetchUserChatsSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_USER_MOONS_SUCCESS, 
    Moon[]
>;

export type MoonFetchUserChatsFailed = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_USER_MOONS_FAILED,
    Error
>;

export type MoonFetchAllStart = Action<
    MOON_ACTION_TYPES.FETCH_ALL_START
>;

export type MoonFetchAllSuccess = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Moon[]
>;

export type MoonFetchAllFailed = ActionWithPayload<
    MOON_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const moonCreateStart = withMatcher(
    (moon: Moon): MoonCreateStart => 
    createAction(MOON_ACTION_TYPES.CREATE_START, moon)
);

export const moonCreateSuccess = withMatcher(
    (moon: Moon[]): MoonCreateSuccess => 
    createAction(MOON_ACTION_TYPES.CREATE_SUCCESS, moon)
);

export const moonCreateFailed = withMatcher(
    (error: Error) => 
    createAction(MOON_ACTION_TYPES.CREATE_START, error)
);
 
export const moonUpdateStart = withMatcher(
    (moon: Moon): MoonUpdateStart => 
    createAction(MOON_ACTION_TYPES.UPDATE_START, moon)
);

export const moonUpdateSuccess = withMatcher(
    (moon: Moon[]): MoonUpdateSuccess => 
    createAction(MOON_ACTION_TYPES.UPDATE_SUCCESS, moon)
);

export const moonUpdateFailed = withMatcher(
    (error: Error): MoonUpdateFailed => 
    createAction(MOON_ACTION_TYPES.UPDATE_FAILED, error)
);

export const moonDeleteStart = withMatcher(
    (moon: Moon): MoonDeleteStart => 
    createAction(MOON_ACTION_TYPES.DELETE_START, moon)
);

export const moonDeleteSuccess = withMatcher(
    (moon: Moon[]): MoonDeleteSuccess => 
    createAction(MOON_ACTION_TYPES.DELETE_SUCCESS, moon)
);

export const moonDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(MOON_ACTION_TYPES.DELETE_START, error)
);

export const moonFetchSingleStart = withMatcher(
    (moonId: number): MoonFetchSingleStart => 
    createAction(MOON_ACTION_TYPES.FETCH_SINGLE_START, moonId)
);

export const moonFetchSingleSuccess = withMatcher(
    (moon: Moon): MoonFetchSingleSuccess => 
    createAction(MOON_ACTION_TYPES.FETCH_SINGLE_SUCCESS, moon)
);

export const moonFetchSingleFailed = withMatcher(
    (error: Error): MoonFetchSingleFailed => 
    createAction(MOON_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const moonFetchUserChatsStart = withMatcher(
    (moonId: number): MoonFetchUserChatsStart => 
    createAction(MOON_ACTION_TYPES.FETCH_USER_MOONS_START, moonId)
);

export const moonFetchUserChatsSuccess = withMatcher(
    (moon: Moon[]): MoonFetchUserChatsSuccess => 
    createAction(MOON_ACTION_TYPES.FETCH_USER_MOONS_SUCCESS, moon)
);

export const moonFetchUserChatsFailed = withMatcher(
    (error: Error): MoonFetchUserChatsFailed => 
    createAction(MOON_ACTION_TYPES.FETCH_USER_MOONS_FAILED, error)
);

export const moonFetchAllStart = withMatcher(
    (moon: Moon[]): MoonFetchAllStart => 
    createAction(MOON_ACTION_TYPES.FETCH_ALL_START, moon)
);

export const moonFetchAllSuccess = withMatcher(
    (moon: Moon[]): MoonFetchAllSuccess => 
    createAction(MOON_ACTION_TYPES.FETCH_ALL_SUCCESS, moon)
);

export const moonFetchAllFailed = withMatcher(
    (error: Error): MoonFetchAllFailed => 
    createAction(MOON_ACTION_TYPES.FETCH_ALL_FAILED, error)
);