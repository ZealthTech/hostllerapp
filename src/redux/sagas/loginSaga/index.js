import {call, put, takeLatest} from 'redux-saga/effects';
import {apiGet, apiPost} from '../../../network/axiosInstance';
import {LOGIN_URL} from '../../../utils/constants/apiEndPoints';
import {getDataFromStorage, setDataToStorage} from '../../../utils/storage';
import {REGISTER_DATA, TOKEN} from '../../../utils/constants/constants';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from '../../reducers/loginReducer';
import {setUserInfo} from '../../reducers/userInfoReducer';

function* fetchLoginData(action) {
  console.log('saga 7', action);
  try {
    const response = yield call(apiPost, LOGIN_URL, action?.payload, null);
    if (response?.status) {
      yield put(loginSuccess(response));
      const userDataString = yield call(getDataFromStorage, REGISTER_DATA);
      const userData = userDataString ? JSON.parse(userDataString) : null;

      console.log('userData 22 ', userData);
      let updatedUserData;
      if (userData == null) {
        updatedUserData = {
          userData: response?.data,
          token: response?.data?.token,
        };
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
    } else {
      console.log('response 45 ', response);
      yield put(loginFailure(response.message));
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}
export function* loginNetworkCall() {
  yield takeLatest(loginRequest, fetchLoginData);
}
