import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  COLOR_GRAY_7F,
  GRAY_92,
  ORANGE_DARK,
  WHITE,
  WHITE_F5,
} from '../../utils/colors/colors';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  formView: {
    backgroundColor: WHITE_F5,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingBottom: 26,
    borderWidth: 0.5,
    borderColor: GRAY_92,
  },
  labelText: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    color: BLACK_COLOR,
    marginBottom: 10,
    marginTop: 25,
  },
  inputField: {
    borderColor: WHITE,
    width: '100%',
    borderRadius: 5,
    elevation: 4,
    shadowOpacity: 0.4,
    shadowColor: COLOR_GRAY_7F,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 0,
    },
  },
  bedroomView: {flexDirection: 'row', gap: 10},
  bedroom: selected => ({
    backgroundColor: selected ? ORANGE_DARK : WHITE,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 4,
    shadowOpacity: 0.4,
    shadowColor: COLOR_GRAY_7F,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 0,
    },
  }),
  bedCount: selected => ({
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: 16,
    color: selected ? WHITE : BLACK_COLOR,
  }),
  button: {paddingHorizontal: 30, alignSelf: 'flex-start'},
  choose: {fontFamily: MONTSERRAT_BOLD, color: ORANGE_DARK, fontSize: 18},
  bottomView: {marginHorizontal: 20, marginTop: 12, marginBottom: 20},
  error: {
    color: 'red',
    fontSize: 12,
    fontFamily: MONTSERRAT_REGULAR,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    maxHeight: '70%',
  },
  cityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cityName: {
    fontSize: 16,
    fontFamily: MONTSERRAT_REGULAR,
  },
  closeButton: {
    marginTop: 15,
  },
});
