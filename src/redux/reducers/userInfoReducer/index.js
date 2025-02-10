import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  fcmToken: '',
};
export const userInfoSlice = createSlice({
  name: 'userInfoReducer',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action?.payload;
    },
    clearUserInfo: state => {
      state.userInfo = null;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action?.payload;
    },
  },
});
export const {setUserInfo, clearUserInfo, setFcmToken} = userInfoSlice.actions;
export default userInfoSlice.reducer;
