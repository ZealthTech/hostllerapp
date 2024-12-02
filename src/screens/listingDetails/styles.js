import {StyleSheet} from 'react-native';
import {
  getDeviceHeight,
  getDeviceWidth,
  isAndroid,
} from '../../utils/constants/commonFunctions';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {
  BLACK_COLOR,
  GRAY_92,
  LIGHT_PURPLE,
  ORANGE_DARK,
  PINK_LIGHT,
  PURPLE,
  WHITE,
  YELLOW,
} from '../../utils/colors/colors';

const imgRadiusTopLeft = index => {
  if (index === 0) {
    return 30;
  } else {
    return 0;
  }
};
const imgRadiusRightLeft = (index, length) => {
  if (index === length - 1) {
    return 30;
  } else {
    return 0;
  }
};

const imgRadiusBottomRight = (index, length) => {
  if (index === length - 1) {
    return 30;
  } else {
    return 0;
  }
};
export const getStarColor = rating => {
  if (rating < 2) {
    return ORANGE_DARK;
  } else if (rating >= 2 && rating < 4) {
    return '#fad02c';
  } else {
    return 'green';
  }
};
export const styles = StyleSheet.create({
  flat: {margin: 20},
  imgMain: (index, length) => ({
    height: getDeviceHeight() * 0.26,
    width: getDeviceWidth() * 0.64,
    borderTopLeftRadius: imgRadiusTopLeft(index),
    marginEnd: 16,
    borderBottomLeftRadius: imgRadiusTopLeft(index),
    borderBottomRightRadius: imgRadiusBottomRight(index, length),
    borderTopRightRadius: imgRadiusRightLeft(index, length),
    resizeMode: 'cover',
  }),
  contentView: {marginHorizontal: 20},
  titleView: {flexDirection: 'row', justifyContent: 'space-between'},
  ratingCountView: rating => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 4,
    paddingVertical: isAndroid() ? -2 : 1,
    marginBottom: 3,
    borderRadius: 5,
    backgroundColor: getStarColor(rating),
  }),
  pgTitle: {
    fontFamily: MONTSERRAT_BOLD,
    color: ORANGE_DARK,
    fontSize: fontsSize.fs18,
  },
  reviewCount: {fontFamily: MONTSERRAT_REGULAR, fontSize: 12},
  genderRow: {flexDirection: 'row', gap: 5, marginTop: 10},
  genderText: {color: BLACK_COLOR, fontFamily: MONTSERRAT_REGULAR},
  pgDetails: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: GRAY_92,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  about: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: fontsSize.fs16,
  },
  description: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_MEDIUM,
    fontSize: fontsSize.fs12,
    marginTop: 5,
    lineHeight: 20,
  },
  imgView: {
    flexDirection: 'row',
    marginHorizontal: 35,
    gap: 8,
    marginBottom: 10,
  },
  extTch: {
    borderWidth: 0.5,
    borderColor: PURPLE,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extTxt: {
    color: PURPLE,
    fontFamily: MONTSERRAT_MEDIUM,
    fontSize: fontsSize.fs14,
  },
  selectedButton: {
    backgroundColor: LIGHT_PURPLE,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    color: PURPLE,
    fontFamily: MONTSERRAT_SEMIBOLD,
  },
  sheetImg: {
    height: getDeviceHeight() * 0.28,
    alignSelf: 'center',
    marginBottom: 10,
    width: '96%',
  },
  header: {flexDirection: 'row', justifyContent: 'space-between', padding: 20},
  photos: {
    fontFamily: MONTSERRAT_BOLD,
    fontSize: fontsSize.fs22,
    color: BLACK_COLOR,
  },
  line: {height: 0.5, backgroundColor: GRAY_92, marginBottom: 10},
  priceView: {marginLeft: 10},
  start: {fontFamily: MONTSERRAT_REGULAR},
  price: {fontFamily: MONTSERRAT_BOLD, color: BLACK_COLOR, fontSize: 20},
  rupee: {
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: 18,
    color: BLACK_COLOR,
  },
  startFrom: {fontFamily: MONTSERRAT_REGULAR, color: BLACK_COLOR},
  perMonth: {fontFamily: MONTSERRAT_REGULAR, color: BLACK_COLOR},
  deposit: {
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: fontsSize.fs12,
    marginBottom: isAndroid() ? 0 : 5,
  },
  choose: {color: ORANGE_DARK, fontFamily: MONTSERRAT_BOLD},
  pressableView: {
    backgroundColor: WHITE,
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: isAndroid() ? 8 : 10,
    elevation: 5,
    shadowColor: GRAY_92,
    shadowOpacity: 2,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 0,
    },
  },
  footerView: {
    backgroundColor: PINK_LIGHT,
    paddingHorizontal: 26,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopEndRadius: 16,
    borderTopLeftRadius: 16,
  },
});
