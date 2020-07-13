import { all, fork } from 'redux-saga/effects';

import user from './users';

function* rootReducer() {
  yield all([fork(user)]);
}

export default rootReducer;
