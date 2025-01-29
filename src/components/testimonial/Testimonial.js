import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import {stripHTMLTags} from '../../utils/constants/commonFunctions';
import {styles} from './styles';

const Testimonial = props => {
  const {data, handleScroll, currentIndex} = props || {};
  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>Testimonial</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.testId}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({item}) => {
          const responseWithHTML = item?.description;
          const plainText = stripHTMLTags(responseWithHTML);
          return (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Image source={{uri: item.image}} style={styles.image} />
                <View style={styles.textContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.designation}>({item.designation})</Text>
                  <Text style={styles.content} numberOfLines={5}>
                    {plainText}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        snapToAlignment="center"
      />
      <View style={styles.pagination}>
        {data?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Testimonial;
