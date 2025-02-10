import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  GRAY_92,
  ORANGE_DARK,
  WHITE,
} from '../../utils/colors/colors';
import {
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  couponCard: {
    backgroundColor: WHITE,
    margin: 10,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',

    // Shadow for iOS
    shadowColor: GRAY_92,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 2,

    // Elevation for Android
    elevation: 5,
  },
  flat: {marginHorizontal: 6, marginBottom: 20},
  available: {
    marginTop: 30,
    marginStart: 20,
    color: GRAY_92,
    fontFamily: MONTSERRAT_MEDIUM,
  },
  value: {fontSize: 10, fontFamily: MONTSERRAT_REGULAR, color: BLACK_COLOR},
  coupon: {
    fontSize: 10,
    fontFamily: MONTSERRAT_REGULAR,
    color: ORANGE_DARK,
    marginTop: 8,
  },
  title: {fontSize: 16, fontFamily: MONTSERRAT_MEDIUM, color: ORANGE_DARK},
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 0,
    alignSelf: 'flex-start',
  },
  textStyle: {fontFamily: MONTSERRAT_MEDIUM},
});
