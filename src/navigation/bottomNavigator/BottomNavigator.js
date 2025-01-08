import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../../screens/homePage/HomePage';
import Bookings from '../../screens/myBookings/Bookings';
import ExploreIcon from '../../assets/svg/homeExplore.svg';
import MyBookingsIcon from '../../assets/svg/myBooking.svg';
import ProfileIcon from '../../assets/svg/profile.svg';
import SupportIcon from '../../assets/svg/support.svg';
import {GRAY_LIGHT_CB, PURPLE, WHITE} from '../../utils/colors/colors';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../utils/styles/commonStyles';
import {Text} from 'react-native';
import LeadPage from '../../screens/leadPage/LeadPage';
import ProfileScreen from '../../screens/profileScreen/ProfileScreen';
import {useRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

// Function to render icons
const TabIconWithLabel = ({focused, Icon}) => {
  return <Icon fill={focused ? WHITE : GRAY_LIGHT_CB} />;
};

const TabNavigator = () => {
  const route = useRoute();
  const {fromLogin} = route.params || {}; // Get params passed to HOME_NAVIGATOR
  console.log('route30', route);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: PURPLE,
          height: 84,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: MONTSERRAT_REGULAR,
          marginTop: 5,
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? WHITE : GRAY_LIGHT_CB,
              fontSize: 12,
              fontFamily: focused ? MONTSERRAT_BOLD : MONTSERRAT_MEDIUM,
              marginVertical: 5,
              width: '120%',
              textAlign: 'center',
            }}>
            {route.name}
          </Text>
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
        component={LeadPage}
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
