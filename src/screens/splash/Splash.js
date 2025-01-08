import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';
import Animated, {FadeIn} from 'react-native-reanimated';
import {StackActions, useNavigation} from '@react-navigation/native';
import {HOME_NAVIGATOR, ONBOARDING_PAGE} from '../../navigation/routes';
import {getDataFromStorage} from '../../utils/storage';

const Splash = () => {
  console.log('Splash screen loaded');
  const navigation = useNavigation();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const isFirstTimeUser = await getDataFromStorage('isFirstTimeUser');
      if (isFirstTimeUser === null) {
        console.log('isFirstTimeUser27 ', isFirstTimeUser);
        // First-time user, navigate to Onboarding
        navigation.dispatch(StackActions.replace(ONBOARDING_PAGE));
      } else {
        // Returning user, navigate to Home
        console.log('isFirstTimeUser32 ', isFirstTimeUser);
        navigation.dispatch(StackActions.replace(HOME_NAVIGATOR));
      }
    };
    setTimeout(() => {
      checkOnboardingStatus();
    }, 3000);
  }, [navigation]);

  return (
    <LinearGradient colors={['#FFE4AE', '#EE685C']} style={styles.gradient}>
      {/* You can add other components here if needed */}
      <Animated.Image
        source={require('../../assets/images/splash_image.png')}
        style={styles.img}
        entering={FadeIn.duration(600)}
      />
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  img: {
    width: getDeviceWidth() * 0.8,
    height: getDeviceHeight() * 0.15,
    padding: 10,
  },
});
