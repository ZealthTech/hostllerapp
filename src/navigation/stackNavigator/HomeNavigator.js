import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../../screens/homePage/HomePage';
import {HOME_PAGE, HOSTEL_LISTINGS} from '../routes';
import HostelListings from '../../screens/hostelListings/HostelListings';

const Stack = createStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HOME_PAGE}
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={HOSTEL_LISTINGS}
        component={HostelListings}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
