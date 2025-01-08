import {combineReducers} from '@reduxjs/toolkit';
import userInfoReducer from '../reducers/userInfoReducer';
import authenticationReducer from '../reducers/authenticationReducer';
import homeReducer from '../reducers/homeReducer';
import listingsReducer from '../reducers/listingsReducer';
import listingDetails from '../reducers/listingDetails';
import addReviewReducer from '../reducers/addReviewReducer';
import bookingsReducer from '../reducers/bookingReducer';
import loginReducer from '../reducers/loginReducer';
import registerReducer from '../reducers/registerReducer';
import bookingReducer from '../reducers/bookingSummary';
export const appReducer = combineReducers({
  userInfoReducer: userInfoReducer,
  authReducer: authenticationReducer,
  homeReducer: homeReducer,
  listingsReducer: listingsReducer,
  listingDetails: listingDetails,
  addReviewReducer: addReviewReducer,
  bookingReducer: bookingsReducer,
  loginReducer: loginReducer,
  registerReducer: registerReducer,
  bookingSummary: bookingReducer,
});
