import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { postActions } from '../actions/posts';
import { getFailureMessage } from '../../utils/redux';
import { addPostApi, loadHashtagPostsApi, loadMainPostsApi, removeImageApi, uploadImageApi } from '../../api/posts';

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

export default function* postSaga() {
  yield all([
    fork(watchUploadImage),
    fork(watchRemoveImage),
    fork(watchAddPost),
    fork(watchLoadMainPosts),
    fork(watchLoadHashtagPosts),
  ]);
}
