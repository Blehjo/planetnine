import { USERPROFILE_ACTION_TYPES, Userprofile } from './userprofile.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type UserprofileCreateStart = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.CREATE_START, Userprofile
>;

export type UserprofileCreateSuccess = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.CREATE_SUCCESS, 
    Userprofile
>;

export type UserprofileCreateFailed = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type UserprofileUpdateStart = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.UPDATE_START,
    Userprofile
>;

export type UserprofileUpdateSuccess = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.UPDATE_SUCCESS, 
    Userprofile
>;

export type UserprofileUpdateFailed = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type UserprofileDeleteStart = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.DELETE_START,
    Userprofile
>;

export type UserprofileDeleteSuccess = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.DELETE_SUCCESS, 
    Userprofile
>;

export type UserprofileDeleteteFailed = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type UserprofileFetchSingleStart = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_SINGLE_START,
    number
>;

export type UserprofileFetchSingleSuccess = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Userprofile
>;

export type UserprofileFetchSingleFailed = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type UserprofileFetchUserChatsStart = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_USERPROFILE_START,
    number
>;

export type UserprofileFetchUserChatsSuccess = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_USERPROFILE_SUCCESS, 
    Userprofile
>;

export type UserprofileFetchUserChatsFailed = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_USERPROFILE_FAILED,
    Error
>;

export type UserprofileFetchAllStart = Action<
    USERPROFILE_ACTION_TYPES.FETCH_ALL_START
>;

export type UserprofileFetchAllSuccess = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Userprofile
>;

export type UserprofileFetchAllFailed = ActionWithPayload<
    USERPROFILE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const userprofileCreateStart = withMatcher(
    (userprofile: Userprofile): UserprofileCreateStart => 
    createAction(USERPROFILE_ACTION_TYPES.CREATE_START, userprofile)
);

export const userprofileCreateSuccess = withMatcher(
    (userprofile: Userprofile): UserprofileCreateSuccess => 
    createAction(USERPROFILE_ACTION_TYPES.CREATE_SUCCESS, userprofile)
);

export const userprofileCreateFailed = withMatcher(
    (error: Error) => 
    createAction(USERPROFILE_ACTION_TYPES.CREATE_START, error)
);
 
export const userprofileUpdateStart = withMatcher(
    (userprofile: Userprofile): UserprofileUpdateStart => 
    createAction(USERPROFILE_ACTION_TYPES.UPDATE_START, userprofile)
);

export const userprofileUpdateSuccess = withMatcher(
    (userprofile: Userprofile): UserprofileUpdateSuccess => 
    createAction(USERPROFILE_ACTION_TYPES.UPDATE_SUCCESS, userprofile)
);

export const userprofileUpdateFailed = withMatcher(
    (error: Error): UserprofileUpdateFailed => 
    createAction(USERPROFILE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const userprofileDeleteStart = withMatcher(
    (userprofile: Userprofile): UserprofileDeleteStart => 
    createAction(USERPROFILE_ACTION_TYPES.DELETE_START, userprofile)
);

export const userprofileDeleteSuccess = withMatcher(
    (userprofile: Userprofile): UserprofileDeleteSuccess => 
    createAction(USERPROFILE_ACTION_TYPES.DELETE_SUCCESS, userprofile)
);

export const userprofileDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(USERPROFILE_ACTION_TYPES.DELETE_START, error)
);

export const userprofileFetchSingleStart = withMatcher(
    (userprofileId: number): UserprofileFetchSingleStart => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_SINGLE_START, userprofileId)
);

export const userprofileFetchSingleSuccess = withMatcher(
    (userprofile: Userprofile): UserprofileFetchSingleSuccess => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, userprofile)
);

export const userprofileFetchSingleFailed = withMatcher(
    (error: Error): UserprofileFetchSingleFailed => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const userprofileFetchUserChatsStart = withMatcher(
    (userprofileId: number): UserprofileFetchUserChatsStart => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_USERPROFILE_START, userprofileId)
);

export const userprofileFetchUserChatsSuccess = withMatcher(
    (userprofile: Userprofile): UserprofileFetchUserChatsSuccess => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_USERPROFILE_SUCCESS, userprofile)
);

export const userprofileFetchUserChatsFailed = withMatcher(
    (error: Error): UserprofileFetchUserChatsFailed => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_USERPROFILE_FAILED, error)
);

export const userprofileFetchAllStart = withMatcher(
    (userprofile: Userprofile): UserprofileFetchAllStart => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_ALL_START, userprofile)
);

export const userprofileFetchAllSuccess = withMatcher(
    (userprofile: Userprofile): UserprofileFetchAllSuccess => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_ALL_SUCCESS, userprofile)
);

export const userprofileFetchAllFailed = withMatcher(
    (error: Error): UserprofileFetchAllFailed => 
    createAction(USERPROFILE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);