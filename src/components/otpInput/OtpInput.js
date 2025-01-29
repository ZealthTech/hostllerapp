import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const OTPInput = props => {
  const {otp, handleChangeText, inputs} = props || {};

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (inputs[index] = ref)}
          value={digit}
          onChangeText={text => handleChangeText(text, index)}
          maxLength={1}
          keyboardType="numeric"
          style={styles.input}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
              inputs[index - 1].focus();
            }
          }}
          // autoFocus
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'white',
  },
});

export default OTPInput;
