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
} from '../../utils/constants/commonFunctions';
import {
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  contentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  lavelStyle: {marginBottom: 5, marginStart: 2},
  containerStyle: {width: '90%'},
  dobRightView: {flex: 0.9},
  dobLeftView: {flex: 1.1},
  dobInput: {width: '100%'},
  dobContainer: {flex: 1},
  dropDownStyle: {marginHorizontal: 0},
  button: {
    backgroundColor: WHITE,
    borderColor: ORANGE_DARK,
    borderWidth: 0.8,
    borderRadius: 22,
    marginTop: 40,
    marginBottom: 30,
  },
  textStyle: {color: ORANGE_DARK, paddingVertical: 3},
  dobView: {
    width: '89%',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  dropDownButton: {
    marginTop: 5,
    marginHorizontal: -3,
  },
  idContainer: {
    borderRadius: 10,
    borderWidth: 0.6,
    paddingVertical: 12,
    width: '90%',
    borderColor: GRAY_92,
    alignItems: 'flex-start',
    marginTop: 10,
  },
  image: {marginStart: 20},
  dob: {
    fontSize: 14,
    fontFamily: MONTSERRAT_REGULAR,
    marginStart: 16,
    color: BLACK_COLOR,
  },
  label: {
    fontSize: 15,
    color: BLACK_COLOR,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: 20,
    fontFamily: MONTSERRAT_REGULAR,
    marginHorizontal: 35,
  },
  or: {fontFamily: MONTSERRAT_MEDIUM, color: BLACK_COLOR, marginVertical: 16},
  frameContainer: {
    alignSelf: 'flex-start',
    marginBottom: -5,
    marginTop: 20,
    marginHorizontal: 20,
  },
  images: {
    width: getDeviceWidth() * 0.3,
    height: getDeviceHeight() * 0.11,
  },
});
