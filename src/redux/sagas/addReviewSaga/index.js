import {call, put, takeLatest} from 'redux-saga/effects';
import {postDataWithImages} from '../../../network/axiosInstance';
import {ADD_REVIEW} from '../../../utils/constants/apiEndPoints';
import {
  addReviewFailure,
  addReviewRequest,
  addReviewSuccess,
} from '../../reducers/addReviewReducer';

function* addReview(action) {
  try {
    const response = yield call(
      postDataWithImages,
      ADD_REVIEW,
      action?.payload?.formData,
      action?.payload?.token,
    );
    yield put(addReviewSuccess(response));
  } catch (error) {
    yield put(addReviewFailure(error.message));
  }
}
export function* addReviewNetworkCall() {
  yield takeLatest(addReviewRequest, addReview);
}
