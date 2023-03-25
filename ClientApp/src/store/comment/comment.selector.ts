import { createSelector } from 'reselect';

import { RootState } from '../store';
import { CommentState } from './comment.reducer';

export const selectCommentReducer = (state: RootState): CommentState => state.comment;

export const selectChatId = createSelector(
    [selectCommentReducer],
    (chat) => chat.commentId
);

export const selectSingleChat = createSelector(
    [selectCommentReducer],
    (chat) => chat.singleComment
);

export const selectUserChats = createSelector(
    [selectCommentReducer],
    (chat) => chat.userComments
);

export const selectAllChats = createSelector(
    [selectCommentReducer],
    (chat) => chat.comments
);