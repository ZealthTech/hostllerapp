import {call, put, takeLatest} from 'redux-saga/effects';
import {
  listingsDataError,
  listingsDataRequest,
  listingsDataSuccess,
} from '../../reducers/listingsReducer';
import {apiPost} from '../../../network/axiosInstance';
import {LISTINGS_URL} from '../../../utils/constants/apiEndPoints';

function* fetchListings(action) {
  try {
    const response = yield call(apiPost, LISTINGS_URL, action?.payload, null);
    if (response?.status) {
      yield put(listingsDataSuccess(response?.data));
    } else {
      yield put(listingsDataError(response?.message));
    }
  } catch (error) {
    yield put(listingsDataError(error.message));
  }
}
export function* listingsNetworkCall() {
  yield takeLatest(listingsDataRequest, fetchListings);
}
