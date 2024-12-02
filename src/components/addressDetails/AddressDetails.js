import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BLACK_COLOR, GRAY_92} from '../../utils/colors/colors';
import {fontsSize, MONTSERRAT_REGULAR} from '../../utils/styles/commonStyles';

const AddressDetails = props => {
  const {data} = props || {};
  return (
    <View style={styles.container}>
      {data?.trainIcon && (
        <View style={styles.row}>
          <View>
            <Image
              source={{uri: data?.trainIcon}}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.name}>{data?.railwayStation}</Text>
        </View>
      )}
      {data?.busIcon && (
        <View style={[styles.row, {marginTop: 10}]}>
          <Image
            source={{uri: data?.busIcon}}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.name}>{data?.busStand}</Text>
        </View>
      )}
      {data?.hospitalIcon && (
        <View style={[styles.row, {marginTop: 10}]}>
          <Image
            source={{uri: data?.hospitalIcon}}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.name}>{data?.hospital}</Text>
        </View>
      )}
      {data?.policeIcon && (
        <View style={[styles.row, {marginTop: 10}]}>
          <Image
            source={{uri: data?.policeIcon}}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.name}>{data?.policeStation}</Text>
        </View>
      )}
    </View>
  );
};

export default AddressDetails;
const styles = StyleSheet.create({
  container: {
    borderColor: GRAY_92,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 16,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 55,
  },
  name: {
    fontFamily: MONTSERRAT_REGULAR,
    color: BLACK_COLOR,
    fontSize: fontsSize.fs12,
    marginLeft: -10,
  },
});
