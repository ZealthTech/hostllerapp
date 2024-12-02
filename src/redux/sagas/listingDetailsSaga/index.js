import {call, put, takeLatest} from 'redux-saga/effects';
import {LISTING_DETAILS} from '../../../utils/constants/apiEndPoints';
import {apiPost} from '../../../network/axiosInstance';
import {
  listingDetailsError,
  listingDetailsRequest,
  listingDetailsSuccess,
} from '../../reducers/listingDetails';

function* fetchListingDetails(action) {
  try {
    const response = yield call(
      apiPost,
      LISTING_DETAILS,
      action?.payload,
      null,
    );
    yield put(listingDetailsSuccess(response?.data));
  } catch (error) {
    yield put(listingDetailsError(error.message));
  }
}
export function* listingDetailsNetworkCall() {
  yield takeLatest(listingDetailsRequest, fetchListingDetails);
}
