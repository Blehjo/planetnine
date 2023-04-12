import { createSelector } from 'reselect';

import { RootState } from '../store';

import { ChatState } from './chat.reducer';

export const selectChatReducer = (state: RootState): ChatState => state.chat;

export const selectChatId = createSelector(
  [selectChatReducer],
  (chat) => chat.chatId
);

export const selectSingleChat = createSelector(
  [selectChatReducer],
  (chat) => chat.singleChat
);

export const selectUserChats = createSelector(
  [selectChatReducer],
  (chat) => chat.userChats
);

export const selectSingleUserChats = createSelector(
  [selectChatReducer],
  (chat) => chat.singleUserChats
);

export const selectAllChats = createSelector(
  [selectChatReducer],
  (chat) => chat.chats
);