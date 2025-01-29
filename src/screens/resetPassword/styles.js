import {StyleSheet} from 'react-native';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {
  BLACK_COLOR,
  GRAY_92,
  ORANGE_DARK,
  WHITE,
} from '../../utils/colors/colors';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';

export const styles = StyleSheet.create({
  container: {flex: 1},
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
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
  btn: {width: 200, backgroundColor: WHITE, marginTop: 10},
  inputView: {
    elevation: 10,
    shadowOpacity: 3,
    shadowRadius: 3,
    shadowColor: GRAY_92,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
});
