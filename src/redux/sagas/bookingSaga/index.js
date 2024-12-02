import {call, put, takeLatest} from 'redux-saga/effects';
import {
  listingDetailsError,
  listingDetailsRequest,
  listingDetailsSuccess,
} from '../../reducers/listingDetails';
import {apiPost} from '../../../network/axiosInstance';
import {LISTING_BOOKING} from '../../../utils/constants/apiEndPoints';
import {
  bookingError,
  bookingRequest,
  bookingSuccess,
} from '../../reducers/bookingReducer';

function* bookRoom(action) {
  try {
    const response = yield call(
      apiPost,
      LISTING_BOOKING,
      action?.payload,
      null,
    );
    yield put(bookingSuccess(response?.data));
    console.log('response booking', response);
  } catch (error) {
    yield put(bookingError(error.message));
  }
}
export function* bookingRoomNetworkCall() {
  yield takeLatest(bookingRequest, bookRoom);
}
