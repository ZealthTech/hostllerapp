import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';
import {WHITE} from '../../utils/colors/colors';

const Loader = ({loading}) => {
  if (!loading) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <Image
        source={require('../../assets/images/loader.gif')}
        style={styles.video}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  video: {
    width: getDeviceWidth() * 0.5,
    height: getDeviceHeight() * 0.2,
  },
});
