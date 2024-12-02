import {StyleSheet} from 'react-native';
import {BLACK_COLOR} from '../../utils/colors/colors';
import {fontsSize, MONTSERRAT_SEMIBOLD} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  tchView: firstItem => ({
    marginEnd: 16,
    borderRadius: 15,
    overflow: 'hidden',
    marginStart: firstItem ? 20 : 0,
  }),
  container: {},
  levelText: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: fontsSize.fs18,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 22,
  },
});
