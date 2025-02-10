import {PermissionsAndroid} from 'react-native';
import {isAndroid, showToast} from '../constants/commonFunctions';
import {ERROR_TOAST, FCM_TOKEN} from '../constants/constants';
import messaging from '@react-native-firebase/messaging';
import {getDataFromStorage, setDataToStorage} from '../storage';
import {setFcmToken} from '../../redux/reducers/userInfoReducer';

export const getFirebaseToken = async dispatch => {
  const hasPermission = await requestUserPermission(dispatch);
  if (hasPermission) {
    return await getFcmToken(dispatch);
  } else {
    return null;
  }
};

export const requestNotificationPermission = dispatch => {};
const requestUserPermission = async dispatch => {
  if (isAndroid()) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
    } catch (error) {
      showToast(ERROR_TOAST, error);
    }
  } else {
    const authStatus = await messaging().requestPermission();
    const isAllowed =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return isAllowed;
  }
};

//new token is generated when, App Data Cleared, App Reinstallation, if app instance hasn't connected for a month
// messaging().onTokenRefresh(async newToken => {
//   setDataToStorage(FCM_TOKEN, JSON.stringify(newToken));
// });

//getting FCM Token
export const getFcmToken = async dispatch => {
  const tokenFromStorage = await getDataFromStorage(FCM_TOKEN);
  let token;
  if (tokenFromStorage) {
    token = JSON.parse(tokenFromStorage);
  } else {
    token = await messaging().getToken();
    await setDataToStorage(FCM_TOKEN, JSON.stringify(token));
  }
  dispatch(setFcmToken(token));
  return token;
};
