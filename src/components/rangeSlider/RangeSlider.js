import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {BLACK_COLOR, GRAY_92, PURPLE} from '../../utils/colors/colors';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
} from '../../utils/styles/commonStyles';

const RangeSlider = props => {
  const {minPrice, maxPrice, onValueChange, min, max, currentValue} =
    props || {};

  return (
    <View>
      <Text style={styles.label}>Average Price per Night</Text>
      <View style={styles.rowView}>
        <View style={styles.view}>
          <Text style={styles.price}>Min</Text>
          <Text style={styles.priceValue}>{currentValue}</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.price}>Max</Text>
          <Text style={styles.priceValue}>{maxPrice}</Text>
        </View>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={minPrice} // Starting value
        maximumValue={maxPrice} // End value
        step={50} // Step value for increments
        value={currentValue}
        onValueChange={onValueChange}
        minimumTrackTintColor={GRAY_92} // Line color
        thumbTintColor={PURPLE}
      />
      <View style={styles.minView}>
        <Text style={styles.price}>{min}</Text>
        <Text style={styles.price}>{max}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 14,
    fontFamily: MONTSERRAT_BOLD,
    color: BLACK_COLOR,
  },
  slider: {marginTop: 10},
  minView: {flexDirection: 'row', justifyContent: 'space-between'},
  price: {color: BLACK_COLOR, fontFamily: MONTSERRAT_MEDIUM, fontSize: 12},
  rowView: {flexDirection: 'row', gap: 20},
  priceValue: {fontFamily: MONTSERRAT_BOLD, color: BLACK_COLOR},
  view: {
    borderWidth: 0.5,
    borderColor: GRAY_92,
    borderRadius: 15,
    paddingStart: 10,
    width: 110,
    paddingVertical: 5,
  },
});

export default RangeSlider;
