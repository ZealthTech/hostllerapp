import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useRef} from 'react';
import {styles} from './styles';

const Categories = props => {
  const {level, data, onPress} = props || {};
  const flatRef = useRef();

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>{level}</Text>
      <FlatList
        ref={flatRef}
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={item?.name}
            activeOpacity={1}
            onPress={() => onPress?.(item?.type)}
            style={styles.tchView(index === 0)}>
            <ImageBackground source={item?.image} style={styles.image}>
              <Text style={styles.text}>{item?.name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;
