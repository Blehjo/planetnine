import { all, call } from 'typed-redux-saga/macro';
import { artificialIntelligenceSagas } from './artificialintelligence/artificialintelligence.saga';

import { chatSagas } from './chat/chat.saga';
import { chatCommentSagas } from './chatcomment/chatcomment.saga';
import { commentSagas } from './comment/comment.saga';
import { favoriteSagas } from './favorite/favorite.saga';
import { followerSagas } from './follower/follower.saga';
import { messageSagas } from './message/message.saga';
import { messageCommentSagas } from './messagecomment/messagecomment.saga';
import { moonSagas } from './moon/moon.saga';
import { pilotSagas } from './pilot/pilot.saga';
import { planetSagas } from './planet/planet.saga';
import { postSagas } from './post/post.saga';
import { toolSagas } from './tool/tool.saga';
import { userSagas } from './user/user.saga';
import { userprofileSagas } from './userprofile/userprofile.saga';

export function* rootSaga() {
  yield* all([
    call(artificialIntelligenceSagas),
    call(chatSagas), 
    call(chatCommentSagas), 
    call(commentSagas), 
    call(favoriteSagas), 
    call(followerSagas), 
    call(messageSagas), 
    call(messageCommentSagas), 
    call(moonSagas), 
    call(pilotSagas), 
    call(planetSagas), 
    call(postSagas), 
    call(toolSagas), 
    call(userSagas),
    call(userprofileSagas)
]);
}