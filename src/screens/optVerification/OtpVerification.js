import {View, Text, TouchableOpacity, Keyboard, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/button/Button';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import RNOtpVerify from 'react-native-otp-verify';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import InputText from '../../components/inputText/InputText';
import {useDispatch, useSelector} from 'react-redux';
import {
  HOME_NAVIGATOR,
  LOGIN,
  RESET_PASSWORD_SCREEN,
} from '../../navigation/routes';
import {
  otpSendRequest,
  resetStatus,
} from '../../redux/reducers/authenticationReducer';
import {getDataFromStorage} from '../../utils/storage';
import {
  ERROR_TOAST,
  SUCCESS_TOAST,
  TOKEN,
} from '../../utils/constants/constants';
import {apiPost} from '../../network/axiosInstance';
import {FORGOT_PASS_VERIFY_OTP} from '../../utils/constants/apiEndPoints';
import {showToast} from '../../utils/constants/commonFunctions';
import {registerUserRequest} from '../../redux/reducers/registerReducer';

const OtpVerification = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data, fromForgot, values, targetRoute} = route?.params || {};
  console.log('values ', data);
  const [otp, setOtp] = useState('');
  const [token, setToke] = useState('');
  const [resendOpt, setResendOtp] = useState(false);
  //const [otpAttempted, setOtpAttempted] = useState(false);

  const {otpStatus, message, loading, otpAttempted} = useSelector(
    state => state.authReducer,
  );
  console.log('data41 ', data);

  console.log('otpStatus, message, loading ', otpStatus, message, loading);
  console.log('otp attempted ', otpAttempted);
  useEffect(() => {
    console.log('36 ', otpAttempted);
    if (otpAttempted && !loading) {
      console.log('38 ');
      if (otpStatus) {
        console.log('40 ');
        // navigation.dispatch(StackActions.replace(LOGIN));
        //  navigation.reset({index: 0, LOGIN});
        navigation.reset({
          index: 1,
          routes: [
            {
              name: LOGIN,
              params: {
                targetRoute: targetRoute,
              },
            },
          ],
        });
      } else {
        console.log('43 ');
        showToast(ERROR_TOAST, message);
      }
      dispatch(resetStatus());
    }
    //setOtpAttempted(false);
  }, [
    otpStatus,
    navigation,
    loading,
    otpAttempted,
    message,
    dispatch,
    targetRoute,
  ]);

  useEffect(() => {
    if (resendOpt) {
      showToast(SUCCESS_TOAST, 'Otp resend successfully');
      setResendOtp(false);
    }
  }, [message, resendOpt]);

  const verifyOtp = async () => {
    const bodyData = {
      userId: data?.userId,
      OTP: otp,
    };
    if (fromForgot) {
      const response = await apiPost(FORGOT_PASS_VERIFY_OTP, bodyData);
      if (response.status) {
        navigation.dispatch(
          StackActions.replace(RESET_PASSWORD_SCREEN, {
            data: data,
            targetRoute: targetRoute,
          }),
        );
      } else {
        showToast(ERROR_TOAST, response?.message);
      }
    } else {
      console.log('body data ', bodyData);
      //setOtpAttempted(true);

      dispatch(resetStatus());
      dispatch(otpSendRequest(bodyData));
    }
  };
  const handleResendOtp = () => {
    // setOtpAttempted(true);
    setResendOtp(true);
    dispatch(registerUserRequest(values));
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#EE685C', '#FFE4AE']} style={styles.gradient}>
        <Image
          source={require('../../assets/images/otpFrame.png')}
          style={styles.image}
        />
        <Text style={styles.enter}>Enter Verification Code</Text>
        <Text style={styles.sent}>
          We have sent a code to {data?.userData?.email}
        </Text>
        <InputText
          value={otp}
          onChangeText={text => setOtp(text)}
          containerStyle={{marginTop: 30}}
          placeholder="Enter OTP"
          keyboardType={'number-pad'}
        />
        <Animated.View
          style={styles.btn}
          entering={FadeInUp.duration(400).damping(50)}>
          <Button
            title="Verify Now"
            elevation={true}
            onPress={verifyOtp}
            loading={loading}
          />
          <View style={styles.resendView}>
            <Text style={styles.dont}>Don't receive code?</Text>
            <TouchableOpacity onPress={handleResendOtp}>
              <Text style={styles.resent}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default OtpVerification;
