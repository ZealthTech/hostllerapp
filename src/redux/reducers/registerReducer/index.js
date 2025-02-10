import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
  loading: false,
  message: null,
  status: false,
};
const registerSlice = createSlice({
  name: 'registerReducer',
  initialState: initialState,
  reducers: {
    registerUserRequest: state => {
      state.loading = true;
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action?.payload?.data;
      state.status = action?.payload?.status;
      state.message = action?.payload?.message;
    },
    registerUserFailure: (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.status = action?.payload?.status;
    },
    resetRegisterState: state => {
      state.loading = false;
      state.message = null;
      state.status = false;
    },
  },
});
export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
  resetRegisterState,
} = registerSlice.actions;
export default registerSlice.reducer;
