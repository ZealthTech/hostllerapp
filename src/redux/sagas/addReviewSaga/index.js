import {call, put, takeLatest} from 'redux-saga/effects';
import {apiPost, postDataWithImages} from '../../../network/axiosInstance';
import {ADD_REVIEW} from '../../../utils/constants/apiEndPoints';
import {
  addReviewFailure,
  addReviewRequest,
  addReviewSuccess,
} from '../../reducers/addReviewReducer';

function* addReview(action) {
  console.log('add review', action);
  console.log('add review action payload:', action.payload);

  try {
    const response = yield call(
      postDataWithImages,
      ADD_REVIEW,
      action?.payload?.formData,
      action?.payload?.token,
    );
    console.log('review response ', response);
    yield put(addReviewSuccess(response));
  } catch (error) {
    yield put(addReviewFailure(error.message));
  }
}
export function* addReviewNetworkCall() {
  yield takeLatest(addReviewRequest, addReview);
}
