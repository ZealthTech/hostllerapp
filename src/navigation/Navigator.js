import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CART_SCREEN,
  CHOOSE_ROOM,
  FORGOT_PASSWORD,
  HOME_NAVIGATOR,
  HOSTEL_LISTINGS,
  LISTINGS_DETAILS,
  LOGIN,
  ONBOARDING_PAGE,
  OTP_VERIFICATION,
  RESET_PASSWORD_SCREEN,
  SPLASH_SCREEN,
} from './routes';
import Splash from '../screens/splash/Splash';
import Login from '../screens/login/Login';
import OnboardingPage from '../screens/onboardingPage/OnboardingPage';
import TabNavigator from './bottomNavigator/BottomNavigator';
import HostelListings from '../screens/hostelListings/HostelListings';
import ListingDetails from '../screens/listingDetails/ListingDetails';
import OtpVerification from '../screens/optVerification/OtpVerification';
import ForgotPassword from '../screens/forgotPassword/ForgotPassword';
import ChooseRoom from '../screens/chooseRoom/ChooseRoom';
import ResetPassword from '../screens/resetPassword/ResetPassword';
import CartScreen from '../screens/cartScreen/CartScreen';
const Stack = createStackNavigator();
const Navigator = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={SPLASH_SCREEN}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={SPLASH_SCREEN}
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={LOGIN}
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={ONBOARDING_PAGE}
          component={OnboardingPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={HOME_NAVIGATOR} component={TabNavigator} />
        <Stack.Screen
          name={HOSTEL_LISTINGS}
          component={HostelListings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={LISTINGS_DETAILS}
          component={ListingDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={OTP_VERIFICATION}
          component={OtpVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={FORGOT_PASSWORD}
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RESET_PASSWORD_SCREEN}
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={CHOOSE_ROOM}
          component={ChooseRoom}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={CART_SCREEN}
          component={CartScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
