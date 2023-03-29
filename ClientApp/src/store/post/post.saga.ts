import { takeLatest, put, all, call } from 'typed-redux-saga';

import { Post, POST_ACTION_TYPES } from './post.types';

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
    PostCreateStart,
    PostCreateSuccess,
    PostFetchAllStart,
    PostFetchSingleStart,
    PostFetchUserPostsStart,
    PostUpdateStart,
    PostDeleteStart
} from './post.action';

import { 
    getSinglePost,
    getAllPosts,
    getUserPosts,
    getUsersPosts,
    getPosts, 
    addPost, 
    editPost,
    deletePost
} from '../../utils/api/post.api';

export function* createPost({ payload: { postValue, mediaLink }}: PostCreateStart ) {
    try {
        const post = yield* call(
            addPost,
            postValue,
            mediaLink
        ); 
        yield* put(postCreateSuccess(post));
    } catch (error) {
        yield* put(postCreateFailed(error as Error));
    }
}

export function* updatePost({ payload: { postId, postValue, mediaLink }}: PostUpdateStart) {
    try {
        const post = yield* call(
            editPost,
            postId,
            postValue, 
            mediaLink
        ); 
        yield* put(postUpdateSuccess(post));
    } catch (error) {
        yield* put(postCreateFailed(error as Error));
    }
}

export function* removePost({ payload: { postId }}: PostDeleteStart) {
    try {
        const posts = yield* call(
            deletePost,
            postId
        ); 
        yield* put(postDeleteSuccess(posts));
    } catch (error) {
        yield* put(postDeleteFailed(error as Error));
    }
}

export function* fetchUserPosts() {
    try {
        const post = yield* call(getUsersPosts);
        if (!post) return;
        yield* call(postFetchAllSuccess, post);
    } catch (error) {
        yield* put(postFetchAllFailed(error as Error));
    }
}

export function* fetchOtherUsersPosts({ payload: { userId } }: PostFetchUserPostsStart) {
    try {
        const posts = yield* call(
            getUserPosts,
            userId
        );
        if (!posts) return;
        yield* call(postFetchAllSuccess, posts);
    } catch (error) {
        yield* put(postFetchAllFailed(error as Error));
    }
}

export function* fetchSinglePostAsync({ 
    payload: { postId } }: PostFetchSingleStart) {
    try {
        const postSnapshot = yield* call(
            getSinglePost,
            postId 
        );
        yield* put(postFetchSingleSuccess(postSnapshot as Post));
    } catch (error) {
        yield* put(postFetchSingleFailed(error as Error));
    }
}

export function* fetchAllPostsAsync() {
    try {
        const posts = yield* call(getAllPosts);
        yield* put(postFetchAllSuccess(posts));
    } catch (error) {
        yield* put(postFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.CREATE_START, 
        createPost
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.UPDATE_START, 
        updatePost
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.DELETE_START, 
        removePost
    );
}

export function* onFetchUserPostsStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.FETCH_USER_POSTS_START, 
        fetchUserPosts
    );
}

export function* onFetchSinglePostStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSinglePostAsync
    );
}
  
export function* onFetchPostsStart() {
    yield* takeLatest(
        POST_ACTION_TYPES.FETCH_ALL_START,
        fetchAllPostsAsync
    );
}

export function* postSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserPostsStart),
        call(onFetchSinglePostStart),
        call(onFetchPostsStart)
    ]);
}