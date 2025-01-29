import {Dimensions, Linking, PermissionsAndroid, Platform} from 'react-native';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {ERROR_TOAST} from './constants';
import {openComposer} from 'react-native-email-link';

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

export const makeCall = number => {
  const _number = number?.toString();
  Linking.openURL(`tel:+91${_number}`);
};

export const sendEmail = async email => {
  if (isAndroid()) {
    await Linking.openURL('mailto:' + email + '?subject=Help And Support');
  } else {
    try {
      await openComposer({
        to: email,
        subject: 'Support',
        body: 'Hi, can you help me with...',
      });
    } catch (error) {
      showToast(ERROR_TOAST, 'Error opening Gmail');
    }
  }
};

export const openWhatsApp = phoneNumber => {
  const msg = 'Hello 👋 Could you assist me today?';
  // Format the phone number (must include country code)
  let url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
    msg,
  )}`;
  Linking.openURL(url).catch(() => {
    alert('WhatsApp is not installed on your device!');
  });
};
