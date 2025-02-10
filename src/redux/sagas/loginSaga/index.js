import {call, put, takeLatest} from 'redux-saga/effects';
import {apiPost} from '../../../network/axiosInstance';
import {LOGIN_URL} from '../../../utils/constants/apiEndPoints';
import {getDataFromStorage, setDataToStorage} from '../../../utils/storage';
import {REGISTER_DATA} from '../../../utils/constants/constants';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from '../../reducers/loginReducer';
import {setUserInfo} from '../../reducers/userInfoReducer';

function* fetchLoginData(action) {
  try {
    const response = yield call(apiPost, LOGIN_URL, action?.payload, null);
    if (response?.status) {
      const userDataString = yield call(getDataFromStorage, REGISTER_DATA);
      const userData = userDataString ? JSON.parse(userDataString) : null;
      let updatedUserData;
      if (userData == null) {
        updatedUserData = response?.data;
      } else {
        updatedUserData = {
          ...userData,
          token: response?.data?.token,
        };
      }
      yield call(
        setDataToStorage,
        REGISTER_DATA,
        JSON.stringify(updatedUserData),
      );
      yield put(setUserInfo(updatedUserData));
      yield put(loginSuccess(response));
    } else {
      yield put(loginFailure(response.message));
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}
export function* loginNetworkCall() {
  yield takeLatest(loginRequest, fetchLoginData);
}
