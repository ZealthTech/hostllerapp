import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {WHITE} from '../../utils/colors/colors';

const Button = props => {
  const {title, onPress, containerStyle, textStyle, loading, elevation} =
    props || {};
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        containerStyle,
        elevation ? styles.elevation : null,
      ]}>
      {loading ? (
        <ActivityIndicator color={WHITE} />
      ) : (
        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};

export default Button;
