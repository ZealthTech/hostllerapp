import {View, Text} from 'react-native';
import React from 'react';
import CustomSvg from '../../components/customSvg/CustomSvg';
import MyIcon from '../../assets/svg/homeExplore.svg';
const Bookings = () => {
  return (
    <View>
      <CustomSvg SvgComponent={<MyIcon />} />
    </View>
  );
};

export default Bookings;
