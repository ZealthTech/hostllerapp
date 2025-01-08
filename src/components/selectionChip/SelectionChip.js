import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {LIGHT_PURPLE, PURPLE} from '../../utils/colors/colors';
import {
  fontsSize,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';

const SelectionChip = props => {
  const {data, selectedCategory, renderImages} = props || {};
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.imgView}>
        {data?.map((item, index) => (
          <TouchableOpacity
            key={item?.id}
            style={[
              styles.extTch,
              selectedCategory === item?.title && styles.selectedButton,
            ]}
            onPress={() => renderImages?.(item?.title)}>
            <Text
              style={[
                styles.extTxt,
                selectedCategory === 'Exterior' && styles.selectedText,
              ]}>
              {item?.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SelectionChip;

const styles = StyleSheet.create({
  extTch: {
    borderWidth: 0.5,
    borderColor: PURPLE,
    paddingHorizontal: 16,
    marginEnd: 8,
    paddingVertical: 5,
    borderRadius: 20,
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
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 5,
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
});
