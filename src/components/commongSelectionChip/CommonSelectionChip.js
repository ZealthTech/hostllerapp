import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  BLACK_COLOR,
  DARK_YELLOW,
  GRAY_92,
  GRAY_LIGHT,
  LIGHT_PURPLE,
  ORANGE_DARK,
  ORANGE_EXTRA_LIGHT,
  ORANGE_MEDIUM,
  PURPLE,
  YELLOW,
  YELLOW_LIGHT,
} from '../../utils/colors/colors';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import CustomSvg from '../customSvg/CustomSvg';
import {MulticolorStar, Star} from '../../assets';

const CommonSelectionChip = props => {
  const {data, selectedCategory, onPress, stars} = props || {};
  console.log('selectedCategory ', selectedCategory);
  return (
    <View style={styles.container}>
      {data?.map((item, index) => {
        const isSelected = selectedCategory?.includes?.(item?.title);
        return (
          <TouchableOpacity
            key={item?.id}
            style={[
              styles.extTch,
              selectedCategory === item?.title && styles.selectedButton,
              isSelected && styles.selectedButton,
              stars && styles.starsView(selectedCategory === item?.title),
            ]}
            onPress={() => onPress?.(item?.title)}>
            {stars && (
              <CustomSvg
                SvgComponent={
                  <MulticolorStar fill={ORANGE_DARK} height={16} width={16} />
                }
              />
            )}
            <Text
              style={[
                styles.extTxt,
                selectedCategory === item?.title && styles.selectedText,
                stars && styles.starsText(selectedCategory === item?.title),
              ]}>
              {item?.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CommonSelectionChip;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flexWrap: 'wrap'},
  extTch: {
    borderWidth: 0.5,
    borderColor: PURPLE,
    paddingHorizontal: 16,
    marginEnd: 8,
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extTxt: {
    color: PURPLE,
    fontFamily: MONTSERRAT_MEDIUM,
    fontSize: fontsSize.fs14,
  },
  selectedButton: {
    backgroundColor: LIGHT_PURPLE,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 10,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedText: {
    color: PURPLE,
    fontFamily: MONTSERRAT_SEMIBOLD,
  },
  imgView: {
    marginHorizontal: 25,
    marginBottom: 10,
  },
  starsView: selected => ({
    backgroundColor: selected ? '#FFF5EE' : GRAY_LIGHT,
    borderColor: selected ? ORANGE_DARK : GRAY_LIGHT,
  }),
  starsText: selected => ({color: BLACK_COLOR, marginTop: 3}),
});
