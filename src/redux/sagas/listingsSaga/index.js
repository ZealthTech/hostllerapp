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
    console.log('saga data', response, action?.payload);
    if (response?.status) {
      yield put(listingsDataSuccess(response?.data));
    } else {
      console.log('response?.message ', response?.message);
      yield put(listingsDataError(response?.message));
    }
  } catch (error) {
    console.log('21 ', error);
    yield put(listingsDataError(error.message));
  }
}
export function* listingsNetworkCall() {
  yield takeLatest(listingsDataRequest, fetchListings);
}
