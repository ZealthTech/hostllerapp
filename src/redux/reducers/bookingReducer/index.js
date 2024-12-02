import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  message: '',
  error: null,
};
const bookingSlice = createSlice({
  name: 'bookingsReducer',
  initialState: initialState,
  reducers: {
    bookingRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    bookingSuccess: (state, action) => {
      state.loading = false;
      state.message = action?.payload?.message;
      state.error = null;
    },
    bookingError: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
    },
  },
});
export const {bookingRequest, bookingSuccess, bookingError} =
  bookingSlice.actions;
export default bookingSlice.reducer;
