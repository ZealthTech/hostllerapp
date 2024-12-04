import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  ORANGE_DARK,
  RED_DARK,
  WHITE,
} from '../../../utils/colors/colors';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ORANGE_DARK,
    borderRadius: 25,
    marginTop: 20,
    paddingBottom: 12,
  },
  userImage: {height: 35, width: 35, borderRadius: 100},
  card: {
    backgroundColor: WHITE,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 20,
    padding: 10,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  star: {flexDirection: 'row', alignItems: 'center', gap: 5},
  stay: {
    fontFamily: MONTSERRAT_REGULAR,
    color: BLACK_COLOR,
    fontSize: fontsSize.fs10,
  },
  ratingCount: {fontFamily: MONTSERRAT_BOLD, color: BLACK_COLOR, marginTop: 2},
  userInfo: {flexDirection: 'row', gap: 7, alignItems: 'center', marginTop: 10},
  name: {
    fontFamily: MONTSERRAT_BOLD,
    color: BLACK_COLOR,
    fontSize: fontsSize.fs12,
  },
  content: {marginTop: 10, marginHorizontal: 3},
  postImg: {
    height: 60,
    width: 65,
    borderRadius: 5,
    marginTop: 10,
    marginStart: 2,
    marginEnd: 4,
  },
});
