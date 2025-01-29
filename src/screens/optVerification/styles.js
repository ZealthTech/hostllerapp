import {StyleSheet} from 'react-native';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';
import {BLACK_COLOR, ORANGE_DARK} from '../../utils/colors/colors';

export const styles = StyleSheet.create({
  container: {flex: 1},
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  containerStyle: {marginTop: 30},
  enter: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: fontsSize.fs18,
    marginTop: 10,
    color: BLACK_COLOR,
  },
  sent: {
    fontFamily: MONTSERRAT_MEDIUM,
    width: '85%',
    marginTop: 20,
    textAlign: 'center',
    color: BLACK_COLOR,
  },
  btn: {marginTop: 30},
  resendView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 14,
    gap: 5,
  },
  dont: {fontFamily: MONTSERRAT_MEDIUM, color: BLACK_COLOR},
  resent: {fontFamily: MONTSERRAT_BOLD, color: ORANGE_DARK},
  image: {
    height: getDeviceHeight() * 0.36,
    width: getDeviceWidth() * 0.56,
    marginTop: getDeviceHeight() * 0.03,
    padding: 15,
  },
});
