import { AnyAction } from 'redux';

import { Post } from './post.types';

import {
    postCreateStart,
    postCreateSuccess,
    postCreateFailed,
    postUpdateStart,
    postUpdateSuccess,
    postUpdateFailed,
    postDeleteStart,
    postDeleteSuccess,
    postDeleteFailed,
    postFetchSingleStart,
    postFetchSingleSuccess,
    postFetchSingleFailed,
    postFetchAllStart,
    postFetchAllSuccess,
    postFetchAllFailed,
} from './post.action';

export type PostState = {
    readonly postId: number | null;
    readonly singlePost: Post | null;
    readonly userPosts: Post[] | null;
    readonly posts: Post[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: PostState = {
    postId: null,
    singlePost: null,
    userPosts: [],
    posts: [],
    isLoading: false,
    error: null,
};

export const postReducer = (
    state = INITIAL_STATE, action: AnyAction
): PostState => {
    if (
        postFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        postCreateSuccess.match(action) ||
        postUpdateSuccess.match(action) ||
        postDeleteSuccess.match(action) ||
        postFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, posts: action.payload };
    } 
    if (
        postCreateFailed.match(action) ||
        postUpdateFailed.match(action) ||
        postDeleteFailed.match(action) ||
        postFetchSingleFailed.match(action) ||
        postFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};