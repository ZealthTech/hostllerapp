import {StyleSheet} from 'react-native';
import {BLACK_COLOR, GRAY_92} from '../../utils/colors/colors';
import {
  fontsSize,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  itemContainer: {
    width: '31%',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 3,
  },
  icon: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 12,
    fontFamily: MONTSERRAT_REGULAR,
    textAlign: 'center',
    color: BLACK_COLOR,
    marginTop: 5,
    marginStart: 2,
  },
  flatListContainer: {
    marginVertical: 10,
  },
  title: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_SEMIBOLD,
    marginTop: 10,
    marginStart: 14,
    fontSize: fontsSize.fs16,
    marginBottom: 16,
  },
  container: {
    borderWidth: 0.5,
    borderColor: GRAY_92,
    borderRadius: 10,
    marginBottom: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
