import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

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
    borderRadius: 50,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
