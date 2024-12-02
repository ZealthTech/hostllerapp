import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import SearchView from '../searchView/SearchView';

const BannerView = props => {
  const {data} = props || {};
  return (
    <View style={styles.container}>
      <View style={styles.upperView}>
        <View style={styles.textView}>
          <Text style={styles.title}>STAY COOL</Text>
          <Text style={styles.title}>STAY COMFY</Text>
          <Text style={styles.content}>{data?.title}</Text>
        </View>
        <Image source={{uri: data?.image}} style={styles.image} />
      </View>
      <SearchView />
    </View>
  );
};

export default BannerView;
