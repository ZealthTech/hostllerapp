import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {MulticolorStar} from '../../assets';
import {
  BLACK_COLOR,
  GRAY_LIGHT_CB,
  ORANGE_DARK,
} from '../../utils/colors/colors';
import {
  fontsSize,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';

const StarView = props => {
  const {reviewFor, handleStarPress, selectedRating} = props || {};
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={styles.row}>
      <Text style={styles.text}>{reviewFor}</Text>
      {stars?.map((item, index) => (
        <CustomSvg
          SvgComponent={
            <MulticolorStar
              height={26}
              width={26}
              isClickable={true}
              fill={index < selectedRating ? ORANGE_DARK : GRAY_LIGHT_CB}
              onPress={() => handleStarPress(index + 1)}
            />
          }
        />
      ))}
    </View>
  );
};

export default StarView;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
    color: BLACK_COLOR,
    flex: 0.8,
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: fontsSize.fs14,
  },
});
