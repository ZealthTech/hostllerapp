import {View, Text, Alert, Image, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import InputText from '../../components/inputText/InputText';
import Button from '../../components/button/Button';
import {
  BLACK_COLOR,
  GRAY_92,
  ORANGE_DARK,
  WHITE,
} from '../../utils/colors/colors';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  forgotPassRequest,
  resetForgotPass,
} from '../../redux/reducers/authenticationReducer';
import {OTP_VERIFICATION, RESET_PASSWORD_SCREEN} from '../../navigation/routes';
import {apiPost} from '../../network/axiosInstance';
import {
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../../utils/constants/apiEndPoints';
import Space from '../../components/space/Space';
import {
  getDeviceHeight,
  getDeviceWidth,
  showToast,
} from '../../utils/constants/commonFunctions';
import {ERROR_TOAST, SUCCESS_TOAST} from '../../utils/constants/constants';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';

const ResetPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data, targetRoute} = route?.params || {};
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log('userData47 ', data);
  // useEffect(() => {
  //   if (status) {
  //     dispatch(resetForgotPass());
  //     navigation.navigate(OTP_VERIFICATION);
  //   }
  // }, [status, responseMsgPass, dispatch, navigation]);
  const changePasswordRequest = async () => {
    if (password !== confirmPassword && confirmPassword?.length > 1) {
      showToast(ERROR_TOAST, 'Password and confirm password must match');
      return;
    }
    if (
      (password === '' && confirmPassword === '') ||
      password === '' ||
      confirmPassword === ''
    ) {
      showToast(
        ERROR_TOAST,
        'Password and Confirm Password both are required fields',
      );
    }
    if (
      password?.length < 6 &&
      password?.length > 1 &&
      confirmPassword?.length > 1
    ) {
      setError(true);
      setConfirmError(true);
      setErrorText('Password must be at least 5 characters long');
      return;
    }
    const _data = {
      userId: data?.userData?.userId,
      password: password,
      confirmPassword: confirmPassword,
    };
    setPassword(true);
    const response = await apiPost(RESET_PASSWORD, _data, data?.token);
    if (response?.status) {
      setPassword(false);
      showToast(SUCCESS_TOAST, response?.message);
      navigation.dispatch(StackActions.replace(targetRoute));
    } else {
      setPassword(false);
      showToast(ERROR_TOAST, response?.message);
    }
    console.log('response ', response);
    // else {
    //   setLoading(true);
    //   // const bodyData = JSON.stringify({phone: number});
    //   // console.log("'body data ", bodyData);
    //   const response = await apiPost(FORGOT_PASSWORD, {
    //     // phone: number,
    //   });
    //   setLoading(false);
    //   if (response?.status) {
    //     console.log('response53 ', response);
    //     showToast(SUCCESS_TOAST, response?.message);
    //     navigation.dispatch(
    //       StackActions.replace(OTP_VERIFICATION, {
    //         data: userData,
    //         fromForgot: true,
    //       }),
    //     );
    //     // navigation.navigate(OTP_VERIFICATION, {
    //     //   data: userData,
    //     //   fromForgot: true,
    //     // });
    //   } else {
    //     //console.log('response?.message ', response?.message);
    //     showToast(ERROR_TOAST, response?.message);
    //   }
    // }
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
        <Text style={styles.enter}>Reset Your Password</Text>
        <Text style={styles.sent}>
          The Password must be different than before
        </Text>
        {/* </View> */}
        {/* <View style={styles.secondView}> */}
        <Space height={20} />
        <InputText
          placeholder={'Password'}
          onChangeText={text => {
            setPassword(text);
            setError(false);
          }}
          value={password}
          isErrorMsgRequired={error}
          error={errorText}
          passwordIcon={true}
          secureTextEntry={true}
          inputContainer={{width: '100%'}}
          containerStyle={styles.inputView}
          //containerStyle={styles.inputView}
        />
        <Space height={14} />
        <InputText
          placeholder={'Confirm Password'}
          onChangeText={text => {
            setConfirmError(false);
            setConfirmPassword(text);
          }}
          value={confirmPassword}
          isErrorMsgRequired={confirmError}
          error={errorText}
          passwordIcon={true}
          secureTextEntry={true}
          inputContainer={{width: '100%'}}
          containerStyle={styles.inputView}
          //containerStyle={styles.inputView}
        />
        <Space height={14} />

        {/* </View> */}
        {/* <View style={styles.thirdView}> */}
        <Space height={40} />
        <Button
          title="Continue"
          elevation={true}
          containerStyle={{width: 200}}
          onPress={changePasswordRequest}
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

export default ResetPassword;
const styles = StyleSheet.create({
  container: {flex: 1},
  gradient: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  enter: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: fontsSize.fs18,
    marginTop: 10,
    color: BLACK_COLOR,
  },
  sent: {
    fontFamily: MONTSERRAT_MEDIUM,
    width: '85%',
    marginTop: 20,
    textAlign: 'center',
    color: BLACK_COLOR,
  },
  resendView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 14,
    gap: 5,
  },
  dont: {fontFamily: MONTSERRAT_MEDIUM, color: BLACK_COLOR},
  resent: {fontFamily: MONTSERRAT_BOLD, color: ORANGE_DARK},
  image: {
    height: getDeviceHeight() * 0.36,
    width: getDeviceWidth() * 0.56,
    marginTop: getDeviceHeight() * 0.03,
    padding: 15,
  },
  btn: {width: 200, backgroundColor: WHITE, marginTop: 10},
  inputView: {
    elevation: 10,
    shadowOpacity: 3,
    shadowRadius: 3,
    shadowColor: GRAY_92,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  },
});
