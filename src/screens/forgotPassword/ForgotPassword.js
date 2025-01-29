import {Text, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import InputText from '../../components/inputText/InputText';
import Button from '../../components/button/Button';
import {ORANGE_DARK} from '../../utils/colors/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {OTP_VERIFICATION} from '../../navigation/routes';
import {apiPost} from '../../network/axiosInstance';
import {FORGOT_PASSWORD} from '../../utils/constants/apiEndPoints';
import Space from '../../components/space/Space';
import {showToast} from '../../utils/constants/commonFunctions';
import {ERROR_TOAST, SUCCESS_TOAST} from '../../utils/constants/constants';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {userData, targetRoute} = route?.params || {};
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('userData31 ', userData);
  const submitPhoneNumber = async () => {
    if (number?.length < 10) {
      setError(true);
      setErrorText('Please Enter 10 digit number');
      return;
    } else {
      setLoading(true);
      const response = await apiPost(FORGOT_PASSWORD, {
        phone: number,
      });
      setLoading(false);
      if (response?.status) {
        showToast(SUCCESS_TOAST, response?.message);
        navigation.replace(OTP_VERIFICATION, {
          targetRoute: targetRoute,
          data: response.data,
          fromForgot: true,
          phone: number,
        });
      } else {
        showToast(ERROR_TOAST, response?.message);
      }
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#EE685C', '#FFE4AE']} style={styles.gradient}>
        <Image
          source={require('../../assets/images/otpFrame.png')}
          style={styles.image}
        />
        <Text style={styles.signup}>Forgot Password</Text>
        <Text style={styles.enter}>
          Enter registered mobile number to reset password
        </Text>
        <Space height={20} />
        <InputText
          inputContainer={{width: '88%'}}
          containerStyle={styles.inputView}
          value={number}
          placeholder={'Mobile Number'}
          onChangeText={text => {
            const numericText = text.replace(/[^0-9]/g, '');
            setNumber(numericText);
            setError(false);
          }}
          keyboardType={'number-pad'}
          isErrorMsgRequired={error}
          error={errorText}
          maxLength={10}
        />
        <Space height={40} />
        <Button
          title="Continue"
          elevation={true}
          containerStyle={styles.containerStyle}
          onPress={submitPhoneNumber}
          loading={loading}
        />
        <Button
          title="Cancel"
          elevation={true}
          containerStyle={styles.btn}
          textStyle={{color: ORANGE_DARK}}
          onPress={() => navigation?.goBack()}
        />
      </LinearGradient>
    </ScrollView>
  );
};

export default ForgotPassword;
