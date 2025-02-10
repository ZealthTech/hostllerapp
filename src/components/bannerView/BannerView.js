import {View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import Animated, {
  runOnJS,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {getDeviceWidth} from '../../utils/constants/commonFunctions';
import PaginationDots from '../paginationDots/PaginationDots';

const BannerView = props => {
  const {data} = props || {};
  const ref = useAnimatedRef();
  const interval = useRef();
  const scrollX = useSharedValue(0);
  const offset = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [bannerData, setBannerData] = useState(data);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const width = getDeviceWidth();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollX.value = e.contentOffset.x;
      const rawIndex = Math.round(
        e.contentOffset.x / e.layoutMeasurement.width,
      );
      const boundedIndex = rawIndex % data.length; // Ensure it wraps to the length of the initial data

      runOnJS(setPaginationIndex)(boundedIndex); // Update pagination index in the state
    },
    onMomentumEnd: e => {
      //without this line when user scroll list and after this if list autoplay it will show occurred behavior like go in reverse or play fast etc.
      offset.value = e.contentOffset.x;
    },
  });

  // Autoplay Logic
  useEffect(() => {
    if (isAutoPlay) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width;
      }, 3000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, offset, width]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  const renderItem = ({item}) => (
    <View style={styles.itemView}>
      <FastImage
        source={{uri: item?.image}}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={ref}
        data={bannerData}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={onScrollHandler}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        onScrollBeginDrag={() => {
          //if user scrolling list by itself autoplay is off otherwise on
          setIsAutoPlay(false);
        }}
        onScrollEndDrag={() => setIsAutoPlay(true)}
        onEndReached={() => setBannerData(prev => [...prev, ...data])} // Looping
      />
      <PaginationDots data={data} paginationIndex={paginationIndex} />
    </View>
  );
};

export default BannerView;
