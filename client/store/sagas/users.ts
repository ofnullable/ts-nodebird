import { takeLatest, call, put, all, fork } from 'redux-saga/effects';
import { userActions } from '../actions/users';
import { joinApi } from '../../api/users';

function* join({ payload }: ReturnType<typeof userActions.join.request>) {
  try {
    const { data } = yield call(joinApi, payload);
    yield put(userActions.join.success(data));
  } catch (e) {
    yield put(userActions.join.failure(e.response?.data.message));
  }
}

function* watchJoin() {
  yield takeLatest(userActions.join.request, join);
}

export default function* userSaga() {
  yield all([fork(watchJoin)]);
}
