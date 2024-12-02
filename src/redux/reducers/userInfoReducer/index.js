import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: [],
};
export const userInfoSlice = createSlice({
  name: 'userInfoReducer',
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.userInfo = action?.payload;
    },
  },
});
export const {userInfo} = userInfoSlice.actions;
export default userInfoSlice.reducer;
