import {StyleSheet} from 'react-native';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {
  BLACK_COLOR,
  COLOR_GRAY_7F,
  GRAY_92,
  ORANGE_DARK,
  PINK,
  PURPLE,
  WHITE,
} from '../../utils/colors/colors';
import {isAndroid} from '../../utils/constants/commonFunctions';

export const styles = StyleSheet.create({
  lengthTxt: {
    marginHorizontal: 25,
    marginTop: 16,
    fontFamily: MONTSERRAT_BOLD,
    color: ORANGE_DARK,
    paddingBottom: 3,
  },
  container: {backgroundColor: WHITE, flex: 1},
  filters: {
    flexDirection: 'row',
    marginHorizontal: 25,
    gap: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  tch: {
    flexDirection: 'row',
    gap: 8,
    borderWidth: 0.5,
    borderColor: GRAY_92,
    paddingHorizontal: 14,
    paddingVertical: isAndroid() ? 5 : 8,
    borderRadius: 11,
  },
  sortText: {
    fontFamily: MONTSERRAT_REGULAR,
    color: BLACK_COLOR,
  },
  iconView: selected => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: selected ? COLOR_GRAY_7F : WHITE,
    marginHorizontal: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 20,
  }),
  optionText: selected => ({
    fontSize: 16,
    fontFamily: selected ? MONTSERRAT_SEMIBOLD : MONTSERRAT_REGULAR,
    marginTop: 3,
    color: BLACK_COLOR,
  }),

  sheetContainer: {
    backgroundColor: WHITE,
  },
  crossTch: {padding: 5},
  leftView: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  gender: {
    fontSize: 16,
    marginBottom: 3,
    fontFamily: MONTSERRAT_BOLD,
    color: BLACK_COLOR,
    marginTop: 30,
  },
  containerFilter: {padding: 20},
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: PURPLE,
    paddingBottom: 20,
  },
  btn2: {backgroundColor: WHITE, marginEnd: 30},
  btn1: {backgroundColor: PURPLE, paddingHorizontal: 40},
  txt: {fontSize: 16},
  txt2: {color: PURPLE},
  emptyTxt: {
    textAlign: 'center',
    fontFamily: MONTSERRAT_REGULAR,
    marginTop: 50,
  },
});
