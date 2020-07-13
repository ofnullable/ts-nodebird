import { all, fork } from 'redux-saga/effects';

import user from './users';
import post from './posts';

function* rootReducer() {
  yield all([fork(user), fork(post)]);
}

export default rootReducer;
