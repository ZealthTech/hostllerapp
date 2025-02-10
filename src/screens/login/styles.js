import {StyleSheet} from 'react-native';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {BLACK_COLOR, GRAY_92, ORANGE_DARK} from '../../utils/colors/colors';

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  container: {flex: 1},
  image: {
    height: getDeviceHeight() * 0.36,
    width: getDeviceWidth() * 0.56,
    marginTop: getDeviceHeight() * 0.03,
    padding: 15,
  },
  signup: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_BOLD,
    fontSize: fontsSize.fs18,
    marginBottom: 25,
    marginTop: 5,
  },
  inputContainer: {width: '100%', alignItems: 'center'},
  touch: {
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
    marginVertical: 18,
    paddingBottom: 20,
  },
  account: {fontSize: 13, fontFamily: MONTSERRAT_MEDIUM},
  login: {fontSize: 13, fontFamily: MONTSERRAT_SEMIBOLD, color: ORANGE_DARK},
  inputView: {
    elevation: 5,
    shadowOpacity: 3,
    shadowRadius: 3,
    shadowColor: GRAY_92,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  btnContainer: {
    marginTop: getDeviceHeight() * 0.15,
  },
  forgotText: {
    color: ORANGE_DARK,
    fontFamily: MONTSERRAT_MEDIUM,
    marginRight: 40,
    marginTop: 10,
  },
});
