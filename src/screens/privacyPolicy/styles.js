import {StyleSheet} from 'react-native';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {BLACK_COLOR, ORANGE_DARK, TEXT_COLOR} from '../../utils/colors/colors';

export const styles = StyleSheet.create({
  container: {flex: 1},
  heading: {fontSize: 18, fontFamily: MONTSERRAT_BOLD},
  contentContainer: {padding: 16},
  htmlTagStylesRecom: {
    h2: {fontFamily: MONTSERRAT_BOLD, color: BLACK_COLOR},
    p: {
      fontFamily: MONTSERRAT_REGULAR,
      color: BLACK_COLOR,
      fontSize: 14,
      marginTop: 2,
    },
    strong: {color: BLACK_COLOR, fontFamily: MONTSERRAT_BOLD},
  },
  scroll: {paddingBottom: 20},
});
