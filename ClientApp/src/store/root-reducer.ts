import { combineReducers } from 'redux';
import { artificialIntelligenceReducer } from './artificialintelligence/artificialintelligence.reducer';
import { chatReducer } from './chat/chat.reducer';
import { chatcommentReducer } from './chatcomment/chatcomment.reducer';
import { commentReducer } from './comment/comment.reducer';
import { favoriteReducer } from './favorite/favorite.reducer';
import { followerReducer } from './follower/follower.reducer';
import { messageReducer } from './message/message.reducer';
import { messagecommentReducer } from './messagecomment/messagecomment.reducer';
import { moonReducer } from './moon/moon.reducer';
import { planetReducer } from './planet/planet.reducer';
import { postReducer } from './post/post.reducer';
import { profileReducer } from './profile/profile.reducer';
import { toolReducer } from './tool/tool.reducer';
import { toolboxReducer } from './toolbox/toolbox.reducer';
import { userReducer } from './user/user.reducer';
import { userprofileReducer } from './userprofile/userprofile.reducer';

export const rootReducer = combineReducers({
  artificialIntelligence: artificialIntelligenceReducer,
  chat: chatReducer,
  chatcomment: chatcommentReducer,
  comment: commentReducer,
  favorite: favoriteReducer,
  follower: followerReducer,
  message: messageReducer,
  messagecomment: messagecommentReducer,
  moon: moonReducer,
  planet: planetReducer,
  post: postReducer,
  profile: profileReducer,
  tool: toolReducer,
  toolbox: toolboxReducer,
  user: userReducer,
  userprofile: userprofileReducer
});