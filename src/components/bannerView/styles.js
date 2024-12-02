import {StyleSheet} from 'react-native';
import {PURPLE, WHITE} from '../../utils/colors/colors';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  image: {height: 98, width: 98},
  container: {backgroundColor: PURPLE, padding: 20},
  upperView: {flexDirection: 'row', alignItems: 'center'},
  textView: {flex: 1, marginEnd: 10},
  title: {color: WHITE, fontFamily: MONTSERRAT_BOLD, fontSize: fontsSize.fs22},
  content: {color: WHITE, fontSize: 11, fontFamily: MONTSERRAT_REGULAR},
});
