import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { postActions } from '../actions/posts';
import { getFailureMessage } from '../../utils/redux';
import {
  addPostApi,
  likePostApi,
  loadHashtagPostsApi,
  loadMainPostsApi,
  loadUserPostsApi,
  removeImageApi,
  removePostApi,
  retweetApi,
  unlikePostApi,
  uploadImageApi,
} from '../../api/posts';
import { userActions } from '../actions/users';

function* uploadImage({ payload }: ReturnType<typeof postActions.uploadImages.request>) {
  try {
    const { data } = yield call(uploadImageApi, payload);
    yield put(postActions.uploadImages.success(data));
  } catch (e) {
    console.error(e);
    yield put(postActions.uploadImages.failure(getFailureMessage(e)));
  }
}

function* watchUploadImage() {
  yield takeLatest(postActions.uploadImages.request, uploadImage);
}

function* removeImage({ payload }: ReturnType<typeof postActions.removeImage.request>) {
  try {
    const { data } = yield call(removeImageApi, payload);
    yield put(postActions.removeImage.success(data.path));
  } catch (e) {
    console.error(e);
    yield put(postActions.removeImage.failure(getFailureMessage(e)));
  }
}

function* watchRemoveImage() {
  yield takeLatest(postActions.removeImage.request, removeImage);
}

function* addPost({ payload }: ReturnType<typeof postActions.addPost.request>) {
  try {
    const { data } = yield call(addPostApi, payload);
    yield put(postActions.addPost.success(data));
  } catch (e) {
    console.error(e);
    yield put(postActions.addPost.failure(getFailureMessage(e)));
  }
}

function* watchAddPost() {
  yield takeLatest(postActions.addPost.request, addPost);
}

function* loadMainPosts({ payload }: ReturnType<typeof postActions.loadMainPosts.request>) {
  try {
    const { data } = yield call(loadMainPostsApi, payload.lastId);
    yield put(postActions.loadMainPosts.success(data));
  } catch (e) {
    console.error(e);
    yield put(postActions.loadMainPosts.failure(getFailureMessage(e)));
  }
}

function* watchLoadMainPosts() {
  yield takeLatest(postActions.loadMainPosts.request, loadMainPosts);
}

function* loadHashtagPosts({ payload }: ReturnType<typeof postActions.loadHashtagPosts.request>) {
  try {
    const { data } = yield call(loadHashtagPostsApi, payload);
    yield put(postActions.loadHashtagPosts.success(data));
  } catch (e) {
    console.error(e);
    yield put(postActions.loadHashtagPosts.failure(e));
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(postActions.loadHashtagPosts.request, loadHashtagPosts);
}

function* loadUserPosts({ payload }: ReturnType<typeof postActions.loadUserPosts.request>) {
  try {
    const { data } = yield call(loadUserPostsApi, payload);
    yield put(postActions.loadUserPosts.success(data));
  } catch (e) {
    console.error(e);
    yield put(postActions.loadUserPosts.failure(getFailureMessage(e)));
  }
}

function* watchLoadUserPosts() {
  yield takeLatest(postActions.loadUserPosts.request, loadUserPosts);
}

function* likePost({ payload: postId }: ReturnType<typeof postActions.likePost.request>) {
  try {
    const { data } = yield call(likePostApi, postId);
    yield put(postActions.likePost.success({ userId: data, postId }));
  } catch (e) {
    console.error(e);
    yield put(postActions.likePost.failure(getFailureMessage(e)));
  }
}

function* watchLikePost() {
  yield takeLatest(postActions.likePost.request, likePost);
}

function* unlikePost({ payload: postId }: ReturnType<typeof postActions.unlikePost.request>) {
  try {
    const { data } = yield call(unlikePostApi, postId);
    yield put(postActions.unlikePost.success({ userId: data.userId, postId }));
  } catch (e) {
    console.error(e);
    yield put(postActions.unlikePost.failure(getFailureMessage(e)));
  }
}

function* watchUnlikePost() {
  yield takeLatest(postActions.unlikePost.request, unlikePost);
}

function* removePost({ payload: postId }: ReturnType<typeof postActions.removePost.request>) {
  try {
    const { data } = yield call(removePostApi, postId);
    yield put(postActions.removePost.success(data));
    yield put(userActions.removePost(data));
  } catch (e) {
    console.error(e);
    yield put(postActions.removePost.failure(getFailureMessage(e)));
  }
}

function* watchRemovePost() {
  yield takeLatest(postActions.removePost.request, removePost);
}

function* retweet({ payload: postId }: ReturnType<typeof postActions.retweet.request>) {
  try {
    const { data } = yield call(retweetApi, postId);
    yield put(postActions.retweet.success(data));
  } catch (e) {
    console.error(e);
    yield put(postActions.retweet.failure(getFailureMessage(e)));
  }
}

function* watchRetweetPost() {
  yield takeLatest(postActions.retweet.request, retweet);
}

export default function* postSaga() {
  yield all([
    fork(watchUploadImage),
    fork(watchRemoveImage),
    fork(watchAddPost),
    fork(watchLoadMainPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchRemovePost),
    fork(watchRetweetPost),
  ]);
}
