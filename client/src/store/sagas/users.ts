import { takeLatest, call, put, all, fork } from 'redux-saga/effects';
import { userActions } from '../actions/users';
import {
  editNicknameApi,
  followApi,
  joinApi,
  loadFollowersApi,
  loadFollowingsApi,
  loadMyInfoApi,
  loadUserInfoApi,
  removeFollowerApi,
  signInApi,
  signOutApi,
  unfollowApi,
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

function* follow({ payload }: ReturnType<typeof userActions.follow.request>) {
  try {
    const { data } = yield call(followApi, payload);
    yield put(userActions.follow.success(data));
  } catch (e) {
    console.error(e);
    yield put(userActions.follow.failure(getFailureMessage(e)));
  }
}

function* watchFollow() {
  yield takeLatest(userActions.follow.request, follow);
}

function* unfollow({ payload }: ReturnType<typeof userActions.unfollow.request>) {
  try {
    const { data } = yield call(unfollowApi, payload);
    yield put(userActions.unfollow.success(data));
  } catch (e) {
    console.error(e);
    yield put(userActions.unfollow.failure(getFailureMessage(e)));
  }
}

function* watchUnfollow() {
  yield takeLatest(userActions.unfollow.request, unfollow);
}

function* removeFollower({ payload }: ReturnType<typeof userActions.removeFollower.request>) {
  try {
    const { data } = yield call(removeFollowerApi, payload);
    yield put(userActions.removeFollower.success(data));
  } catch (e) {
    console.error(e);
    yield put(userActions.removeFollower.failure(getFailureMessage(e)));
  }
}

function* watchRemoveFollower() {
  yield takeLatest(userActions.removeFollower.request, removeFollower);
}

function* editNickname({ payload }: ReturnType<typeof userActions.editNickname.request>) {
  try {
    const { data } = yield call(editNicknameApi, payload);
    yield put(userActions.editNickname.success(data));
  } catch (e) {
    console.error(e);
    yield put(userActions.editNickname.failure(getFailureMessage(e)));
  }
}

function* watchEditNickname() {
  yield takeLatest(userActions.editNickname.request, editNickname);
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
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchRemoveFollower),
    fork(watchEditNickname),
  ]);
}
