import {View, Text, TextInput, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import CustomSvg from '../customSvg/CustomSvg';
import {DownArrow} from '../../assets';
import {COLOR_GRAY_7F} from '../../utils/colors/colors';
import InputText from '../inputText/InputText';

const DropDownInput = props => {
  const {
    data,
    onPressIcon,
    isErrorMsgRequired,
    error,
    value = '',
  } = props || {};
  const isValue = value !== '';
  return (
    <>
      <Pressable style={styles.container} onPress={onPressIcon}>
        <Text style={styles.city(isValue)}>
          {!isValue ? 'Enter City' : value}
        </Text>
        <CustomSvg SvgComponent={<DownArrow />} />
      </Pressable>
      {isErrorMsgRequired && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

export default DropDownInput;
