import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  BOOKING_DETAILS,
  BOOKING_DETAILS_SCREEN,
  BOOKING_SUCCESS_SCREEN,
  CART_SCREEN,
  CHOOSE_ROOM,
  FORGOT_PASSWORD,
  HOME_NAVIGATOR,
  HOSTEL_LISTINGS,
  KYC_DETAILS_SCREEN,
  LEADS_SCREEN,
  LISTINGS_DETAILS,
  LOGIN,
  ONBOARDING_PAGE,
  OTP_VERIFICATION,
  PRIVACY_POLICY,
  PROFILE_SCREEN,
  REGISTER_SCREEN,
  RESET_PASSWORD_SCREEN,
  SEARCH_SCREEN,
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
import RegisterScreen from '../screens/registerScreen/RegisterScreen';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';
import SearchScreen from '../screens/searchScreen/SearchScreen';
import BookingDetails from '../screens/bookingDetails/BookingDetails';
import LeadPage from '../screens/leadPage/LeadPage';
import KycDetails from '../screens/kycDetails/KycDetails';
import SuccessScreen from '../screens/successScreen/SuccessScreen';
import HomePage from '../screens/homePage/HomePage';
import PrivacyPolicy from '../screens/privacyPolicy/PrivacyPolicy';
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
        <Stack.Screen
          name={REGISTER_SCREEN}
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={PROFILE_SCREEN}
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SEARCH_SCREEN}
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={BOOKING_DETAILS_SCREEN}
          component={BookingDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={LEADS_SCREEN}
          component={LeadPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={KYC_DETAILS_SCREEN}
          component={KycDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={BOOKING_SUCCESS_SCREEN}
          component={SuccessScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Explore"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={PRIVACY_POLICY}
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
