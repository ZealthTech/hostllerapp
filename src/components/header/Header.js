import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';
import IconButton from '../iconButton/IconButton';
import Person from '../../assets/svg/person.svg';
import Bell from '../../assets/svg/bell.svg';
import {PURPLE} from '../../utils/colors/colors';

const Header = props => {
  const {onPressProfile, onPressBell} = props || {};
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/splash_image.png')}
        style={styles.image}
      />
      <View style={styles.rightView}>
        <IconButton
          icon={<Person fill={PURPLE} height={28} width={28} />}
          onPress={onPressProfile}
        />
        <IconButton
          icon={<Bell fill={PURPLE} height={28} width={28} />}
          onPress={onPressBell}
        />
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  image: {width: getDeviceWidth() * 0.32, height: getDeviceHeight() * 0.065},
  container: {
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
});
