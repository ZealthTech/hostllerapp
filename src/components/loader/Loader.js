import React from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
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
      <Video
        style={styles.video}
        source={require('../../assets/images/loader.mp4')}
        paused={!loading}
        repeat={true}
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
    bottom: 20,
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
