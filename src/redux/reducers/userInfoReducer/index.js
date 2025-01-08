import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
};
export const userInfoSlice = createSlice({
  name: 'userInfoReducer',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      console.log('11 ', action?.payload);
      state.userInfo = action?.payload;
    },
  },
});
export const {setUserInfo} = userInfoSlice.actions;
export default userInfoSlice.reducer;
