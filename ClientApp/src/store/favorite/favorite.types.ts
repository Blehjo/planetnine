export enum FAVORITE_ACTION_TYPES  {
    CREATE_START = 'favorite/CREATE_START',
    CREATE_SUCCESS = 'favorite/CREATE_SUCCESS',
    CREATE_FAILED = 'favorite/CREATE_FAILED',
    UPDATE_START = 'favorite/UPDATE_START',
    UPDATE_SUCCESS = 'favorite/UPDATE_SUCCESS',
    UPDATE_FAILED = 'favorite/UPDATE_FAILED',
    DELETE_START = 'favorite/DELETE_START',
    DELETE_SUCCESS = 'favorite/DELETE_SUCCESS',
    DELETE_FAILED = 'favorite/DELETE_FAILED',
    FETCH_SINGLE_START = 'favorite/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'favorite/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'favorite/FETCH_SINGLE_FAILED',
    FETCH_USER_FAVORITES_START = 'favorite/FETCH_USER_FAVORITES_START',
    FETCH_USER_FAVORITES_SUCCESS = 'favorite/FETCH_USER_FAVORITES_SUCCESS',
    FETCH_USER_FAVORITES_FAILED = 'favorite/FETCH_USER_FAVORITES_FAILED',
    FETCH_ALL_START = 'favorite/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'favorite/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'favorite/FETCH_ALL_FAILED',
};

export type Favorite = {
    favoriteId: number | null;
    contentId: number;
    contentType: string | null;
    dateCreated: Date | null;
}