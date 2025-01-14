import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  COLOR_GRAY_7F,
  DARK_YELLOW,
  ORANGE_DARK,
  PURPLE,
  WHITE,
  WHITE_EF,
} from '../../../utils/colors/colors';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../../utils/styles/commonStyles';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../../utils/constants/commonFunctions';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: PURPLE,
    flexDirection: 'row',
    paddingBottom: 8,
  },
  imgView: {alignItems: 'center', marginTop: 10},
  free: {
    fontFamily: MONTSERRAT_BOLD,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  txtView: {
    backgroundColor: ORANGE_DARK,
    marginHorizontal: 22,
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    paddingVertical: 8,
    alignItems: 'center',
  },
  callTxt: {
    color: WHITE,
    fontFamily: MONTSERRAT_BOLD,
    width: '90%',
    textAlign: 'center',
  },
  house: {
    fontSize: 10,
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_REGULAR,
    textAlign: 'center',
  },
  count: {color: PURPLE, fontFamily: MONTSERRAT_BOLD},
  iconCard: {
    backgroundColor: WHITE_EF,
    paddingVertical: 8,
    borderRadius: 15,
    height: getDeviceHeight() * 0.11,
    justifyContent: 'center',
    alignItems: 'center',
    width: getDeviceWidth() / 3 - 25,
    elevation: 4,
    shadowOpacity: 0.4,
    shadowColor: COLOR_GRAY_7F,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 0,
    },
  },
  backImgLead: {
    width: '100%',
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  iconView: {flexDirection: 'row', gap: 16, paddingVertical: 20},
  whiteText: {
    color: WHITE,
    fontSize: 20,
    fontFamily: MONTSERRAT_BOLD,
    padding: 15,
    marginTop: 20,
    lineHeight: 28,
  },
  textView: {flex: 1.15},
  image: {
    height: getDeviceHeight() * 0.2,
    width: getDeviceWidth() * 0.42,
    marginHorizontal: 10,
    marginTop: 16,
  },
  yellowText: {color: DARK_YELLOW},
  fillText: {
    color: WHITE,
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: 10,
    paddingHorizontal: 12,
  },
  backImg: {
    flex: 1,
  },
  owners: {
    color: PURPLE,
    fontSize: 18,
    fontFamily: MONTSERRAT_SEMIBOLD,
    marginTop: 24,
  },
  secondView: {
    backgroundColor: WHITE,
    paddingHorizontal: 15,
    borderTopEndRadius: 15,
    borderTopLeftRadius: 20,
    zIndex: 100,
    marginTop: -16,
  },
  rent: {
    fontSize: 12,
    fontFamily: MONTSERRAT_MEDIUM,
    marginTop: 6,
    color: BLACK_COLOR,
  },
});
