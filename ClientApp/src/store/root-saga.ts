import { all, call } from 'typed-redux-saga/macro';

import { chatSagas } from './chat/chat.saga';
import { chatCommentSagas } from './chatcomment/chatcomment.saga';
import { commentSagas } from './comment/comment.saga';
import { favoriteSagas } from './favorite/favorite.saga';
import { followerSagas } from './follower/follower.saga';
import { messageSagas } from './message/message.saga';
import { messageCommentSagas } from './messagecomment/messagecomment.saga';
import { moonSagas } from './moon/moon.saga';
import { planetSagas } from './planet/planet.saga';
import { postSagas } from './post/post.saga';
import { toolSagas } from './tool/tool.saga';
import { userSagas } from './user/user.saga';
import { userprofileSagas } from './userprofiles/userprofile.saga';

export function* rootSaga() {
  yield* all([
    call(chatSagas), 
    call(chatCommentSagas), 
    call(commentSagas), 
    call(favoriteSagas), 
    call(followerSagas), 
    call(messageSagas), 
    call(messageCommentSagas), 
    call(moonSagas), 
    call(planetSagas), 
    call(postSagas), 
    call(toolSagas), 
    call(userSagas),
    call(userprofileSagas)
]);
}