import {call, put, takeLatest} from 'redux-saga/effects';
import {apiPost} from '../../../network/axiosInstance';
import {HOME_URL} from '../../../utils/constants/apiEndPoints';
import {
  homeDataError,
  homeDataRequest,
  homeDataSuccess,
} from '../../reducers/homeReducer';

function* fetchHomeData(action) {
  console.log('saga home', action?.payload);
  console.log('payload token ', action?.payload?.token);
  const token = action?.payload?.token;
  try {
    const response = yield call(apiPost, HOME_URL, action?.payload, token);
    yield put(homeDataSuccess(response?.data));
    console.log('response home', response);
  } catch (error) {
    yield put(homeDataError(error.message));
  }
}
export function* homeDataNetworkCall() {
  yield takeLatest(homeDataRequest, fetchHomeData);
}
