import {Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ERROR_TOAST, SUCCESS_TOAST} from '../../utils/constants/constants';
import {useFormik} from 'formik';
import {signUpValidationSchema} from '../login/helper';
import {LOGIN, OTP_VERIFICATION} from '../../navigation/routes';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeInUp} from 'react-native-reanimated';
import InputText from '../../components/inputText/InputText';
import Space from '../../components/space/Space';
import Button from '../../components/button/Button';
import {
  registerUserRequest,
  resetRegisterState,
} from '../../redux/reducers/registerReducer';
import {showToast} from '../../utils/constants/commonFunctions';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {targetRoute} = route?.params || {};
  const [hasAttemptedRegister, setHasAttemptedRegister] = useState(false);
  const {loading, status, message, data} = useSelector(
    state => state.registerReducer,
  );

  useEffect(() => {
    if (hasAttemptedRegister && !loading) {
      if (status) {
        showToast(SUCCESS_TOAST, message);
        navigation.navigate(OTP_VERIFICATION, {
          data: data,
          values: values,
          targetRoute: targetRoute,
        });
      } else {
        showToast(ERROR_TOAST, message || 'Register Failed, please try again');
      }
      setHasAttemptedRegister(false); // Reset after handling response
      dispatch(resetRegisterState());
    }
  }, [
    status,
    loading,
    navigation,
    dispatch,
    message,
    hasAttemptedRegister,
    data,
    values,
    targetRoute,
  ]);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const registerUser = userInfo => {
    dispatch(registerUserRequest(userInfo));
    setHasAttemptedRegister(true);
  };

  const {handleChange, handleSubmit, errors, touched, values} = useFormik({
    enableReinitialize: true,
    validationSchema: signUpValidationSchema,
    initialValues: initialValues,
    onSubmit: inputValues => {
      registerUser(inputValues);
    },
  });

  const handlePress = () => {
    navigation.replace(LOGIN);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#EE685C', '#FFE4AE']} style={styles.gradient}>
        <Image
          source={require('../../assets/images/register_image.png')}
          style={styles.image}
        />
        <Text style={styles.signup}>{'Sign Up'}</Text>
        <Animated.View
          entering={FadeInUp.duration(400).damping(50)} // Slide from top to bottom
          style={styles.inputContainer}>
          <InputText
            placeholder={'Name'}
            onChangeText={handleChange('name')}
            value={values.name}
            isErrorMsgRequired={touched.name && !!errors.name}
            error={errors.name}
            containerStyle={styles.inputView}
          />
          <Space height={14} />
          <InputText
            placeholder={'Email id'}
            onChangeText={handleChange('email')}
            value={values.email}
            isErrorMsgRequired={touched.email && !!errors.email}
            error={errors.email}
            containerStyle={styles.inputView}
            secureTextEntry={false}
          />
          <Space height={14} />
          <InputText
            placeholder={'Mobile Number'}
            onChangeText={text => {
              const numericText = text.replace(/[^0-9]/g, '');
              handleChange('phone')(numericText);
            }}
            keyboardType={'number-pad'}
            value={values.phone}
            isErrorMsgRequired={touched.phone && !!errors.phone}
            error={errors.phone}
            maxLength={10}
            containerStyle={styles.inputView}
          />
          <Space height={14} />
          <InputText
            placeholder={'Password'}
            onChangeText={handleChange('password')}
            value={values.password}
            isErrorMsgRequired={touched.password && !!errors.password}
            error={errors.password}
            passwordIcon={true}
            secureTextEntry={true}
            containerStyle={styles.inputView}
          />
          <Space height={14} />
          <InputText
            placeholder={'Confirm Password'}
            onChangeText={handleChange('confirmPassword')}
            value={values.confirmPassword}
            passwordIcon={true}
            isErrorMsgRequired={
              touched.confirmPassword && !!errors.confirmPassword
            }
            error={errors.confirmPassword}
            secureTextEntry={true}
            containerStyle={styles.inputView}
          />
        </Animated.View>

        <Button
          title={'REGISTER'}
          onPress={handleSubmit}
          loading={loading}
          containerStyle={styles.btnContainer}
          elevation={true}
        />

        <TouchableOpacity style={styles.touch} onPress={handlePress}>
          <Text style={styles.account}>{'Already have an Account?'}</Text>
          <Text style={styles.login}>{'Login'}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default RegisterScreen;
