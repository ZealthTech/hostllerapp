import {StyleSheet} from 'react-native';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../../utils/constants/commonFunctions';

export const styles = StyleSheet.create({
  banner: {
    marginTop: 10,
    height: getDeviceHeight() * 0.2,
    width: '100%',
    borderRadius: 15,
  },
  flat: {
    height: getDeviceHeight() * 0.185,
    width: getDeviceWidth() * 0.32,
    borderRadius: 15,
    marginEnd: 20,
    marginTop: 30,
  },
  view: {
    height: getDeviceHeight() * 0.06,
    width: '100%',
    marginVertical: 20,
    borderRadius: 15,
  },
  listingView: {
    height: getDeviceHeight() * 0.22,
    width: getDeviceWidth() * 0.88,
    alignSelf: 'center',
    borderRadius: 15,
  },
  listingFlat: {marginTop: 25},
  item: {
    alignSelf: 'center',
    width: getDeviceWidth() * 0.88,
    height: 30,
    borderRadius: 8,
    marginVertical: 8,
  },
});
