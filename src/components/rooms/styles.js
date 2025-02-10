import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  COLOR_GRAY_7F,
  ORANGE_DARK,
  PURPLE,
  PURPLE_EXTRA_LIGHT,
  WHITE,
} from '../../utils/colors/colors';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  imgView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    flex: 1,
    gap: 10,
  },
  titleView: {flex: 1},
  mainView: {
    marginHorizontal: 20,
    borderWidth: 0.5,
    borderColor: COLOR_GRAY_7F,
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: WHITE,
  },
  img: {height: 100, width: 105},
  genderRow: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  genderText: {color: BLACK_COLOR, fontFamily: MONTSERRAT_REGULAR},
  roomType: {flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 5},
  ac: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_BOLD,
    fontSize: fontsSize.fs12,
  },
  room: {
    fontFamily: MONTSERRAT_BOLD,
    color: ORANGE_DARK,
    fontSize: fontsSize.fs18,
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  perMonth: {fontFamily: MONTSERRAT_REGULAR, color: BLACK_COLOR},
  rupee: {
    fontSize: fontsSize.fs20,
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_REGULAR,
    marginTop: 2,
  },
  price: {fontFamily: MONTSERRAT_BOLD, color: BLACK_COLOR},
  btn: selected => ({
    flexDirection: 'row',
    gap: 5,
    backgroundColor: selected ? PURPLE_EXTRA_LIGHT : PURPLE,
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 14,
    borderRadius: 5,
  }),
  add: {fontFamily: MONTSERRAT_BOLD, color: WHITE},
  mealView: {flexDirection: 'row', gap: 5, alignItems: 'center'},
  meal: {fontFamily: MONTSERRAT_REGULAR, color: BLACK_COLOR, marginBottom: 5},
  container: {flex: 1},
});
