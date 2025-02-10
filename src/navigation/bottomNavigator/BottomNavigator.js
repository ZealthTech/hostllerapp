import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../../screens/homePage/HomePage';
import Bookings from '../../screens/myBookings/Bookings';
import ExploreIcon from '../../assets/svg/homeExplore.svg';
import MyBookingsIcon from '../../assets/svg/myBooking.svg';
import ProfileIcon from '../../assets/svg/profile.svg';
import SupportIcon from '../../assets/svg/support.svg';
import {
  BLACK_COLOR,
  LIGHT_PURPLE,
  PURPLE,
  WHITE,
} from '../../utils/colors/colors';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../utils/styles/commonStyles';
import {StyleSheet, Text, View} from 'react-native';
import ProfileScreen from '../../screens/profileScreen/ProfileScreen';
import {useRoute} from '@react-navigation/native';
import HelpAndSupport from '../../screens/helpAndSupport/HelpAndSupport';

const Tab = createBottomTabNavigator();

// Function to render icons
const TabIconWithLabel = ({focused, Icon}) => {
  return (
    <View style={styles.iconView(focused)}>
      <Icon fill={focused ? PURPLE : BLACK_COLOR} height={24} width={24} />
    </View>
  );
};

const TabNavigator = () => {
  const route = useRoute();
  const {fromLogin} = route.params || {}; // Get params passed to HOME_NAVIGATOR
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: WHITE,
          height: 88,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderColor: WHITE,
          elevation: 5,
          shadowColor: PURPLE,
          shadowOpacity: 0.3,
          shadowRadius: 5,
          shadowOffset: {height: 2, width: 0},
        },
        tabBarLabelStyle: {
          fontFamily: MONTSERRAT_REGULAR,
          marginTop: 5,
        },
        tabBarLabel: ({focused}) => (
          <Text style={styles.label(focused)}>{route.name}</Text>
        ),
        headerShown: false,
      })}>
      <Tab.Screen
        name="Explore"
        component={HomePage}
        initialParams={{fromLogin}} // Pass params to HomePage
        options={{
          tabBarIcon: ({focused}) => (
            <TabIconWithLabel focused={focused} Icon={ExploreIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="My Bookings"
        component={Bookings}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIconWithLabel focused={focused} Icon={MyBookingsIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="Support"
        component={HelpAndSupport}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIconWithLabel focused={focused} Icon={SupportIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIconWithLabel focused={focused} Icon={ProfileIcon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
const styles = StyleSheet.create({
  iconView: focused => ({
    backgroundColor: focused ? LIGHT_PURPLE : WHITE,
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 20,
  }),
  label: focused => ({
    color: focused ? PURPLE : BLACK_COLOR,
    fontSize: 12,
    fontFamily: focused ? MONTSERRAT_BOLD : MONTSERRAT_MEDIUM,
    marginVertical: 5,
    width: '120%',
    textAlign: 'center',
  }),
});
