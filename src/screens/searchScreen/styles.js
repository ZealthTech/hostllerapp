import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  COLOR_GRAY_7F,
  GRAY_92,
  GRAY_LIGHT,
  GRAY_LIGHT_CB,
  TEXT_COLOR,
} from '../../utils/colors/colors';
import {
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../utils/styles/commonStyles';
import {isAndroid} from '../../utils/constants/commonFunctions';

export const styles = StyleSheet.create({
  searchView: {
    elevation: 5,
    shadowOpacity: 3,
    shadowRadius: 3,
    shadowColor: GRAY_LIGHT,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
  container: {flex: 1},
  headerView: {
    flexDirection: 'row',
    marginHorizontal: 14,
    gap: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  leftView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: isAndroid() ? 0 : 14,
    borderWidth: 1,
    borderColor: COLOR_GRAY_7F,
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 3,
    flex: 1,
    paddingHorizontal: 5,
  },
  input: {fontFamily: MONTSERRAT_MEDIUM, flex: 1},
  cancelTch: {
    backgroundColor: GRAY_LIGHT_CB,
    marginEnd: 10,
    height: 28,
    width: 28,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchViews: {
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 25,
  },
  flat: {marginTop: 10},
  location: {
    fontFamily: MONTSERRAT_MEDIUM,
    margin: 20,
    color: TEXT_COLOR,
  },
  locationTxt: {
    fontFamily: MONTSERRAT_MEDIUM,
    color: BLACK_COLOR,
    fontSize: 14,
    marginTop: 3,
    flex: 1,
  },
});
