import {StyleSheet} from 'react-native';
import {isAndroid} from '../../utils/constants/commonFunctions';
import {fontsSize, MONTSERRAT_REGULAR} from '../../utils/styles/commonStyles';
import {BLACK_COLOR, GRAY_92} from '../../utils/colors/colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_REGULAR,
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
  containerStyle: (_errorText, _isFocused) => ({
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
