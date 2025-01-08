import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import CustomSvg from '../customSvg/CustomSvg';
import LocationIcon from '../../assets/svg/location_pin.svg';
import SearchIcon from '../../assets/svg/search.svg';
import {BLACK_COLOR, TEXT_COLOR, WHITE} from '../../utils/colors/colors';
import InputText from '../inputText/InputText';
import {
  fontsSize,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../utils/styles/commonStyles';
import {isAndroid} from '../../utils/constants/commonFunctions';
const SearchView = ({onPressSearchInput, containerStyle, placeholder}) => {
  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={onPressSearchInput}>
      <View style={styles.leftView}>
        <CustomSvg isClickable={false} SvgComponent={<LocationIcon />} />
        <Text style={styles.searchTxt}>{placeholder}</Text>
      </View>
      <CustomSvg isClickable={false} SvgComponent={<SearchIcon />} />
    </Pressable>
  );
};

export default SearchView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Vertically center all items
    justifyContent: 'space-between', // Space between the input and search icon
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 14,
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
