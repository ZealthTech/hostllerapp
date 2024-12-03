import {StyleSheet} from 'react-native';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {getDeviceHeight} from '../../utils/constants/commonFunctions';
import {BLACK_COLOR, ORANGE_DARK} from '../../utils/colors/colors';

export const styles = StyleSheet.create({
  container: {flex: 1},
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  enter: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: fontsSize.fs18,
    marginTop: getDeviceHeight() * 0.15,
    color: BLACK_COLOR,
  },
  sent: {
    fontFamily: MONTSERRAT_MEDIUM,
    width: '85%',
    marginTop: 20,
    textAlign: 'center',
    color: BLACK_COLOR,
  },
  btn: {marginTop: getDeviceHeight() * 0.2},
  resendView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 14,
    gap: 5,
  },
  dont: {fontFamily: MONTSERRAT_MEDIUM, color: BLACK_COLOR},
  resent: {fontFamily: MONTSERRAT_BOLD, color: ORANGE_DARK},
});
