import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  GRAY_92,
  ORANGE_DARK,
  WHITE,
} from '../../utils/colors/colors';
import {getDeviceHeight} from '../../utils/constants/commonFunctions';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  image: {
    height: getDeviceHeight() * 0.2,
    borderRadius: 12,
    marginBottom: 15,
    margin: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  rupees: {fontSize: 20, fontFamily: MONTSERRAT_REGULAR, color: BLACK_COLOR},
  name: {fontFamily: MONTSERRAT_BOLD, fontSize: 20, color: ORANGE_DARK},
  address: {fontFamily: MONTSERRAT_MEDIUM, color: BLACK_COLOR, fontSize: 12},
  content: {margin: 25},
  perMonth: {
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: 10,
    marginStart: 5,
    textAlign: 'right',
  },
  security: {textAlign: 'right', marginTop: 5, marginHorizontal: 20},
  bookingId: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_BOLD,
    fontSize: 15,
    marginTop: 10,
  },
  idValue: {color: BLACK_COLOR, fontFamily: MONTSERRAT_REGULAR},
  details: {fontFamily: MONTSERRAT_BOLD, color: ORANGE_DARK, fontSize: 16},
  line: {backgroundColor: GRAY_92, height: 1},
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentRow: {paddingHorizontal: 20, paddingVertical: 10},
});
