import {StyleSheet} from 'react-native';
import {GRAY_92, GRAY_LIGHT, WHITE} from '../../utils/colors/colors';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
} from '../../utils/styles/commonStyles';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';

export const styles = StyleSheet.create({
  image: {
    height: getDeviceHeight() * 0.22,
    width: getDeviceWidth() * 0.9,
    backgroundColor: GRAY_LIGHT,
    borderRadius: 20,
  },
  itemView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: getDeviceWidth(),
  },
  container: {marginTop: 20},
  upperView: {flexDirection: 'row', alignItems: 'center'},
  textView: {flex: 1, marginEnd: 10},
  title: {color: WHITE, fontFamily: MONTSERRAT_BOLD, fontSize: fontsSize.fs22},
  content: {color: WHITE, fontSize: 11, fontFamily: MONTSERRAT_REGULAR},
});
