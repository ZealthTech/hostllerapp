import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';

const AmenitiesAndRules = props => {
  const {data, title} = props || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.contentContainer}>
        {data?.map((item, index) => (
          <View style={styles.itemContainer} key={item.title}>
            <Image source={{uri: item?.image}} style={styles.icon} />
            <Text style={styles.text}>{item?.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AmenitiesAndRules;
