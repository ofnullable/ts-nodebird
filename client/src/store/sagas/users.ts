import { takeLatest, call, put, all, fork } from 'redux-saga/effects';
import { userActions } from '../actions/users';
import { joinApi, loadUserApi, signInApi } from '../../api/users';
import { getFailureMessage } from '../../utils/redux';

function* join({ payload }: ReturnType<typeof userActions.join.request>) {
  try {
    const { data } = yield call(joinApi, payload);
    yield put(userActions.join.success(data));
  } catch (e) {
    console.error(e);
    yield put(userActions.join.failure(getFailureMessage(e)));
  }
}

function* watchJoin() {
  yield takeLatest(userActions.join.request, join);
}

function* signIn({ payload }: ReturnType<typeof userActions.signIn.request>) {
  try {
    const { data } = yield call(signInApi, payload);
    yield put(userActions.signIn.success(data));
  } catch (e) {
    console.error(e);
    yield put(userActions.signIn.failure(getFailureMessage(e)));
  }
}

function* watchSignIn() {
  yield takeLatest(userActions.signIn.request, signIn);
}

function* loadUser({ payload }: ReturnType<typeof userActions.loadUser.request>) {
  try {
    const { data } = yield call(loadUserApi, payload);
    yield put(userActions.loadUser.success(data));
  } catch (e) {
    console.error(e);
    yield put(userActions.loadUser.failure(getFailureMessage(e)));
  }
}

function* watchLoadUser() {
  yield takeLatest(userActions.loadUser.request, loadUser);
}

export default function* userSaga() {
  yield all([fork(watchJoin), fork(watchSignIn), fork(watchLoadUser)]);
}
