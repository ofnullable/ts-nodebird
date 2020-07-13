import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { postActions } from '../actions/posts';
import { getFailureMessage } from '../../utils/redux';
import { removeImageApi, uploadImageApi } from '../../api/posts';

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

export default function* postSaga() {
  yield all([fork(watchUploadImage), fork(watchRemoveImage)]);
}
