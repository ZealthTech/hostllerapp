import {View, Text, Alert, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import InputText from '../../components/inputText/InputText';
import Button from '../../components/button/Button';
import {ORANGE_DARK, WHITE} from '../../utils/colors/colors';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  forgotPassRequest,
  resetForgotPass,
} from '../../redux/reducers/authenticationReducer';
import {OTP_VERIFICATION, RESET_PASSWORD_SCREEN} from '../../navigation/routes';
import {apiPost} from '../../network/axiosInstance';
import {FORGOT_PASSWORD} from '../../utils/constants/apiEndPoints';
import Space from '../../components/space/Space';
import {showToast} from '../../utils/constants/commonFunctions';
import {ERROR_TOAST, SUCCESS_TOAST} from '../../utils/constants/constants';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {userData, targetRoute} = route?.params || {};
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('userData31 ', userData);
  // useEffect(() => {
  //   if (status) {
  //     dispatch(resetForgotPass());
  //     navigation.navigate(OTP_VERIFICATION);
  //   }
  // }, [status, responseMsgPass, dispatch, navigation]);
  const submitPhoneNumber = async () => {
    if (number?.length < 10) {
      console.log('20 ');
      setError(true);
      setErrorText('Please Enter 10 digit number');
      return;
    } else {
      setLoading(true);
      // const bodyData = JSON.stringify({phone: number});
      // console.log("'body data ", bodyData);
      const response = await apiPost(FORGOT_PASSWORD, {
        phone: number,
      });
      setLoading(false);
      if (response?.status) {
        console.log('response53 ', response);
        showToast(SUCCESS_TOAST, response?.message);
        navigation.dispatch(
          StackActions.replace(OTP_VERIFICATION, {
            data: userData,
            fromForgot: true,
            targetRoute: targetRoute,
          }),
        );
        // navigation.navigate(OTP_VERIFICATION, {
        //   data: userData,
        //   fromForgot: true,
        // });
      } else {
        //console.log('response?.message ', response?.message);
        showToast(ERROR_TOAST, response?.message);
      }
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#EE685C', '#FFE4AE']} style={styles.gradient}>
        {/* <View style={{alignItems: 'center', flex: 1}}> */}
        {/* <View style={styles.firstView}> */}
        <Image
          source={require('../../assets/images/otpFrame.png')}
          style={styles.image}
        />
        <Text style={styles.signup}>Forgot Password</Text>
        <Text style={styles.enter}>
          Enter registered mobile number to reset password
        </Text>
        {/* </View> */}
        {/* <View style={styles.secondView}> */}
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
        {/* </View> */}
        {/* <View style={styles.thirdView}> */}
        <Space height={40} />
        <Button
          title="Continue"
          elevation={true}
          containerStyle={{width: 200}}
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
        {/* </View> */}
        {/* </View> */}
      </LinearGradient>
    </ScrollView>
  );
};

export default ForgotPassword;
