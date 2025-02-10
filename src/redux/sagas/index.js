import {all} from 'redux-saga/effects';
import {loginNetworkCall} from './loginSaga';
import {registerNetworkCall} from './registerSaga';
import {listingsNetworkCall} from './listingsSaga';
import {listingDetailsNetworkCall} from './listingDetailsSaga';
import {addReviewNetworkCall} from './addReviewSaga';
import {bookingRoomNetworkCall} from './bookingSaga';

export default function* rootSaga() {
  yield all([
    loginNetworkCall(),
    registerNetworkCall(),
    listingsNetworkCall(),
    listingDetailsNetworkCall(),
    addReviewNetworkCall(),
    bookingRoomNetworkCall(),
  ]);
}
