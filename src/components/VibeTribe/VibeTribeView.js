import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomSvg from '../customSvg/CustomSvg';
import {Building, Garden, Road, Temple} from '../../assets';
import {BLACK_COLOR, LIGHT_PURPLE, PURPLE} from '../../utils/colors/colors';
import Space from '../space/Space';
import {
  fontsSize,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import Button from '../button/Button';

const VibeTribeView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Vibe, Your Tribe</Text>
      <Text style={styles.subTitle}>
        Share the journey, and turn roommates into lifelong connections
      </Text>
      <View style={styles.categoryView}>
        <View style={styles.imageView}>
          <CustomSvg SvgComponent={<Road />} />
          <Text style={styles.road}>Boring Road</Text>
        </View>
        <View style={styles.imageView}>
          <CustomSvg SvgComponent={<Building />} />
          <Text style={styles.road}>Kankrbhag Colony</Text>
        </View>
      </View>
      <View style={styles.categoryView}>
        <View style={styles.imageView}>
          <CustomSvg SvgComponent={<Temple />} />
          <Text style={styles.road}>Patna University</Text>
        </View>
        <View style={styles.imageView}>
          <CustomSvg SvgComponent={<Garden />} />
          <Text style={styles.road}>Gandhi Maidan</Text>
        </View>
      </View>
      <Button title="Know more" containerStyle={styles.btn} />
    </View>
  );
};

export default VibeTribeView;

const styles = StyleSheet.create({
  categoryView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginTop: 14,
  },
  imageView: {flexDirection: 'row', alignItems: 'center', flex: 1},
  container: {
    backgroundColor: LIGHT_PURPLE,
    borderRadius: 25,
    margin: 20,
    padding: 20,
  },
  row: {
    flex: 1,
    marginVertical: 16,
  },
  title: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: fontsSize.fs18,
    color: PURPLE,
  },
  subTitle: {
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: fontsSize.fs14,
    color: BLACK_COLOR,
    marginTop: 10,
  },
  road: {
    fontSize: 12,
    fontFamily: MONTSERRAT_REGULAR,
    marginLeft: 10,
    marginTop: 5,
  },
  btn: {
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
});
