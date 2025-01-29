import {PermissionsAndroid} from 'react-native';
import {isAndroid, showToast} from '../constants/commonFunctions';
import {ERROR_TOAST, FCM_TOKEN} from '../constants/constants';
import messaging from '@react-native-firebase/messaging';
import {getDataFromStorage, setDataToStorage} from '../storage';

export const getFirebaseToken = async dispatch => {
  const hasPermission = await requestUserPermission(dispatch);
  if (hasPermission) {
    return await getFcmToken();
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
const getFcmToken = async () => {
  const tokenFromStorage = await getDataFromStorage(FCM_TOKEN);
  console.log('tokenFromStorage ', tokenFromStorage);
  let token;
  if (tokenFromStorage) {
    token = JSON.parse(tokenFromStorage);
  } else {
    token = await messaging().getToken();
    setDataToStorage(FCM_TOKEN, token);
  }
  return token;
};
