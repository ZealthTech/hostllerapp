import {StyleSheet} from 'react-native';
import {
  getDeviceHeight,
  isAndroid,
} from '../../utils/constants/commonFunctions';
import {fontsSize, MONTSERRAT_REGULAR} from '../../utils/styles/commonStyles';
import {BLACK_COLOR, GRAY_92} from '../../utils/colors/colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    marginTop: 20,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 12,
    fontFamily: MONTSERRAT_REGULAR,
    marginTop: 5,
  },
  containerStyle: (errorText, isFocused) => ({
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.6,
    paddingVertical: isAndroid() ? 0 : 12,
    width: '84%',
    borderColor: GRAY_92,
  }),
  input: {
    fontFamily: MONTSERRAT_REGULAR,
    flex: 1,
    paddingHorizontal: 15,
    fontSize: fontsSize.fs14,
    color: BLACK_COLOR,
  },
});
