import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  fontsSize,
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../../utils/styles/commonStyles';
import CustomSvg from '../../../components/customSvg/CustomSvg';
import {MulticolorStar, Star} from '../../../assets';
import {
  BLACK_COLOR,
  GRAY_92,
  GRAY_LIGHT,
  GRAY_LIGHT_CB,
  ORANGE_DARK,
  WHITE,
  YELLOW_LIGHT,
} from '../../../utils/colors/colors';
import {getStarColor} from '../styles';
import Animated, {
  FadeInLeft,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import AnimatedLine from '../reviewLineAnimation/ReviewAnimatedLine';

const Reviews = props => {
  const {data, rating, review, onPressWriteReview, ref, isVisible, onLayout} =
    props || {};
  console.log('ref31 ', ref);

  const getFillWidth = value => {
    const maxRating = 10;
    return `${(value / maxRating) * 100}%`; // Returns width as a % string for eg. '80%'
  };
  console.log('is visible ', isVisible);
  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text style={styles.reviewTxt}>Reviews</Text>
      <View style={styles.ratingView}>
        <View style={styles.ratingsView}>
          <CustomSvg
            SvgComponent={<MulticolorStar fill={getStarColor(rating)} />}
            imgStyle={styles.img}
          />
          <Text style={styles.ratingCount}>{rating}</Text>
          <Text style={styles.review}>({review})</Text>
        </View>
        <Pressable style={styles.writeReview} onPress={onPressWriteReview}>
          <Text style={styles.reviewText}>Write a Review</Text>
        </Pressable>
      </View>
      {/* <View style={styles.lineView}>
        <Text style={styles.name}>Location</Text>
        <Animated.View style={[styles.line, animatedLineStyle(300)]}>
          <Animated.View
            style={[styles.filledLine, {width: getFillWidth(data?.Location)}]}
          />
        </Animated.View>
        <Text style={styles.ratings}>{data?.Location}</Text>
      </View> */}
      <AnimatedLine
        title="Food"
        isVisible={isVisible}
        duration={400}
        data={data}
        getFillWidth={() => getFillWidth(data?.Food)}
        rating={data?.Food}
      />
      <AnimatedLine
        title="Location"
        isVisible={isVisible}
        duration={500}
        data={data}
        getFillWidth={() => getFillWidth(data?.Location)}
        rating={data?.Location}
      />
      <AnimatedLine
        title="Staff Behaviour"
        isVisible={isVisible}
        duration={600}
        data={data}
        getFillWidth={() => getFillWidth(data?.Staff_Behaviour)}
        rating={data?.Staff_Behaviour}
      />
      <AnimatedLine
        title="Cleanliness"
        isVisible={isVisible}
        duration={700}
        data={data}
        getFillWidth={() => getFillWidth(data?.Cleanlness)}
        rating={data?.Cleanlness}
      />
      <AnimatedLine
        title="Amenities"
        isVisible={isVisible}
        duration={750}
        data={data}
        getFillWidth={() => getFillWidth(data?.Amenities)}
        rating={data?.Amenities}
      />
      {/* <View style={styles.lineView}>
        <Text style={styles.name}>Staff Behaviour</Text>
        <Animated.View style={[styles.line, animatedLineStyle(500)]}>
          <Animated.View
            style={[
              styles.filledLine,
              {width: getFillWidth(data?.Staff_Behaviour)},
            ]}
          />
        </Animated.View>
        <Text style={styles.ratings}>
          {parseFloat(data?.Staff_Behaviour?.toFixed(1))}
        </Text>
      </View> */}
      {/* <View style={styles.lineView}>
        <Text style={styles.name}>Cleanliness</Text>
        <Animated.View style={[styles.line, animatedLineStyle(550)]}>
          <Animated.View
            style={[styles.filledLine, {width: getFillWidth(data?.Cleanlness)}]}
          />
        </Animated.View>
        <Text style={styles.ratings}>
          {parseFloat(data?.Cleanlness?.toFixed(1))}
        </Text>
      </View>
      <View style={styles.lineView}>
        <Text style={styles.name}>Amenities</Text>
        <Animated.View style={[styles.line, animatedLineStyle(650)]}>
          <Animated.View
            style={[styles.filledLine, {width: getFillWidth(data?.Amenities)}]}
          />
        </Animated.View>
        <Text style={styles.ratings}>
          {parseFloat(data?.Amenities?.toFixed(1))}
        </Text>
      </View> */}
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  reviewTxt: {fontSize: fontsSize.fs16, fontFamily: MONTSERRAT_SEMIBOLD},
  container: {paddingTop: 10, paddingLeft: 10},
  ratingView: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 5,
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ratingCount: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_BOLD,
    fontSize: fontsSize.fs16,
  },
  review: {
    fontFamily: MONTSERRAT_REGULAR,
    color: BLACK_COLOR,
    fontSize: fontsSize.fs16,
  },
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

  ratings: {
    fontFamily: MONTSERRAT_REGULAR,
    color: BLACK_COLOR,
    flex: 0.2,
  },
  img: {alignItems: 'flex-start'},
  ratingsView: {flexDirection: 'row', alignItems: 'center', gap: 8},
  writeReview: {
    backgroundColor: ORANGE_DARK,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 20,
  },
  reviewText: {color: WHITE, fontFamily: MONTSERRAT_SEMIBOLD},
});
