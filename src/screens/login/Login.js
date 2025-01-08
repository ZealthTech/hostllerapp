import {Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import {useFormik} from 'formik';
import {loginValidationSchema} from './helper';
import InputText from '../../components/inputText/InputText';
import Button from '../../components/button/Button';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import Space from '../../components/space/Space';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {
  CART_SCREEN,
  FORGOT_PASSWORD,
  OTP_VERIFICATION,
  REGISTER_SCREEN,
} from '../../navigation/routes';
import {getDataFromStorage} from '../../utils/storage';
import {
  ERROR_TOAST,
  REGISTER_DATA,
  SUCCESS_TOAST,
  TOKEN,
} from '../../utils/constants/constants';
import {showToast} from '../../utils/constants/commonFunctions';
import {loginRequest, resetLoginState} from '../../redux/reducers/loginReducer';

const Login = () => {
  const route = useRoute();
  const {targetRoute, cartData, mealChart, pgId, fromCart} =
    route?.params || {};
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {loginStatus, message, loading, data} = useSelector(
    state => state.loginReducer,
  );

  useEffect(() => {
    const fetchData = async () => {
      const _data = await getDataFromStorage(REGISTER_DATA); // Replace `TOKEN` with your actual key
      //const token = await getDataFromStorage(TOKEN);
      const parsedData = _data ? JSON.parse(_data) : null;
      setUserData(parsedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (hasAttemptedLogin && !loading) {
      if (loginStatus) {
        showToast(SUCCESS_TOAST, message);
        // dispatch(resetLoginState());
        // navigation.navigate(targetRoute);
        if (fromCart) {
          navigation.pop();

          // Then, navigate to the CART_SCREEN with the required parameters
          navigation.navigate(CART_SCREEN, {
            cartData: cartData,
            mealChart: mealChart,
            pgId: pgId,
            fromLogin: true,
          });
        } else {
          console.log('akanksha called===', targetRoute);
          navigation.reset({
            index: 0,
            routes: [
              {
                name: targetRoute,
                params: {
                  fromLogin: true,
                },
              },
            ],
          });
        }
      } else {
        showToast(ERROR_TOAST, message || 'Login failed, please try again');
        // dispatch(resetLoginState());
      }
      setHasAttemptedLogin(false); // Reset after handling response
    }
  }, [
    loginStatus,
    loading,
    navigation,
    dispatch,
    message,
    hasAttemptedLogin,
    data,
    targetRoute,
    cartData,
    mealChart,
    pgId,
    fromCart,
  ]);

  const loginInitialValues = {
    phone: '',
    password: '',
  };
  const loginUser = userInfo => {
    dispatch(loginRequest(userInfo));
    setHasAttemptedLogin(true);
  };

  const {handleChange, handleSubmit, errors, touched, values, setFieldValue} =
    useFormik({
      enableReinitialize: true,
      validationSchema: loginValidationSchema,

      initialValues: loginInitialValues,
      onSubmit: inputValues => {
        loginUser(inputValues);
      },
    });

  const handlePress = () => {
    navigation.replace(REGISTER_SCREEN, {targetRoute: targetRoute});
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#EE685C', '#FFE4AE']} style={styles.gradient}>
        <Image
          source={require('../../assets/images/login_image.png')}
          style={styles.image}
        />
        <Text style={styles.signup}>{'Login'}</Text>

        <Animated.View
          entering={FadeInUp.duration(400).damping(50)} // Slide from top to bottom
          style={styles.inputContainer}>
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
              navigation?.navigate(FORGOT_PASSWORD, {
                userData: userData,
                targetRoute: targetRoute,
              })
            }>
            <Text style={styles.forgotText}>Forget Password?</Text>
          </TouchableOpacity>
        </Animated.View>

        <Button
          title={'Login'}
          onPress={handleSubmit}
          loading={loading}
          containerStyle={styles.btnContainer}
          elevation={true}
        />

        <TouchableOpacity style={styles.touch} onPress={handlePress}>
          <Text style={styles.account}>{"Don't have an Account?"}</Text>
          <Text style={styles.login}>{'Sign Up'}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default Login;
