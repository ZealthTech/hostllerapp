import {StyleSheet} from 'react-native';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {
  BLACK_COLOR,
  GRAY_LIGHT_CB,
  ORANGE_DARK,
  PURPLE,
  WHITE,
} from '../../utils/colors/colors';
const imageSize = Math.min(getDeviceWidth() * 0.82, getDeviceHeight() * 0.52);
export const styles = StyleSheet.create({
  container: {flex: 1},
  image: {
    height: imageSize / 2,
    width: imageSize / 2,
    borderRadius: 100,
  },
  nameTxt: {
    textAlign: 'center',
    fontFamily: MONTSERRAT_SEMIBOLD,
    color: BLACK_COLOR,
    fontSize: 18,
  },
  rowPhone: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 30,
  },

  phoneTxt: {fontFamily: MONTSERRAT_MEDIUM, fontSize: 16, color: BLACK_COLOR},
  kycRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  contentView: {flexDirection: 'row', alignItems: 'center', gap: 14},
  titleTxt: {color: BLACK_COLOR, fontFamily: MONTSERRAT_BOLD},
  contentTxt: {
    fontSize: 10,
    fontFamily: MONTSERRAT_REGULAR,
    color: BLACK_COLOR,
  },
  line: {height: 1, backgroundColor: GRAY_LIGHT_CB, marginVertical: 20},
  imageView: {
    backgroundColor: WHITE,
    height: 45,
    width: 45,
    position: 'absolute',
    alignItems: 'center',
    right: 0,
    bottom: 10,
    justifyContent: 'center',
    borderRadius: 100,
  },
  imageContainer: {
    height: imageSize / 2,
    width: imageSize / 2,
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 30,
  },
  verify: {
    color: ORANGE_DARK,
    fontFamily: MONTSERRAT_MEDIUM,
  },
  buttonContainer: {
    alignSelf: 'flex-start',
    borderWidth: 0.8,
    borderColor: ORANGE_DARK,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  verifyContainer: {marginStart: 28, marginTop: 20},
  textStyle: {color: ORANGE_DARK},
  myProfile: {
    fontSize: 22,
    fontFamily: MONTSERRAT_SEMIBOLD,
    color: BLACK_COLOR,
  },
  emptyProfileView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: {textAlign: 'center', fontFamily: MONTSERRAT_REGULAR, padding: 10},
  buttonView: {backgroundColor: PURPLE},
  profileImg: {height: 100, width: 100, borderRadius: 200, marginBottom: 10},
});
