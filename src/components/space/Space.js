import {View} from 'react-native';
import React from 'react';

const Space = props => {
  const {height, width} = props || {};
  return <View style={{height: height, width: width}} />;
};

export default Space;
