import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';
import Animated, {FadeIn} from 'react-native-reanimated';
import {StackActions, useNavigation} from '@react-navigation/native';
import {
  HOME_NAVIGATOR,
  HOME_PAGE,
  LOGIN,
  ONBOARDING_PAGE,
} from '../../navigation/routes';

const Splash = () => {
  console.log('Splash screen loaded');
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace(HOME_NAVIGATOR));
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
