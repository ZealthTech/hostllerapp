import {StyleSheet} from 'react-native';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';
import {PURPLE, TEXT_COLOR, WHITE} from '../../utils/colors/colors';
import {fontsSize, MONTSERRAT_SEMIBOLD} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
  },
  video: {
    marginTop: getDeviceHeight() * 0.1,
    width: getDeviceWidth(),
    height: getDeviceHeight() * 0.68,
  },
  btn: {backgroundColor: PURPLE, flex: 0},
  pressableTxt: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    color: TEXT_COLOR,
    fontSize: fontsSize.fs16,
    padding: 10,
  },
  pressable: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
});
