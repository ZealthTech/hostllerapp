import {StyleSheet} from 'react-native';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_SEMIBOLD,
} from '../../../utils/styles/commonStyles';
import {
  BLACK_COLOR,
  GRAY_LIGHT,
  GRAY_LIGHT_CB,
  PURPLE,
  PURPLE_EXTRA_LIGHT,
  TEXT_COLOR,
  WHITE,
} from '../../../utils/colors/colors';
import {
  getDeviceHeight,
  getDeviceWidth,
  isAndroid,
} from '../../../utils/constants/commonFunctions';

export const styles = StyleSheet.create({
  header: {flexDirection: 'row', justifyContent: 'space-between', padding: 20},
  photos: {
    fontFamily: MONTSERRAT_BOLD,
    fontSize: fontsSize.fs22,
    color: BLACK_COLOR,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: PURPLE,
  },
  writeView: {marginHorizontal: 20},
  reviewContainer: {
    width: '100%',
    height: getDeviceHeight() * 0.14,
    alignItems: 'flex-start',
    paddingTop: isAndroid() ? 0 : 5,
  },
  yourReview: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    color: BLACK_COLOR,
    fontSize: fontsSize.fs16,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  photosView: {
    width: getDeviceWidth() * 0.26,
    height: getDeviceHeight() * 0.13,
    justifyContent: 'center',
    borderColor: PURPLE,
    borderRadius: 10,
    borderStyle: 'dashed',
    backgroundColor: PURPLE_EXTRA_LIGHT,
    borderWidth: 1,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '95%',
    backgroundColor: WHITE,
    borderRadius: 10,
  },
  select: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    color: TEXT_COLOR,
    fontSize: fontsSize.fs14,
    padding: 16,
  },
  line: {backgroundColor: GRAY_LIGHT_CB, height: 1, width: '100%'},
  row: {flexDirection: 'row', gap: 6, padding: 16, alignItems: 'center'},
  take: {
    color: BLACK_COLOR,
    fontSize: fontsSize.fs16,
    fontFamily: MONTSERRAT_SEMIBOLD,
  },
  selectedImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  selectedImage: {
    width: getDeviceWidth() * 0.26,
    height: getDeviceHeight() * 0.13,
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectedImg: {
    borderRadius: 10,
    marginRight: 14,
    marginBottom: 14,
  },
  crossIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 1,
    backgroundColor: GRAY_LIGHT,
    borderRadius: 20,
    padding: 6,
  },
  bottomBtn: {
    marginTop: 0,
    marginBottom: isAndroid() ? 20 : 30,
    backgroundColor: PURPLE,
    marginHorizontal: 20,
    paddingVertical: 12,
  },
});
