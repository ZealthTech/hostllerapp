import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {StackActions, useNavigation} from '@react-navigation/native';
import {HOME_NAVIGATOR, ONBOARDING_PAGE} from '../../navigation/routes';
import {getDataFromStorage} from '../../utils/storage';

const Splash = () => {
  const navigation = useNavigation();

  // Define shared values for width and height
  const imageWidth = useSharedValue(getDeviceWidth() * 0.5);
  const imageHeight = useSharedValue(getDeviceHeight() * 0.1);

  useEffect(() => {
    // Animate the size of the image
    imageWidth.value = withTiming(getDeviceWidth() * 0.74, {duration: 2500});
    imageHeight.value = withTiming(getDeviceHeight() * 0.13, {duration: 2500});

    const checkOnboardingStatus = async () => {
      const isFirstTimeUser = await getDataFromStorage('isFirstTimeUser');
      console.log('isFirstTimeUser ', isFirstTimeUser);
      if (isFirstTimeUser === null) {
        navigation.dispatch(StackActions.replace(ONBOARDING_PAGE));
      } else {
        navigation.dispatch(StackActions.replace(HOME_NAVIGATOR));
      }
    };
    const time = setTimeout(() => {
      checkOnboardingStatus();
    }, 3000);
    return () => clearTimeout(time);
  }, [navigation, imageWidth, imageHeight]);

  // Define the animated style for the image
  const animatedStyle = useAnimatedStyle(() => ({
    width: imageWidth.value,
    height: imageHeight.value,
  }));

  return (
    <LinearGradient colors={['#FFE4AE', '#EE685C']} style={styles.gradient}>
      {/* Animated Image */}
      <Animated.Image
        source={require('../../assets/images/splash_image.png')}
        style={[styles.img, animatedStyle]}
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
  img: {
    resizeMode: 'contain',
  },
});
