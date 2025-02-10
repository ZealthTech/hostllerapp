import {Text, Pressable, ActivityIndicator, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {WHITE} from '../../utils/colors/colors';

const Button = props => {
  const {
    title,
    onPress,
    containerStyle,
    textStyle,
    loading,
    elevation,
    isPressable = true,
  } = props || {};
  const ViewWrapper = isPressable ? Pressable : View;
  return (
    <ViewWrapper
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
    </ViewWrapper>
  );
};

export default Button;
