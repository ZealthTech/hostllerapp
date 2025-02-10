import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GRAY_LIGHT,
  GRAY_LIGHT_CB,
  LIGHT_PURPLE,
  LIGHT_PURPLE_B1,
  ORANGE_DARK,
  ORANGE_EXTRA_LIGHT,
  PURPLE,
} from '../../utils/colors/colors';

const PaginationDots = ({data, paginationIndex}) => {
  return (
    <View style={styles.dotView}>
      {data?.map((_, index) => {
        return (
          <View
            style={[
              styles.dot,
              paginationIndex === index && styles.activeIndex,
            ]}
            key={index}
          />
        );
      })}
    </View>
  );
};

export default PaginationDots;

const styles = StyleSheet.create({
  dot: {height: 8, width: 8, backgroundColor: GRAY_LIGHT_CB, borderRadius: 18},
  dotView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
  activeIndex: {height: 12, width: 12, backgroundColor: LIGHT_PURPLE_B1},
});
