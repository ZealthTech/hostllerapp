import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/button/Button';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {LOGIN, RESET_PASSWORD_SCREEN} from '../../navigation/routes';
import {
  otpSendRequest,
  resetStatus,
} from '../../redux/reducers/authenticationReducer';
import {ERROR_TOAST, SUCCESS_TOAST} from '../../utils/constants/constants';
import {apiPost} from '../../network/axiosInstance';
import {
  FORGOT_PASS_VERIFY_OTP,
  FORGOT_PASSWORD,
} from '../../utils/constants/apiEndPoints';
import {showToast} from '../../utils/constants/commonFunctions';
import OTPInput from '../../components/otpInput/OtpInput';
import Space from '../../components/space/Space';

const OtpVerification = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data, fromForgot, targetRoute, phone} = route?.params || {};
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [resendOtp, setResendOtp] = useState(false);

  const {otpStatus, message, loading, otpAttempted} = useSelector(
    state => state.authReducer,
  );

  useEffect(() => {
    if (otpAttempted && !loading) {
      if (otpStatus) {
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
        showToast(ERROR_TOAST, message);
      }
      dispatch(resetStatus());
    }
  }, [
    otpStatus,
    navigation,
    loading,
    otpAttempted,
    message,
    dispatch,
    targetRoute,
  ]);

  const verifyOtp = async () => {
    if (otp.some(field => field === '')) {
      showToast(ERROR_TOAST, 'Please fill all OTP fields');
      return;
    }
    const otpString = otp.join('');
    const bodyData = {
      userId: data?.userId,
      OTP: otpString,
    };

    if (fromForgot) {
      const response = await apiPost(FORGOT_PASS_VERIFY_OTP, bodyData);
      if (response.status) {
        navigation.replace(RESET_PASSWORD_SCREEN, {
          data: data,
          targetRoute: targetRoute,
        });
      } else {
        showToast(ERROR_TOAST, response?.message);
      }
    } else {
      dispatch(resetStatus());
      dispatch(otpSendRequest(bodyData));
    }
  };

  const handleResendOtp = async () => {
    setResendOtp(true);
    const response = await apiPost(FORGOT_PASSWORD, {phone});
    showToast(SUCCESS_TOAST, response?.message);
  };

  const handleOTPComplete = () => {
    Keyboard.dismiss();
  };

  const inputs = [];
  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    if (text && index < 4 - 1) {
      inputs[index + 1].focus();
    } else if (!text && index > 0) {
      inputs[index - 1].focus();
    }
    setOtp(newOtp);
    if (newOtp.join('').length === 4) {
      handleOTPComplete();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#EE685C', '#FFE4AE']} style={styles.gradient}>
          <Image
            source={require('../../assets/images/otpFrame.png')}
            style={styles.image}
          />
          <Text style={styles.enter}>Enter Verification Code</Text>
          <Text style={styles.sent}>
            We have sent a code to your registered number
          </Text>
          <Space height={10} />
          <OTPInput
            length={4}
            onOTPComplete={handleOTPComplete}
            otp={otp}
            inputs={inputs}
            handleChangeText={(text, index) => handleChangeText(text, index)}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpVerification;
