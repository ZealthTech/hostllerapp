import {StyleSheet} from 'react-native';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';
import {MONTSERRAT_SEMIBOLD} from '../../utils/styles/commonStyles';
import {BLACK_COLOR, PURPLE, WHITE} from '../../utils/colors/colors';

export const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  image: {
    width: getDeviceWidth() * 0.5,
    height: getDeviceHeight() * 0.2,
    resizeMode: 'contain',
  },
  bookText: {
    fontSize: 18,
    fontFamily: MONTSERRAT_SEMIBOLD,
    color: BLACK_COLOR,
    marginTop: 20,
  },
  button: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: PURPLE,
    marginTop: 50,
    borderRadius: 20,
  },
  textStyle: {color: PURPLE},
});
