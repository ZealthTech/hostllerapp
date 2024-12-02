import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  message: null,
  status: null,
};
const addReviewSlice = createSlice({
  name: 'addReviewReducer',
  initialState: initialState,
  reducers: {
    addReviewRequest: state => {
      state.loading = true;
      state.error = null;
    },
    addReviewSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message;
      state.status = action.payload?.status;
    },
    addReviewFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {addReviewRequest, addReviewSuccess, addReviewFailure} =
  addReviewSlice.actions;
export default addReviewSlice.reducer;
