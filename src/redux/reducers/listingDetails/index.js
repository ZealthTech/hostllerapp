import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  details: [],
  loading: false,
  error: null,
};
export const listingDetailsSlice = createSlice({
  name: 'listingDetails',
  initialState,
  reducers: {
    listingDetailsRequest: state => {
      state.loading = true;
      state.error = null;
    },
    listingDetailsSuccess: (state, action) => {
      state.loading = false;
      state.details = action.payload;
    },
    listingDetailsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  listingDetailsRequest,
  listingDetailsSuccess,
  listingDetailsError,
} = listingDetailsSlice.actions;
export default listingDetailsSlice.reducer;
