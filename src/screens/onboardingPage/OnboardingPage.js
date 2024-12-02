import {View, Text, Pressable} from 'react-native';
import React, {useRef} from 'react';
import {styles} from './styles';
import Video from 'react-native-video';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
import Button from '../../components/button/Button';
import {StackActions, useNavigation} from '@react-navigation/native';
import {HOME_NAVIGATOR} from '../../navigation/routes';
import {useDispatch} from 'react-redux';
import {loginRequest} from '../../redux/reducers/authenticationReducer';

const OnboardingPage = () => {
  const ref = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const testConfiguration = () => {
    const body = {
      phone: 8574014902,
      password: 'Shiv@123',
    };
    dispatch(loginRequest(body));
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
          onPress={testConfiguration}
        />
      </Animated.View>
      <Pressable
        style={styles.pressable}
        onPress={() =>
          navigation.dispatch(StackActions.replace(HOME_NAVIGATOR))
        }>
        <Text style={styles.pressableTxt}>Skip</Text>
      </Pressable>
    </View>
  );
};

export default OnboardingPage;
