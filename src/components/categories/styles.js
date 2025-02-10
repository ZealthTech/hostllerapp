import {StyleSheet} from 'react-native';
import {BLACK_COLOR, WHITE} from '../../utils/colors/colors';
import {
  fontsSize,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';

export const styles = StyleSheet.create({
  tchView: firstItem => ({
    marginEnd: 16,
    borderRadius: 15,
    overflow: 'hidden',
    marginStart: firstItem ? 20 : 0,
  }),
  container: {},
  levelText: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: fontsSize.fs18,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 22,
  },
  image: {
    height: getDeviceHeight() * 0.17,
    width: getDeviceWidth() * 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  text: {
    color: WHITE,
    fontFamily: MONTSERRAT_MEDIUM,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
});
