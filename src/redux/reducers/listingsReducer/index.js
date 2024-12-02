import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  listingData: {},
  loading: false,
  error: null,
};
export const listingDataSlice = createSlice({
  name: 'listingsReducer',
  initialState,
  reducers: {
    listingsDataRequest: state => {
      state.loading = true;
      state.error = null;
    },
    listingsDataSuccess: (state, action) => {
      state.loading = false;
      state.listingData = action.payload;
    },
    listingsDataError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {listingsDataRequest, listingsDataSuccess, listingsDataError} =
  listingDataSlice.actions;
export default listingDataSlice.reducer;
