import { createSelector } from 'reselect';

import { RootState } from '../store';
import { ChatCommentState } from './chatcomment.reducer';

export const selectChatcommentReducer = (state: RootState): ChatCommentState => state.chatcomment;

export const selectChatId = createSelector(
    [selectChatcommentReducer],
    (chat) => chat.chatcommentId
);

export const selectSingleChat = createSelector(
    [selectChatcommentReducer],
    (chat) => chat.singleChatcomment
);

export const selectUserChats = createSelector(
    [selectChatcommentReducer],
    (chat) => chat.userChatcomments
);

export const selectAllChats = createSelector(
    [selectChatcommentReducer],
    (chat) => chat.chatcomments
);