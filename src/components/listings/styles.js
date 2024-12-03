import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  COLOR_GRAY_7F,
  ORANGE_DARK,
  ORANGE_MEDIUM,
  PINK_LIGHT,
  PURPLE,
  WHITE,
} from '../../utils/colors/colors';
import {getDeviceWidth} from '../../utils/constants/commonFunctions';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  tchContainer: {
    marginHorizontal: 20,
    borderWidth: 0.5,
    borderColor: COLOR_GRAY_7F,
    marginVertical: 10,
    borderRadius: 15,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    backgroundColor: WHITE,
    elevation: 5, // For Android shadow
  },

  imageBnr: {
    height: 150,
    width: getDeviceWidth() * 0.82,
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: 18,
  },
  pgName: {
    color: ORANGE_DARK,
    fontFamily: MONTSERRAT_BOLD,
    fontSize: 16,
    marginHorizontal: 18,
  },
  ratingView: {
    flexDirection: 'row',
    marginHorizontal: 18,
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },
  rating: {
    fontFamily: MONTSERRAT_BOLD,
    fontSize: 14,
    marginTop: 3,
    color: BLACK_COLOR,
  },
  totalRatings: {
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: 14,
    marginTop: 3,
    color: BLACK_COLOR,
  },
  genderRow: {flexDirection: 'row', marginHorizontal: 18, marginTop: 8, gap: 5},
  genderText: {color: BLACK_COLOR, fontFamily: MONTSERRAT_MEDIUM},
  amenitiesView: {
    flexDirection: 'row',
    marginHorizontal: 18,
    gap: 12,
    marginTop: 8,
  },
  amenitiesImg: {
    height: 22,
    width: 22,
  },
  priceView: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 20,
    backgroundColor: PINK_LIGHT,
    paddingVertical: 12,
    marginTop: 16,
    borderBottomEndRadius: 14,
    borderBottomLeftRadius: 14,
    borderColor: PINK_LIGHT,
    borderWidth: 1,
  },
  start: {fontFamily: MONTSERRAT_REGULAR, color: BLACK_COLOR},
  price: {fontFamily: MONTSERRAT_BOLD, color: BLACK_COLOR, fontSize: 20},
  deposPrice: {
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: 16,
    color: BLACK_COLOR,
  },
  line: {
    width: 1,
    color: WHITE,
    flex: 1,
    backgroundColor: WHITE,
    marginHorizontal: 5,
  },
  rupee: {
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: 18,
    color: BLACK_COLOR,
  },
});
