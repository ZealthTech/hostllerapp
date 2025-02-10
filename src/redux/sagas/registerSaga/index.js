import {call, put, takeLatest} from 'redux-saga/effects';
import {
  otpSendRequest,
  otpVerificationFailure,
  otpVerificationSuccess,
} from '../../reducers/authenticationReducer';
import {SIGNUP_URL, VERIFY_OTP} from '../../../utils/constants/apiEndPoints';
import {apiPost} from '../../../network/axiosInstance';
import {setDataToStorage} from '../../../utils/storage';
import {REGISTER_DATA} from '../../../utils/constants/constants';
import {
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
} from '../../reducers/registerReducer';
import {setUserInfo} from '../../reducers/userInfoReducer';

function* registerUser(action) {
  console.log('action?.payload ', action?.payload);
  try {
    const response = yield call(apiPost, SIGNUP_URL, action?.payload, null);
    console.log('16 status ', response);
    if (response?.status) {
      yield put(registerUserSuccess(response));
      let updatedUserData;
      updatedUserData = response?.data;

      yield call(
        setDataToStorage,
        REGISTER_DATA,
        JSON.stringify(updatedUserData),
      );
      console.log('updatedUserData42 ', updatedUserData?.userData);
      yield put(setUserInfo(updatedUserData));
    } else {
      yield put(registerUserFailure(response));
    }
  } catch (error) {
    yield put(registerUserFailure(error.message));
  }
}

function* verifyOtp(action) {
  try {
    const response = yield call(apiPost, VERIFY_OTP, action?.payload, null);
    console.log('status ', response);
    if (response?.status) {
      yield put(otpVerificationSuccess(response));
    } else {
      yield put(otpVerificationFailure(response));
    }
  } catch (error) {
    yield put(otpVerificationFailure(error.message));
  }
}

export function* registerNetworkCall() {
  yield takeLatest(registerUserRequest, registerUser);
  yield takeLatest(otpSendRequest, verifyOtp);
}
