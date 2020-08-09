import { takeLatest, call, put, all, fork } from 'redux-saga/effects';
import { userActions } from '../actions/users';
import {
  joinApi,
  loadFollowersApi,
  loadFollowingsApi,
  loadMyInfoApi,
  loadUserInfoApi,
  signInApi,
  signOutApi,
} from '../../api/users';
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

function* signOut() {
  try {
    yield call(signOutApi);
    yield put(userActions.signOut.success());
  } catch (e) {
    console.error(e);
    yield put(userActions.signOut.failure(getFailureMessage(e)));
  }
}

function* watchSignOut() {
  yield takeLatest(userActions.signOut.request, signOut);
}

function* loadMyInfo() {
  try {
    const { data } = yield call(loadMyInfoApi);
    yield put(userActions.loadMyInfo.success(data));
  } catch (e) {
    console.error(e);
    yield put(userActions.loadMyInfo.failure(getFailureMessage(e)));
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(userActions.loadMyInfo.request, loadMyInfo);
}

function* loadUserInfo({ payload }: ReturnType<typeof userActions.loadUserInfo.request>) {
  try {
    const { data } = yield call(loadUserInfoApi, payload);
    yield put(userActions.loadUserInfo.success(data));
  } catch (e) {
    console.error(e);
    yield put(userActions.loadUserInfo.failure(getFailureMessage(e)));
  }
}

function* watchLoadUserInfo() {
  yield takeLatest(userActions.loadUserInfo.request, loadUserInfo);
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
    fork(watchSignOut),
    fork(watchLoadMyInfo),
    fork(watchLoadUserInfo),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
  ]);
}
