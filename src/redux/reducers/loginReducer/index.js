import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  message: null,
  loginStatus: false,
  data: {},
};
const loginSlice = createSlice({
  name: 'loginReducer',
  initialState: initialState,
  reducers: {
    loginRequest: state => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      console.log('login success called ');
      state.loading = false;
      state.data = action.payload;
      state.message = action.payload?.message;
      state.loginStatus = true;
      state.token = action?.payload?.data?.token;
    },
    loginFailure: (state, action) => {
      console.log('action ', action?.payload);
      state.loading = false;
      state.message = action.payload;
      state.loginStatus = false;
    },
    resetLoginState: state => {
      state.message = null;
      state.loginStatus = false;
    },
  },
});
export const {loginRequest, loginSuccess, loginFailure, resetLoginState} =
  loginSlice.actions;
export default loginSlice.reducer;
