import { AnyAction } from 'redux';

import { Favorite } from './favorite.types';

import {
    favoriteCreateStart,
    favoriteCreateSuccess,
    favoriteCreateFailed,
    favoriteUpdateStart,
    favoriteUpdateSuccess,
    favoriteUpdateFailed,
    favoriteDeleteStart,
    favoriteDeleteSuccess,
    favoriteDeleteFailed,
    favoriteFetchSingleStart,
    favoriteFetchSingleSuccess,
    favoriteFetchSingleFailed,
    favoriteFetchAllStart,
    favoriteFetchAllSuccess,
    favoriteFetchAllFailed,
} from './favorite.action';

export type FavoriteState = {
    readonly favoriteId: number | null;
    readonly singleFavorite: Favorite | null;
    readonly userFavorites: Favorite[] | null;
    readonly favorites: Favorite[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: FavoriteState = {
    favoriteId: null,
    singleFavorite: null,
    userFavorites: [],
    favorites: [],
    isLoading: false,
    error: null
};

export const favoriteReducer = (
    state = INITIAL_STATE, action: AnyAction
): FavoriteState => {
    if (
        favoriteFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        favoriteFetchSingleStart.match(action)
    ) {
        return { ...state, isLoading: true, favoriteId: action.payload };
    }  
    if (
        favoriteCreateSuccess.match(action) ||
        favoriteUpdateSuccess.match(action) ||
        favoriteDeleteSuccess.match(action) ||
        favoriteFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, favorites: action.payload };
    } 
    if (
        favoriteCreateFailed.match(action) ||
        favoriteUpdateFailed.match(action) ||
        favoriteDeleteFailed.match(action) ||
        favoriteFetchSingleFailed.match(action) ||
        favoriteFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};