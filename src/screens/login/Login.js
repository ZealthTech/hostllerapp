import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import {useFormik} from 'formik';
import {loginValidationSchema, signUpValidationSchema} from './helper';
import InputText from '../../components/inputText/InputText';
import Button from '../../components/button/Button';
import Animated, {
  FadeInUp,
  FadeInDown,
  FadeOutUp,
  FadeOutDown,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginRequest,
  registerUserRequest,
} from '../../redux/reducers/authenticationReducer';
import Space from '../../components/space/Space';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  FORGOT_PASSWORD,
  HOME_NAVIGATOR,
  OTP_VERIFICATION,
} from '../../navigation/routes';
import {getDataFromStorage} from '../../utils/storage';
import {REGISTER_DATA, TOKEN} from '../../utils/constants/constants';

const Login = () => {
  const route = useRoute();
  const {userData, targetRoute} = route?.params || {};
  const [loginView, setLoginView] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  console.log('user data ', route?.params);
  console.log('targetRoute ', targetRoute);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    loading,
    status = false,
    data,
    error,
    loginStatus,
  } = useSelector(state => state.authReducer);

  console.log('error ', error);
  console.log('data.... ', data);
  useEffect(() => {
    setLoginView(true);
    const fetchData = async () => {
      const _data = await getDataFromStorage(REGISTER_DATA); // Replace `TOKEN` with your actual key
      const token = await getDataFromStorage(TOKEN);
      console.log('token ', token);
      console.log('Fetched token:', _data);
    };

    fetchData();
  }, []);
  //navigate to otp verification screen if register successful
  useEffect(() => {
    console.log('63 ...');
    if (loginStatus) {
      navigation.reset({
        index: 0,
        routes: [{name: targetRoute}],
      });
    }
  }, [loginStatus, navigation, dispatch, data, targetRoute]);

  useEffect(() => {
    console.log('63 ...');
    if (status) {
      console.log('64 ...');
      navigation.navigate(OTP_VERIFICATION, {data: userData});
    }
  }, [status, navigation, dispatch, userData]);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const loginInitialValues = {
    email: '',
    password: '',
  };
  const registerUser = userInfo => {
    if (loginView) {
      console.log('login data', userInfo);
      dispatch(loginRequest(userInfo));
    } else {
      console.log('register data', userInfo);
      dispatch(registerUserRequest(userInfo));
      console.log('status ', status);
    }
  };

  const {handleChange, handleSubmit, errors, touched, values, setFieldValue} =
    useFormik({
      enableReinitialize: true,
      validationSchema: loginView
        ? loginValidationSchema
        : signUpValidationSchema,
      initialValues: loginView ? loginInitialValues : initialValues,
      onSubmit: inputValues => {
        console.log('96 ', initialValues);
        registerUser(inputValues);
      },
    });

  const handlePress = () => {
    if (!isToggling) {
      setIsToggling(true);
      setLoginView(prev => !prev);
      setTimeout(() => {
        setIsToggling(false);
      }, 500); // Delay to allow animation to complete
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#EE685C', '#FFE4AE']} style={styles.gradient}>
        <Image
          source={
            loginView
              ? require('../../assets/images/login_image.png')
              : require('../../assets/images/register_image.png')
          }
          style={styles.image}
        />
        <Text style={styles.signup}>{loginView ? 'Login' : 'Sign Up'}</Text>

        {loginView ? (
          <Animated.View
            // key="login" // Unique key for login view
            entering={FadeInUp.duration(500)} // Slide from bottom to top
            style={styles.inputContainer}>
            {/* <InputText
              placeholder={'Gmail id'}
              onChangeText={handleChange('email')}
              value={values.email}
              isErrorMsgRequired={touched.email && !!errors.email}
              error={errors.email}
              containerStyle={styles.inputView}
            /> */}
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
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() =>
                navigation?.navigate(FORGOT_PASSWORD, {userData: userData})
              }>
              <Text style={styles.forgotText}>Forget Password?</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View
            //  key="register" // Unique key for register view
            entering={FadeInDown.duration(500).delay(100)} // Slide from top to bottom
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
              placeholder={'Gmail id'}
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
        )}

        <Button
          title={loginView ? 'Login' : 'REGISTER'}
          onPress={handleSubmit}
          loading={loading}
          containerStyle={styles.btnContainer(loginView)}
          elevation={true}
        />

        <TouchableOpacity
          style={styles.touch}
          onPress={handlePress}
          disabled={isToggling}>
          <Text style={styles.account}>
            {loginView ? "Don't have an Account?" : 'Already have an Account?'}
          </Text>
          <Text style={styles.login}>{loginView ? 'Sign Up' : 'Login'}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default Login;
