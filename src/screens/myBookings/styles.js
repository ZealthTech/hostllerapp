import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  GRAY_92,
  GRAY_LIGHT_CB,
  ORANGE_DARK,
  TEXT_COLOR,
  WHITE,
  WHITE_F5,
} from '../../utils/colors/colors';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';

export const styles = StyleSheet.create({
  container: {flex: 1},
  itemView: {
    backgroundColor: WHITE_F5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: GRAY_LIGHT_CB,
    marginHorizontal: 16,
    padding: 22,
    marginTop: 20,
  },
  img_book: {height: getDeviceHeight() * 0.2, width: getDeviceWidth() * 0.4},
  noBooking: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contentContainerStyle: {paddingBottom: 20},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingId: {fontFamily: MONTSERRAT_REGULAR, color: BLACK_COLOR},
  bookingDate: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    color: BLACK_COLOR,
    marginTop: 8,
  },
  image: {
    height: getDeviceHeight() * 0.2,
    marginVertical: 14,
    borderRadius: 10,
  },
  rupees: {fontSize: 20, fontFamily: MONTSERRAT_REGULAR, color: BLACK_COLOR},
  name: {fontFamily: MONTSERRAT_BOLD, fontSize: 20, color: ORANGE_DARK},
  address: {fontFamily: MONTSERRAT_MEDIUM, color: BLACK_COLOR, fontSize: 12},
  checkIn: {fontFamily: MONTSERRAT_BOLD, color: BLACK_COLOR, fontSize: 14},
  bed: {fontFamily: MONTSERRAT_REGULAR},
  checkInView: {
    backgroundColor: WHITE,
    padding: 14,
    marginTop: 16,
    borderWidth: 0.5,
    borderColor: GRAY_92,
    borderRadius: 10,
  },
  perMonth: {fontFamily: MONTSERRAT_REGULAR, fontSize: 10, marginStart: 5},
  noBookText: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: 14,
    marginHorizontal: 20,
  },
});
