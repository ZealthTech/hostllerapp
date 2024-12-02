import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  homeData: [],
  loading: false,
  error: null,
};
export const homeDataSlice = createSlice({
  name: 'homeReducer',
  initialState,
  reducers: {
    homeDataRequest: state => {
      state.loading = true;
      state.error = null;
    },
    homeDataSuccess: (state, action) => {
      state.loading = false;
      state.homeData = action.payload;
    },
    homeDataError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {homeDataRequest, homeDataSuccess, homeDataError} =
  homeDataSlice.actions;
export default homeDataSlice.reducer;
