import {StyleSheet} from 'react-native';
import {BLACK_COLOR, GRAY_92, WHITE} from '../../utils/colors/colors';
import {fontsSize, MONTSERRAT_BOLD} from '../../utils/styles/commonStyles';
import {getDeviceHeight} from '../../utils/constants/commonFunctions';

export const styles = StyleSheet.create({
  container: {flex: 1},
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  signup: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_BOLD,
    fontSize: fontsSize.fs18,
    marginBottom: 25,
    marginTop: getDeviceHeight() * 0.2,
  },
  firstView: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  thirdView: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  btn: {width: 200, backgroundColor: WHITE},
});
