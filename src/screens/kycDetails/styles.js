import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  GRAY_92,
  ORANGE_DARK,
  WHITE,
} from '../../utils/colors/colors';
import {
  getDeviceHeight,
  getDeviceWidth,
  isAndroid,
} from '../../utils/constants/commonFunctions';
import {MONTSERRAT_MEDIUM} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  contentContainer: {alignItems: 'center', paddingTop: 20},
  button: {
    backgroundColor: WHITE,
    borderColor: ORANGE_DARK,
    borderWidth: 0.8,
    borderRadius: 22,
    marginTop: 40,
    marginBottom: 30,
  },
  textStyle: {color: ORANGE_DARK, paddingVertical: 3},
  idContainer: {
    borderRadius: 10,
    borderWidth: 0.6,
    paddingVertical: isAndroid() ? 0 : 12,
    width: '84%',
    borderColor: GRAY_92,
    alignItems: 'flex-start',
    marginTop: 10,
  },
  image: {marginStart: 20},
  label: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginHorizontal: 35,
  },
  or: {fontFamily: MONTSERRAT_MEDIUM, color: BLACK_COLOR, marginVertical: 16},
  frameContainer: {
    alignSelf: 'flex-start',
    marginBottom: -5,
    marginTop: 20,
    marginHorizontal: 32,
  },
  images: {
    width: getDeviceWidth() * 0.3,
    height: getDeviceHeight() * 0.11,
  },
});
