import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  BLACK_COLOR,
  GRAY_LIGHT,
  ORANGE_DARK,
} from '../../../utils/colors/colors';
import {MONTSERRAT_REGULAR} from '../../../utils/styles/commonStyles';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

const AnimatedLine = ({
  isVisible,
  duration,
  data,
  getFillWidth,
  title,
  rating,
}) => {
  // Using useAnimatedStyle directly in the component
  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isVisible ? 1 : 0, {duration}), // Fade in when isVisible is true
      transform: [
        {translateX: withTiming(isVisible ? 0 : -50, {duration})}, // Slide effect
      ],
    };
  }, [isVisible, duration]);

  return (
    <View style={styles.lineView}>
      <Text style={styles.name}>{title}</Text>
      <View style={styles.line}>
        <Animated.View
          style={[
            styles.filledLine,
            {width: getFillWidth(data?.Food)},
            animatedLineStyle,
          ]}
        />
      </View>
      <Text style={styles.ratings}>{rating}</Text>
    </View>
  );
};

export default AnimatedLine;
const styles = StyleSheet.create({
  lineView: {flexDirection: 'row', marginTop: 10, alignItems: 'center'},
  name: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_REGULAR,
    flex: 0.7,
  },
  line: {
    flex: 1,
    height: 8,
    backgroundColor: GRAY_LIGHT,
    borderRadius: 10,
    marginEnd: 5,
    overflow: 'hidden',
  },
  filledLine: {
    height: '100%',
    backgroundColor: ORANGE_DARK,
    borderRadius: 10,
  },
});
