import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {
  getDeviceHeight,
  getDeviceWidth,
} from '../../utils/constants/commonFunctions';
import {styles} from './styles';

const Categories = props => {
  const {level, data, onPress} = props || {};
  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>{level}</Text>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={item?.name}
            activeOpacity={1}
            onPress={() => onPress?.(item?.type)}
            style={styles.tchView(index === 0)}>
            <Image
              source={item?.image}
              style={{
                height: getDeviceHeight() * 0.17,
                width: getDeviceWidth() * 0.3,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;
