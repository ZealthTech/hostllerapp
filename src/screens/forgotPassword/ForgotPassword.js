import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import InputText from '../../components/inputText/InputText';
import Button from '../../components/button/Button';
import {ORANGE_DARK, WHITE} from '../../utils/colors/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  forgotPassRequest,
  resetForgotPass,
} from '../../redux/reducers/authenticationReducer';
import {OTP_VERIFICATION} from '../../navigation/routes';
import {apiPost} from '../../network/axiosInstance';
import {FORGOT_PASSWORD} from '../../utils/constants/apiEndPoints';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {userData} = route?.params || {};
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('userData ', userData);
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
        console.log('response ', response);
        navigation.navigate(OTP_VERIFICATION, {
          data: userData,
          fromForgot: true,
        });
      } else {
        console.log('response?.message ', response?.message);
      }
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#EE685C', '#FFE4AE']} style={styles.gradient}>
        <View style={{justifyContent: 'space-between'}}>
          <View style={styles.firstView}>
            <Text style={styles.signup}>Forgot Password</Text>
            <Text>Enter registered mobile number to reset password</Text>
          </View>
          <View style={styles.secondView}>
            <InputText
              inputContainer={{width: '100%'}}
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
          </View>
          <View style={styles.thirdView}>
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
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ForgotPassword;
