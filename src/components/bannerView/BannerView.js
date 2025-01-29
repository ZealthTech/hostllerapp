import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import SearchView from '../searchView/SearchView';
import Animated, {FadeInLeft, FadeInRight} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

const BannerView = props => {
  const {data, onPressSearchInput} = props || {};
  return (
    <View style={styles.container}>
      <View style={styles.upperView}>
        <Animated.View
          style={styles.textView}
          entering={FadeInLeft.duration(500)}>
          <Text style={styles.title}>STAY COOL</Text>
          <Text style={styles.title}>STAY COMFY</Text>
          <Text style={styles.content}>{data?.title}</Text>
        </Animated.View>
        <Animated.View entering={FadeInRight.duration(500)}>
          <FastImage source={{uri: data?.image}} style={styles.image} />
        </Animated.View>
      </View>
      <SearchView onPressSearchInput={onPressSearchInput} />
    </View>
  );
};

export default BannerView;
