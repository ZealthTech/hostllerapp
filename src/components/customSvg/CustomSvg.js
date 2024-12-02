import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CustomSvg = props => {
  const {isClickable, onPress, SvgComponent, imgStyle, key} = props || {};

  const ViewWrapper = isClickable ? TouchableOpacity : View;
  return (
    <ViewWrapper onPress={onPress} style={[styles.container, imgStyle]}>
      {SvgComponent}
    </ViewWrapper>
  );
};

export default CustomSvg;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
