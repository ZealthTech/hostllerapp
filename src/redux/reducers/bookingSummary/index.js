import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bookingSummary: {},
};
const bookingSummarySlice = createSlice({
  initialState: initialState,
  name: 'bookingSummary',
  reducers: {
    setBookingSummary: (state, action) => {
      console.log('action.payload ', action.payload);
      state.bookingSummary = action.payload;
    },
  },
});
export const {setBookingSummary} = bookingSummarySlice.actions;
export default bookingSummarySlice.reducer;
