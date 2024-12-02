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
  try {
    const response = yield call(
      postDataWithImages,
      ADD_REVIEW,
      action?.payload,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3REYXRhIjp7InVzZXJJZCI6IlVTUlc3SE9YQiIsInVzZXJOYW1lIjoiYW5hbnlhNzg1OCIsIm5hbWUiOiJBTkFOWUEgUEFOREVZIiwicGhvbmUiOjY2NjY2MDAwMDAsInJvbGUiOjV9LCJpYXQiOjE3MzE1ODk0ODl9.IfHsyQLtH000GySa4a8JLrBpP4mC1J6mptAFGFFLF2U',
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
