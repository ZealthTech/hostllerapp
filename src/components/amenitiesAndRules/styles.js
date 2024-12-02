import {StyleSheet} from 'react-native';
import {BLACK_COLOR, GRAY_92} from '../../utils/colors/colors';
import {
  fontsSize,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';

export const styles = StyleSheet.create({
  itemContainer: {
    width: '31%',
    alignItems: 'center',
    marginBottom: 12,
    marginEnd: 10,
    marginTop: 3,
    //padding: 10,
    // backgroundColor: 'red',
    //justifyContent: 'center',
  },
  icon: {
    width: 60,
    height: 30,
    // marginBottom: 5,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 12,
    fontFamily: MONTSERRAT_REGULAR,
    textAlign: 'center',
    color: BLACK_COLOR,
    marginTop: 5,
    //flex: 1,
    marginStart: 2,
  },
  flatListContainer: {
    marginVertical: 10,
    //alignItems: 'center',
    // backgroundColor: 'red',
    // justifyContent: 'center',
    // alignContent: 'center',
    //alignSelf: 'center',
  },
  title: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_SEMIBOLD,
    marginTop: 10,
    marginStart: 14,
    fontSize: fontsSize.fs16,
    marginBottom: 16,
  },
  container: {
    // backgroundColor: '#fff',
    // borderRadius: 10,
    // padding: 16,
    // margin: 16,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 5,
    borderWidth: 0.5,
    borderColor: GRAY_92,
    borderRadius: 10,
    marginBottom: 16,
    //alignItems: 'center',
  },
});
