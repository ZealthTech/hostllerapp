import {View, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {COLOR_GRAY_7F} from '../../utils/colors/colors';
import CustomSvg from '../customSvg/CustomSvg';
import {Lock, OpenEye, Password} from '../../assets';

const InputText = props => {
  const {
    placeholder,
    onChangeText,
    onBlur,
    value,
    error,
    secureTextEntry = false,
    keyboardType = 'default',
    onFocus = false,
    isErrorMsgRequired,
    inputContainer,
    inputStyle,
    autoFocus,
    editable,
    inputRef,
    passwordIcon,
    containerStyle,
    multiline,
    maxLength,
    labelReq = false,
    label,
  } = props || {};
  const [isFocused, setIsFocused] = useState(onFocus);
  const [secureText, setSecureText] = useState(secureTextEntry);

  useEffect(() => {
    setSecureText(secureTextEntry);
  }, [secureTextEntry]);
  const handleOnFocus = () => {
    setIsFocused(true);
    onFocus && onFocus();
  };

  const handleOnBlur = text => {
    setIsFocused(false);
    onBlur?.(text); //optional chaining
  };
  return (
    <View style={[containerStyle]}>
      {labelReq && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.containerStyle(isErrorMsgRequired, isFocused),
          inputContainer,
        ]}>
        <TextInput
          ref={inputRef}
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          value={value}
          secureTextEntry={secureText}
          keyboardType={keyboardType}
          placeholderTextColor={COLOR_GRAY_7F}
          autoFocus={autoFocus}
          editable={editable}
          multiline={multiline}
          maxLength={maxLength}
        />
        {passwordIcon && (
          <CustomSvg
            SvgComponent={
              secureText ? <Password /> : <OpenEye height={24} width={24} />
            }
            imgStyle={{marginRight: 10}}
            isClickable={true}
            onPress={() => setSecureText(!secureText)}
          />
        )}
      </View>

      {isErrorMsgRequired && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputText;
