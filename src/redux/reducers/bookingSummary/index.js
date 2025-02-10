import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bookingSummary: {},
};
const bookingSummarySlice = createSlice({
  initialState: initialState,
  name: 'bookingSummary',
  reducers: {
    setBookingSummary: (state, action) => {
      state.bookingSummary = action.payload;
    },
  },
});
export const {setBookingSummary} = bookingSummarySlice.actions;
export default bookingSummarySlice.reducer;
