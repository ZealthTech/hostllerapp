import {call, put, takeLatest} from 'redux-saga/effects';
import {
  forgotPassFailure,
  forgotPassRequest,
  forgotPassSuccess,
  otpSendRequest,
  otpVerificationFailure,
  otpVerificationSuccess,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
} from '../../reducers/authenticationReducer';
import {
  FORGOT_PASSWORD,
  SIGNUP_URL,
  VERIFY_OTP,
} from '../../../utils/constants/apiEndPoints';
import {apiPost} from '../../../network/axiosInstance';
import {setDataToStorage} from '../../../utils/storage';
import {REGISTER_DATA, TOKEN} from '../../../utils/constants/constants';

function* registerUser(action) {
  try {
    const response = yield call(apiPost, SIGNUP_URL, action?.payload, null);
    console.log('16 status ', response?.status);
    if (response?.status) {
      yield put(registerUserSuccess(response));
      yield call(
        setDataToStorage,
        REGISTER_DATA,
        JSON.stringify(response?.data),
      );
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
