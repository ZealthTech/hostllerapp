import {StyleSheet} from 'react-native';
import {getDeviceHeight} from '../../utils/constants/commonFunctions';
import {fontsSize, MONTSERRAT_REGULAR} from '../../utils/styles/commonStyles';
import {GRAY_92} from '../../utils/colors/colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
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
    //borderColor: errorText ? 'red' : isFocused ? PRIMARY_COLOR : '#9e9e9e',
    borderWidth: 0.4,
    width: '84%',
    borderColor: GRAY_92,
    height: getDeviceHeight() * 0.05,
  }),
  input: {
    fontFamily: MONTSERRAT_REGULAR,
    flex: 1,
    paddingHorizontal: 15,
    fontSize: fontsSize.fs14,
  },
});
