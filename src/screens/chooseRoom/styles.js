import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  GRAY_92,
  ORANGE_DARK,
  WHITE,
  YELLOW_LIGHT,
} from '../../utils/colors/colors';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '95%',
    backgroundColor: WHITE,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: MONTSERRAT_BOLD,
    color: BLACK_COLOR,
    backgroundColor: YELLOW_LIGHT,
    paddingVertical: 5,
    width: '100%',
    textAlign: 'center',
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',

    backgroundColor: ORANGE_DARK,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1.2,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: GRAY_92,
    borderBottomWidth: 1,
  },
  iconCell: {
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: GRAY_92,
    borderBottomWidth: 1,
    flex: 1,
  },
  tableCellUp: {
    flex: 1,
    paddingVertical: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: GRAY_92,
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: 12,
    paddingLeft: 1,
    color: WHITE,
  },
  days: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: 12,
    marginLeft: 5,
    textAlign: 'center',
  },
  status: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  active: {
    color: 'green',
  },
  inactive: {
    color: 'red',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
