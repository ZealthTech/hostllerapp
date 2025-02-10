import {Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomSvg from '../customSvg/CustomSvg';
import LocationIcon from '../../assets/svg/location_pin.svg';
import SearchIcon from '../../assets/svg/search.svg';
import {
  BLACK_COLOR,
  GRAY_92,
  TEXT_COLOR,
  WHITE,
} from '../../utils/colors/colors';
import {
  fontsSize,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../utils/styles/commonStyles';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
const SearchView = props => {
  const {onPressSearchInput, containerStyle} = props || {};
  const [current, setCurrent] = useState(0);

  const searchPlaceholder = [
    'Search by name...',
    'Search by location...',
    'Search PG...',
    'Search Hostels...',
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % searchPlaceholder.length); // Cycle through the array
    }, 2800);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={onPressSearchInput}>
      <View style={styles.leftView}>
        <CustomSvg isClickable={false} SvgComponent={<LocationIcon />} />
        <Animated.Text
          key={current}
          style={styles.searchTxt}
          entering={FadeInDown.duration(0)}
          exiting={FadeOutUp.duration(0)}>
          {searchPlaceholder[current]}
        </Animated.Text>
      </View>
      <CustomSvg isClickable={false} SvgComponent={<SearchIcon />} />
    </Pressable>
  );
};

export default React.memo(SearchView);

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 50,
    elevation: 4,
    shadowColor: GRAY_92,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    borderRadius: 12,
    marginBottom: 5,
  },
  searchTxt: {
    color: TEXT_COLOR,
    fontFamily: MONTSERRAT_MEDIUM,
    marginStart: 10,
  },
  input: {
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: fontsSize.fs14,
    marginHorizontal: 8,
    color: BLACK_COLOR,
    flex: 1,
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
