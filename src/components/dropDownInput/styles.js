import {StyleSheet} from 'react-native';
import {MONTSERRAT_REGULAR} from '../../utils/styles/commonStyles';
import {BLACK_COLOR, COLOR_GRAY_7F, WHITE} from '../../utils/colors/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: 5,
    width: '60%',
    elevation: 4,
    shadowOpacity: 0.4,
    padding: 10,
    shadowColor: COLOR_GRAY_7F,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 0,
    },
  },
  error: {
    color: 'red',
    fontSize: 12,
    fontFamily: MONTSERRAT_REGULAR,
    marginTop: 5,
  },
  city: value => ({
    color: value ? BLACK_COLOR : COLOR_GRAY_7F,
    fontFamily: MONTSERRAT_REGULAR,
  }),
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
