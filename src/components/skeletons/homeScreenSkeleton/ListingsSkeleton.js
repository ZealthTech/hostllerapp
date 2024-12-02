import {View, Text, FlatList} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {styles} from './styles';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const ListingsSkeleton = () => {
  return (
    <View>
      <FlatList
        data={[1, 2, 3]}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.listingFlat}>
            <ShimmerPlaceholder style={styles.listingView} />
            <ShimmerPlaceholder style={styles.item} />
            <ShimmerPlaceholder style={styles.item} />
          </View>
        )}
      />
    </View>
  );
};

export default ListingsSkeleton;
