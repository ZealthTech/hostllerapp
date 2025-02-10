import {StyleSheet} from 'react-native';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {
  BLACK_COLOR,
  GRAY_LIGHT,
  LIGHT_PURPLE,
  ORANGE_DARK,
  WHITE,
} from '../../utils/colors/colors';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';

export const styles = StyleSheet.create({
  view: {flexDirection: 'row'},
  flatView: {backgroundColor: LIGHT_PURPLE},
  container: {
    flex: 1,
    marginBottom: 30,
  },
  card: {
    width: getDeviceWidth() * 0.9,
    backgroundColor: GRAY_LIGHT,
    borderRadius: 25,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  image: {
    width: getDeviceWidth() * 0.8,
    height: getDeviceHeight() * 0.2,
    borderRadius: 15,
    margin: 20,
  },
  textContent: {
    flex: 1,
    marginHorizontal: 20,
  },
  name: {
    fontSize: 14,
    fontFamily: MONTSERRAT_BOLD,
    color: BLACK_COLOR,
    marginBottom: 5,
  },
  designation: {
    fontSize: 12,
    fontFamily: MONTSERRAT_REGULAR,
    color: BLACK_COLOR,
  },

  content: {
    fontSize: 10,
    fontFamily: MONTSERRAT_REGULAR,
    marginBottom: 80,
    color: BLACK_COLOR,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 15,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: ORANGE_DARK,
  },
  inactiveDot: {
    backgroundColor: WHITE,
  },
  levelText: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: fontsSize.fs18,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 22,
  },
});
