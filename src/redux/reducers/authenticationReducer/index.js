import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
  loading: false,
  error: null,
  status: false,
  otpStatus: false,
  loginStatus: false,
  token: '',
  forgotPassStatus: false,
  responseMsgPass: '',
};
const authSlice = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    loginRequest: state => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.loginStatus = action?.payload?.status;
      state.token = action?.payload?.data?.token;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerUserRequest: state => {
      state.loading = true;
      state.error = null;
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action?.payload?.data;
      state.status = action?.payload?.status;
    },
    registerUserFailure: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    },
    otpSendRequest: state => {
      state.loading = true;
      state.error = null;
    },
    otpVerificationSuccess: (state, action) => {
      state.loading = false;
      state.otpStatus = action?.payload?.status;
    },
    otpVerificationFailure: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.otpStatus = action?.payload?.status;
    },
    resetStatus: state => {
      state.status = false;
      state.loginStatus = false;
    },
    forgotPassRequest: state => {
      state.loading = true;
      state.error = null;
    },
  },
});
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
  otpSendRequest,
  otpVerificationSuccess,
  otpVerificationFailure,
  resetStatus,
} = authSlice.actions;
export default authSlice.reducer;
