import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {styles} from './styles';
import Video from 'react-native-video';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
import Button from '../../components/button/Button';
import {StackActions, useNavigation} from '@react-navigation/native';
import {HOME_NAVIGATOR} from '../../navigation/routes';
import {useDispatch} from 'react-redux';
import {loginRequest} from '../../redux/reducers/authenticationReducer';
import {setDataToStorage} from '../../utils/storage';

const OnboardingPage = () => {
  const ref = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const completeOnboarding = async () => {
      await setDataToStorage('isFirstTimeUser', 'true');
    };
    completeOnboarding();
  }, []);

  const navigateToHome = () => {
    navigation.dispatch(StackActions.replace(HOME_NAVIGATOR));
  };
  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.delay(400).duration(800)}>
        <Video
          ref={ref}
          style={styles.video}
          source={require('../../assets/images/slider_video.mp4')}
          resizeMode="cover"
          paused={false}
          repeat={true}
        />
      </Animated.View>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Button
          title="Get Started"
          containerStyle={styles.btn}
          onPress={navigateToHome}
        />
      </Animated.View>
      <Pressable style={styles.pressable} onPress={navigateToHome}>
        <Text style={styles.pressableTxt}>Skip</Text>
      </Pressable>
    </View>
  );
};

export default OnboardingPage;
