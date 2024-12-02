import {call, put, takeLatest} from 'redux-saga/effects';
import {apiGet, apiPost} from '../../../network/axiosInstance';
import {LOGIN_URL} from '../../../utils/constants/apiEndPoints';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from '../../reducers/authenticationReducer';
import {getDataFromStorage, setDataToStorage} from '../../../utils/storage';
import {REGISTER_DATA, TOKEN} from '../../../utils/constants/constants';

function* fetchLoginData(action) {
  console.log('saga 7', action);
  try {
    const response = yield call(apiPost, LOGIN_URL, action?.payload, null);
    yield put(loginSuccess(response));
    console.log('response?.data?.token ', response?.data?.token);
    const userDataString = yield call(getDataFromStorage, REGISTER_DATA);
    const userData = userDataString ? JSON.parse(userDataString) : {};

    const updatedUserData = {
      ...userData,
      token: response?.data?.token,
    };

    yield call(
      setDataToStorage,
      REGISTER_DATA,
      JSON.stringify(updatedUserData),
    );
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}
export function* loginNetworkCall() {
  yield takeLatest(loginRequest, fetchLoginData);
}
