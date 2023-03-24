import { combineReducers } from 'redux';
import { chatReducer } from './chat/chat.reducer';
import { chatcommentReducer } from './chatcomment/chatcomment.reducer';
import { followerReducer } from './follower/follower.reducer';
import { messageReducer } from './message/message.reducer';
import { messagecommentReducer } from './messagecomment/messagecomment.reducer';
import { postReducer } from './post/post.reducer';
import { profileReducer } from './profile/profile.reducer';
import { toolReducer } from './tool/tool.reducer';
import { toolboxReducer } from './toolbox/toolbox.reducer';
import { userReducer } from './user/user.reducer';
import { userprofileReducer } from './userprofiles/userprofile.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  userprofile: userprofileReducer,
  toolbox: toolboxReducer,
  tool: toolReducer,
  profile: profileReducer,
  post: postReducer,
  message: messageReducer,
  messagecomment: messagecommentReducer,
  follower: followerReducer,
  chat: chatReducer,
  chatcomment: chatcommentReducer,
});