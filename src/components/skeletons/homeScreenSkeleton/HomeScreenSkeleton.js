import {View, Text, ScrollView, FlatList} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {styles} from './styles';
import {
  COLOR_GRAY_7F,
  ORANGE_DARK,
  ORANGE_MEDIUM,
} from '../../../utils/colors/colors';
import Space from '../../space/Space';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const HomeScreenSkeleton = () => {
  return (
    <View style={{marginHorizontal: 20}}>
      <ShimmerPlaceholder style={styles.banner} />
      <FlatList
        data={[1, 2, 3]}
        horizontal={true}
        renderItem={({item}) => <ShimmerPlaceholder style={styles.flat} />}
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        data={[1, 2, 3]}
        horizontal={true}
        renderItem={({item}) => <ShimmerPlaceholder style={styles.flat} />}
        showsHorizontalScrollIndicator={false}
      />
      <ShimmerPlaceholder style={styles.view} />
    </View>
  );
};

export default HomeScreenSkeleton;
