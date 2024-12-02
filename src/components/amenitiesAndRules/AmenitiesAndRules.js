import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';

const AmenitiesAndRules = props => {
  const {data, title} = props || {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image source={{uri: item?.image}} style={styles.icon} />
            <Text style={styles.text}>{item?.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AmenitiesAndRules;
