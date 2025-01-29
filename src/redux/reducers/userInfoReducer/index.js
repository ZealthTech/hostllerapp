import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
};
export const userInfoSlice = createSlice({
  name: 'userInfoReducer',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      console.log('11 ', action?.payload);
      state.userInfo = action?.payload;
    },
    clearUserInfo: state => {
      state.userInfo = null;
    },
  },
});
export const {setUserInfo, clearUserInfo} = userInfoSlice.actions;
export default userInfoSlice.reducer;
