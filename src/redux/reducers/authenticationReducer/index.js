import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
  loading: false,
  error: null,
  status: false,
  otpStatus: false,
  token: '',
  forgotPassStatus: false,
  responseMsgPass: '',
  message: null,
  otpAttempted: false,
};
const authSlice = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    otpSendRequest: state => {
      state.loading = true;
      state.message = null;
      state.otpAttempted = true;
    },
    otpVerificationSuccess: (state, action) => {
      state.loading = false;
      state.otpStatus = action?.payload?.status;
      state.message = action?.payload?.message;
      state.otpAttempted = true;
    },
    otpVerificationFailure: (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.otpStatus = action?.payload?.status;
    },
    resetStatus: state => {
      state.status = false;
      state.loginStatus = false;
      state.otpAttempted = false;
    },
  },
});
export const {
  otpSendRequest,
  otpVerificationSuccess,
  otpVerificationFailure,
  resetStatus,
} = authSlice.actions;
export default authSlice.reducer;
