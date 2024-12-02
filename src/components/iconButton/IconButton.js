import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ORANGE_DARK} from '../../utils/colors/colors';

const IconButton = props => {
  const {icon, containerStyle, onPress} = props || {};
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: ORANGE_DARK,
    borderRadius: 50,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
