import {call, put, takeLatest} from 'redux-saga/effects';
import {
  forgotPassFailure,
  forgotPassRequest,
  forgotPassSuccess,
  otpSendRequest,
  otpVerificationFailure,
  otpVerificationSuccess,
} from '../../reducers/authenticationReducer';
import {
  FORGOT_PASSWORD,
  SIGNUP_URL,
  VERIFY_OTP,
} from '../../../utils/constants/apiEndPoints';
import {apiPost} from '../../../network/axiosInstance';
import {setDataToStorage} from '../../../utils/storage';
import {REGISTER_DATA, TOKEN} from '../../../utils/constants/constants';
import {
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
} from '../../reducers/registerReducer';

function* registerUser(action) {
  console.log('action?.payload ', action?.payload);
  try {
    const response = yield call(apiPost, SIGNUP_URL, action?.payload, null);
    console.log('16 status ', response);
    if (response?.status) {
      yield put(registerUserSuccess(response));
      let updatedUserData;
      updatedUserData = {
        userData: response?.data,
        token: response?.data?.token,
      };
      yield call(
        setDataToStorage,
        REGISTER_DATA,
        JSON.stringify(updatedUserData),
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
