import { FAVORITE_ACTION_TYPES, Favorite } from './favorite.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type FavoriteCreateStart = ActionWithPayload<
    FAVORITE_ACTION_TYPES.CREATE_START, Favorite
>;

export type FavoriteCreateSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.CREATE_SUCCESS, 
    Favorite[]
>;

export type FavoriteCreateFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type FavoriteUpdateStart = ActionWithPayload<
    FAVORITE_ACTION_TYPES.UPDATE_START,
    Favorite
>;

export type FavoriteUpdateSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.UPDATE_SUCCESS, 
    Favorite[]
>;

export type FavoriteUpdateFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type FavoriteDeleteStart = ActionWithPayload<
    FAVORITE_ACTION_TYPES.DELETE_START,
    Favorite
>;

export type FavoriteDeleteSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.DELETE_SUCCESS, 
    Favorite[]
>;

export type FavoriteDeleteteFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type FavoriteFetchSingleStart = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_SINGLE_START,
    number
>;

export type FavoriteFetchSingleSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Favorite
>;

export type FavoriteFetchSingleFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type FavoriteFetchUserChatsStart = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_START,
    number
>;

export type FavoriteFetchUserChatsSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_SUCCESS, 
    Favorite[]
>;

export type FavoriteFetchUserChatsFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_FAILED,
    Error
>;

export type FavoriteFetchAllStart = Action<
    FAVORITE_ACTION_TYPES.FETCH_ALL_START
>;

export type FavoriteFetchAllSuccess = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Favorite[]
>;

export type FavoriteFetchAllFailed = ActionWithPayload<
    FAVORITE_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const favoriteCreateStart = withMatcher(
    (favorite: Favorite): FavoriteCreateStart => 
    createAction(FAVORITE_ACTION_TYPES.CREATE_START, favorite)
);

export const favoriteCreateSuccess = withMatcher(
    (favorite: Favorite[]): FavoriteCreateSuccess => 
    createAction(FAVORITE_ACTION_TYPES.CREATE_SUCCESS, favorite)
);

export const favoriteCreateFailed = withMatcher(
    (error: Error) => 
    createAction(FAVORITE_ACTION_TYPES.CREATE_START, error)
);
 
export const favoriteUpdateStart = withMatcher(
    (favorite: Favorite): FavoriteUpdateStart => 
    createAction(FAVORITE_ACTION_TYPES.UPDATE_START, favorite)
);

export const favoriteUpdateSuccess = withMatcher(
    (favorite: Favorite[]): FavoriteUpdateSuccess => 
    createAction(FAVORITE_ACTION_TYPES.UPDATE_SUCCESS, favorite)
);

export const favoriteUpdateFailed = withMatcher(
    (error: Error): FavoriteUpdateFailed => 
    createAction(FAVORITE_ACTION_TYPES.UPDATE_FAILED, error)
);

export const favoriteDeleteStart = withMatcher(
    (favorite: Favorite): FavoriteDeleteStart => 
    createAction(FAVORITE_ACTION_TYPES.DELETE_START, favorite)
);

export const favoriteDeleteSuccess = withMatcher(
    (favorite: Favorite[]): FavoriteDeleteSuccess => 
    createAction(FAVORITE_ACTION_TYPES.DELETE_SUCCESS, favorite)
);

export const favoriteDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(FAVORITE_ACTION_TYPES.DELETE_START, error)
);

export const favoriteFetchSingleStart = withMatcher(
    (favoriteId: number): FavoriteFetchSingleStart => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_SINGLE_START, favoriteId)
);

export const favoriteFetchSingleSuccess = withMatcher(
    (favorite: Favorite): FavoriteFetchSingleSuccess => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_SINGLE_SUCCESS, favorite)
);

export const favoriteFetchSingleFailed = withMatcher(
    (error: Error): FavoriteFetchSingleFailed => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const favoriteFetchUserChatsStart = withMatcher(
    (favoriteId: number): FavoriteFetchUserChatsStart => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_START, favoriteId)
);

export const favoriteFetchUserChatsSuccess = withMatcher(
    (favorite: Favorite[]): FavoriteFetchUserChatsSuccess => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_SUCCESS, favorite)
);

export const favoriteFetchUserChatsFailed = withMatcher(
    (error: Error): FavoriteFetchUserChatsFailed => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_USER_FAVORITES_FAILED, error)
);

export const favoriteFetchAllStart = withMatcher(
    (favorite: Favorite[]): FavoriteFetchAllStart => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_ALL_START, favorite)
);

export const favoriteFetchAllSuccess = withMatcher(
    (favorite: Favorite[]): FavoriteFetchAllSuccess => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_ALL_SUCCESS, favorite)
);

export const favoriteFetchAllFailed = withMatcher(
    (error: Error): FavoriteFetchAllFailed => 
    createAction(FAVORITE_ACTION_TYPES.FETCH_ALL_FAILED, error)
);