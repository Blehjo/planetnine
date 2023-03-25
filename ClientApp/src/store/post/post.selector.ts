import { createSelector } from 'reselect';

import { RootState } from '../store';
import { PostState } from './post.reducer';

export const selectPostReducer = (state: RootState): PostState => state.post;

export const selectpostItems = createSelector(
    [selectPostReducer],
    (post) => post.posts
);

export const selectpostId = createSelector(
    [selectPostReducer],
    (post) => post.postId
);

export const selectSinglepost = createSelector(
    [selectPostReducer],
    (post) => post.singlePost
);

export const selectUserposts = createSelector(
    [selectPostReducer],
    (post) => post.userPosts
);

export const selectAllposts = createSelector(
    [selectPostReducer],
    (post) => post.posts
);