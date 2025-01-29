import {Text, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import InputText from '../../components/inputText/InputText';
import Button from '../../components/button/Button';
import {ORANGE_DARK} from '../../utils/colors/colors';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {LOGIN} from '../../navigation/routes';
import {apiPost} from '../../network/axiosInstance';
import {RESET_PASSWORD} from '../../utils/constants/apiEndPoints';
import Space from '../../components/space/Space';
import {showToast} from '../../utils/constants/commonFunctions';
import {ERROR_TOAST, SUCCESS_TOAST} from '../../utils/constants/constants';
import {styles} from './styles';

const ResetPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data, targetRoute} = route?.params || {};
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState(false);
  const [loading] = useState(false);

  console.log('userData47 ', data, targetRoute);
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
      userId: data?.userId,
      password: password,
      confirmPassword: confirmPassword,
    };
    setPassword(true);
    const response = await apiPost(RESET_PASSWORD, _data, data?.token);
    if (response?.status) {
      setPassword(false);
      showToast(SUCCESS_TOAST, response?.message);
      navigation.pop(1);
      navigation.dispatch(StackActions.replace(LOGIN));
    } else {
      setPassword(false);
      showToast(ERROR_TOAST, response?.message);
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#EE685C', '#FFE4AE']} style={styles.gradient}>
        <Image
          source={require('../../assets/images/otpFrame.png')}
          style={styles.image}
        />
        <Text style={styles.enter}>Reset Your Password</Text>
        <Text style={styles.sent}>
          The Password must be different than before
        </Text>
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
          inputContainer={{width: '90%'}}
          containerStyle={styles.inputView}
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
          inputContainer={{width: '90%'}}
          containerStyle={styles.inputView}
        />
        <Space height={14} />
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
      </LinearGradient>
    </ScrollView>
  );
};

export default ResetPassword;
