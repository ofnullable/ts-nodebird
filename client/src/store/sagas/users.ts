import { takeLatest, call, put, all, fork } from 'redux-saga/effects';
import { userActions } from '../actions/users';
import { joinApi, loadFollowersApi, loadFollowingsApi, loadUserApi, signInApi } from '../../api/users';
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

function* loadFollowers({ payload }: ReturnType<typeof userActions.loadFollowers.request>) {
  try {
    const { data } = yield call(loadFollowersApi, payload);
    yield put(userActions.loadFollowers.success(data));
  } catch (e) {
    console.error(e);
    yield put(userActions.loadFollowers.failure(getFailureMessage(e)));
  }
}

function* watchLoadFollowers() {
  yield takeLatest(userActions.loadFollowers.request, loadFollowers);
}

function* loadFollowings({ payload }: ReturnType<typeof userActions.loadFollowings.request>) {
  try {
    const { data } = yield call(loadFollowingsApi, payload);
    yield put(userActions.loadFollowings.success(data));
  } catch (e) {
    console.error(e);
    yield put(userActions.loadFollowings.failure(getFailureMessage(e)));
  }
}

function* watchLoadFollowings() {
  yield takeLatest(userActions.loadFollowings.request, loadFollowings);
}

export default function* userSaga() {
  yield all([
    fork(watchJoin),
    fork(watchSignIn),
    fork(watchLoadUser),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
  ]);
}
