import React from 'react';
import {View, Text, Pressable, ImageBackground, StyleSheet} from 'react-native';
import Button from '../../components/button/Button';
import {BLACK_COLOR} from '../../utils/colors/colors';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
} from '../../utils/styles/commonStyles';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';

const ListYourPropertyBanner = props => {
  const {onPress} = props || {};
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <ImageBackground
        source={require('../../assets/images/addProperty.png')}
        style={styles.imgContainer}
        imageStyle={styles.bannerImg}>
        <View style={styles.textView}>
          <Text style={styles.list}>OWN A PG?</Text>
          <Text style={styles.property}>{'List Your Property with Us\n'}</Text>
          <Text style={styles.today}>Today!</Text>
          <Button
            title="Click Here"
            containerStyle={styles.buttonStyle}
            textStyle={styles.text}
            isPressable={false}
          />
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: 25,
    paddingVertical: 6,
    marginTop: 10,
    borderRadius: 16,
  },
  today: {
    textAlign: 'center',
    fontFamily: MONTSERRAT_BOLD,
    marginTop: -10,
    color: BLACK_COLOR,
    fontSize: 12,
  },
  text: {fontSize: 10, fontFamily: MONTSERRAT_MEDIUM},
  bannerImg: {
    height: getDeviceHeight() * 0.2,
    width: '100%',
    borderRadius: 20,
    resizeMode: 'stretch',
  },
  textView: {
    paddingStart: 14,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  imgContainer: {
    height: getDeviceHeight() * 0.2,
    width: getDeviceWidth() * 0.9,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
  },
  list: {fontFamily: MONTSERRAT_BOLD, color: BLACK_COLOR, fontSize: 20},
  property: {fontFamily: MONTSERRAT_MEDIUM, fontSize: 10, color: BLACK_COLOR},
});
export default ListYourPropertyBanner;
