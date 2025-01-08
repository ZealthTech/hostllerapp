import {View, Text, Image, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import {HOME_NAVIGATOR, HOME_PAGE} from '../../navigation/routes';
import Button from '../../components/button/Button';
import {StackActions} from '@react-navigation/native';

const SuccessScreen = navigation => {
  useEffect(() => {
    // Handle the back button press
    console.log('10');
    const backAction = () => {
      // Navigate to HOME_SCREEN when back is pressed
      navigation.navigation.dispatch(StackActions.replace(HOME_NAVIGATOR));
      return true; // Prevent default back behavior
    };

    // Add the event listener for the back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/succes.png')}
        style={styles.image}
      />
      <Text style={styles.bookText}>Booking successfully</Text>
      <Button
        title="Go To Home"
        elevation={true}
        containerStyle={styles.button}
        textStyle={styles.textStyle}
        onPress={() =>
          navigation.navigation.dispatch(StackActions.replace(HOME_NAVIGATOR))
        }
      />
    </View>
  );
};

export default SuccessScreen;
