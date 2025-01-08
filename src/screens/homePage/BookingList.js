import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
} from '../../constants/fonts';
import {JOIN_NOW, REDEEMED, SCHEDULED} from '../../utils/constants/constants';

const BookingList = props => {
  const {data, onPressJoinNow} = props || {};
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
      {data?.map((item, index) => (
        <View key={index} style={styles.mainContainer(item?.sessionStatus)}>
          <View style={styles.timeContainer}>
            <Image
              source={require('../../../assets/images/clock.png')}
              style={styles.clock(item?.sessionStatus)}
            />
            <Text style={styles.time(item?.sessionStatus)}>{item?.time}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              item?.sessionStatus === JOIN_NOW ? onPressJoinNow(item) : {}
            }
            style={styles.tch}
            disabled={item?.sessionStatus !== JOIN_NOW}>
            <Text style={styles.statusText(item?.sessionStatus)}>
              {item?.sessionStatus}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default BookingList;

const getViewBorder = status => {
  if (status === REDEEMED) {
    return '#fff';
  } else if (status === SCHEDULED) {
    return '#333333';
  } else if (status === JOIN_NOW) {
    return '#D37878';
  }
};
const getTextColor = status => {
  if (status === REDEEMED) {
    return '#CBCBCB';
  } else if (status === SCHEDULED) {
    return '#333333';
  } else if (status === JOIN_NOW) {
    return '#D37878';
  }
};

const styles = StyleSheet.create({
  scroll: {marginTop: 15},
  mainContainer: status => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderColor: getViewBorder(status),
    borderWidth: 1,
  }),
  time: status => ({
    color: getTextColor(status),
    fontSize: 12,
    fontFamily: MONTSERRAT_SEMIBOLD,
  }),
  timeContainer: {flexDirection: 'row', alignItems: 'center', gap: 10},
  clock: status => ({tintColor: getTextColor(status), width: 21, height: 21}),
  statusText: status => ({
    color: getTextColor(status),
    fontSize: status === JOIN_NOW ? 14 : 12,
    fontFamily: status === JOIN_NOW ? MONTSERRAT_BOLD : MONTSERRAT_MEDIUM,
  }),
  tch: {
    paddingHorizontal: 15,
    marginRight: -10,
    paddingVertical: 16,
  },
});
