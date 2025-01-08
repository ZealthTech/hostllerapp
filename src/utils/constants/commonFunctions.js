import {Dimensions, PermissionsAndroid, Platform} from 'react-native';
import moment from 'moment';
import Toast from 'react-native-toast-message';

export const getDeviceWidth = () => {
  return Dimensions.get('window').width;
};

export const getDeviceHeight = () => {
  return Dimensions.get('window').height;
};
export const isAndroid = () => {
  return Platform.OS === 'android';
};

//to convert html content into plain text
export function stripHTMLTags(inputString) {
  return inputString?.replace(/<\/?[^>]+(>|$)/g, '');
}
export const requestCameraPermission = async () => {
  console.log('request permission asked');
  if (isAndroid()) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Livfitt app camera permission',
          message: 'Livfitt want to access your camera to take photos',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  } else {
    console.log('request permission asked2....');
    return true;
  }
};
export const formatedDateDMY = date => {
  const formattedDateTime = moment(date).format('DD MMM YYYY');
  return formattedDateTime;
};

export const showToast = (type, desc, info = false) => {
  Toast.show({
    type: type, //successToast || errorToast
    position: 'bottom',
    props: {
      desc,
      info,
    },
  });
};
