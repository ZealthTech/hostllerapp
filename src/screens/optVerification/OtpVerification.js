import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/button/Button';
import Animated, {FadeInDown} from 'react-native-reanimated';
import RNOtpVerify from 'react-native-otp-verify';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import InputText from '../../components/inputText/InputText';
import {useDispatch, useSelector} from 'react-redux';
import {HOME_NAVIGATOR, LOGIN} from '../../navigation/routes';
import {
  otpSendRequest,
  resetStatus,
} from '../../redux/reducers/authenticationReducer';
import {getDataFromStorage} from '../../utils/storage';
import {TOKEN} from '../../utils/constants/constants';
import {apiPost} from '../../network/axiosInstance';
import {FORGOT_PASS_VERIFY_OTP} from '../../utils/constants/apiEndPoints';

const OtpVerification = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data, fromForgot} = route?.params || {};
  const [otp, setOtp] = useState('');
  const [token, setToke] = useState('');
  const [isOtpAutoRead, setIsOtpAutoRead] = useState(false); // For status tracking
  const {otpStatus, message, loading} = useSelector(state => state.authReducer);
  console.log('data ', data);

  console.log('fromForgot ', fromForgot);

  // useEffect(() => {
  //   // Fetch hash for SMS
  //   RNOtpVerify.getHash()
  //     .then(hash => console.log('Hash for SMS:', hash))
  //     .catch(e => console.log('Error fetching hash:', e));

  //   // Start OTP listener
  //   RNOtpVerify.getOtp()
  //     .then(() => {
  //       RNOtpVerify.addListener(otpHandler);
  //     })
  //     .catch(e => console.log('Error starting OTP listener:', e));

  //   // Cleanup listener on unmount
  //   return () => {
  //     RNOtpVerify.removeListener();
  //   };
  // }, []);
  useEffect(() => {
    console.log('44 // ', otpStatus);
    if (otpStatus) {
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: HOME_NAVIGATOR}],
      // });
      navigation.dispatch(StackActions.replace(LOGIN));
    }
  }, [otpStatus, navigation]);

  // const otpHandler = message => {
  //   try {
  //     // Extract OTP from the message using regex
  //     const otpMatch = message.match(/(\d{4})/); // Adjust regex for your OTP length
  //     if (otpMatch && otpMatch[1]) {
  //       setOtp(otpMatch[1]); // Update OTP state
  //       setIsOtpAutoRead(true); // Auto-read status
  //       Keyboard.dismiss(); // Dismiss the keyboard
  //       RNOtpVerify.removeListener(); // Remove listener after reading OTP
  //     }
  //   } catch (error) {
  //     console.error('Error parsing OTP:', error);
  //   }
  // };

  const verifyOtp = async () => {
    if (fromForgot) {
      const response = await apiPost(FORGOT_PASS_VERIFY_OTP, {
        userId: data?.userId,
        OTP: otp,
      });
      if (response.status) {
        navigation.dispatch(StackActions.replace(LOGIN));
      } else {
        console.log(response.message);
      }
    } else {
      const bodyData = {
        userId: data?.userId,
        OTP: otp,
      };
      console.log('body data ', bodyData);
      dispatch(resetStatus());
      dispatch(otpSendRequest(bodyData));
    }
  };
  const handleResendOtp = () => {
    // // Reset OTP auto-read state
    // setOtp('');
    // setIsOtpAutoRead(false);
    // console.log('OTP resend triggered!');
    // // Trigger your backend to resend the OTP
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#EE685C', '#FFE4AE']} style={styles.gradient}>
        <Text style={styles.enter}>Enter Verification Code</Text>
        <Text style={styles.sent}>We have sent a code to {data?.email}</Text>
        <InputText
          value={otp}
          onChangeText={text => setOtp(text)}
          containerStyle={{marginTop: 30}}
          placeholder="Enter Otp"
        />
        <Animated.View style={styles.btn} entering={FadeInDown.duration(500)}>
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
