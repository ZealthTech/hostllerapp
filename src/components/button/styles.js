import {StyleSheet} from 'react-native';
import {ORANGE_DARK, WHITE} from '../../utils/colors/colors';
import {fontsSize, MONTSERRAT_BOLD} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ORANGE_DARK,
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 20,
  },
  textStyle: {
    color: WHITE,
    fontSize: fontsSize.fs14,
    textAlign: 'center',
    fontFamily: MONTSERRAT_BOLD,
  },
  elevation: {
    elevation: 5,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 2,
    },
  },
});
