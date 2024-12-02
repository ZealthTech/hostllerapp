import {call, put, takeLatest} from 'redux-saga/effects';
import {
  listingsDataError,
  listingsDataRequest,
  listingsDataSuccess,
} from '../../reducers/listingsReducer';
import {apiPost} from '../../../network/axiosInstance';
import {LISTINGS_URL} from '../../../utils/constants/apiEndPoints';

function* fetchListings(action) {
  console.log('saga listings', action);
  try {
    const response = yield call(apiPost, LISTINGS_URL, action?.payload, null);
    console.log('saga data', response);
    if (response?.status) {
      console.log('16 ');
      yield put(listingsDataSuccess(response?.data));
    } else {
      console.log('19 ');
      yield put(listingsDataError(response?.message));
    }
  } catch (error) {
    yield put(listingsDataError(error.message));
  }
}
export function* listingsNetworkCall() {
  yield takeLatest(listingsDataRequest, fetchListings);
}
