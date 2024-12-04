import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  GRAY_92,
  LIGHT_GREEN,
  ORANGE_DARK,
  PINK_EXTRA_LIGHT,
  TEXT_COLOR,
  WHITE,
} from '../../utils/colors/colors';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    flexDirection: 'row',
    backgroundColor: PINK_EXTRA_LIGHT,
    padding: 10,
  },
  img: {height: 100, width: 110},
  card: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: GRAY_92,
    margin: 14,
    overflow: 'hidden',
    borderRadius: 15,
  },
  titleView: {flex: 1, padding: 6},
  title: {color: ORANGE_DARK, fontFamily: MONTSERRAT_BOLD},
  calenderView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  date: {color: BLACK_COLOR, fontFamily: MONTSERRAT_REGULAR},
  priceTopView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  originalPrice: {
    ontFamily: MONTSERRAT_REGULAR,
    color: TEXT_COLOR,
    textDecorationLine: 'line-through',
    fontSize: 12,
    textAlign: 'center',
  },
  currentPrice: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_BOLD,
    fontSize: 16,
  },
  off: {
    fontFamily: MONTSERRAT_MEDIUM,
    color: LIGHT_GREEN,
    fontSize: 12,
    textAlign: 'center',
  },
  bedText: {color: BLACK_COLOR, fontFamily: MONTSERRAT_REGULAR},
  mealView: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10},
  meal: {
    fontFamily: MONTSERRAT_REGULAR,
    color: BLACK_COLOR,
    marginBottom: 5,
    marginEnd: 5,
  },
  securityView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  line: {height: 1, backgroundColor: GRAY_92, marginVertical: 20},
  buttonView: {
    backgroundColor: ORANGE_DARK,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 10,
  },
  payNow: {color: WHITE, fontFamily: MONTSERRAT_BOLD, fontSize: 16},
  finalRs: {fontFamily: MONTSERRAT_BOLD, fontSize: 18, color: WHITE},
});
