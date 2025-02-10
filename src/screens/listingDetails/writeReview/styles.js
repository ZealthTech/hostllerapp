import {StyleSheet} from 'react-native';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_SEMIBOLD,
} from '../../../utils/styles/commonStyles';
import {BLACK_COLOR, PURPLE} from '../../../utils/colors/colors';
import {
  getDeviceHeight,
  isAndroid,
} from '../../../utils/constants/commonFunctions';

export const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flexDirection: 'row', justifyContent: 'space-between', padding: 20},
  photos: {
    fontFamily: MONTSERRAT_BOLD,
    fontSize: fontsSize.fs22,
    color: BLACK_COLOR,
  },
  scroll: {paddingBottom: 20},
  writeView: {marginHorizontal: 20, flex: 1},
  reviewContainer: {
    width: '100%',
    height: getDeviceHeight() * 0.14,
    alignItems: 'flex-start',
    paddingTop: isAndroid() ? 0 : 5,
  },
  yourReview: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    color: BLACK_COLOR,
    fontSize: fontsSize.fs16,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  bottomBtn: {
    marginTop: 0,
    marginBottom: isAndroid() ? 20 : 30,
    backgroundColor: PURPLE,
    paddingVertical: 12,
  },
});
