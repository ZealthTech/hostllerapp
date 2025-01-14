import {View, Text, FlatList, Pressable} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {apiPost} from '../../network/axiosInstance';
import {BOOKING_LIST} from '../../utils/constants/apiEndPoints';
import FastImage from 'react-native-fast-image';
import {MONTSERRAT_BOLD} from '../../utils/styles/commonStyles';
import Space from '../../components/space/Space';
import Loader from '../../components/loader/Loader';
import {BOOKING_DETAILS_SCREEN} from '../../navigation/routes';
const Bookings = navigation => {
  const {userInfo} = useSelector(state => state.userInfoReducer);
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getBookingList();
  }, [getBookingList]);

  const getBookingList = useCallback(async () => {
    const response = await apiPost(
      BOOKING_LIST,
      {userId: userInfo?.userId},
      userInfo?.token,
    );
    console.log('29 ', response);
    if (response?.status) {
      setBookingList(response?.data);
    }
    setLoading(false);
    setRefresh(false);
  }, [userInfo]);
  const renderItem = ({item, index}) => (
    <Pressable
      style={styles.itemView}
      onPress={() =>
        navigation?.navigation?.navigate(BOOKING_DETAILS_SCREEN, {
          userId: userInfo?.userId,
          bookingId: item?.bookingId,
          token: userInfo?.token,
        })
      }>
      <View style={styles.row}>
        <Text style={styles.bookingId}>Booking ID</Text>
        <Text style={styles.bookingId}>Booking Date</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bookingDate}>{item?.bookingNumber}</Text>
        <Text style={styles.bookingDate}>6 Nov 2024</Text>
      </View>
      <FastImage source={{uri: item?.image}} style={styles.image} />
      <View style={styles.row}>
        <View>
          <Text style={styles.name}>{item?.pgName}</Text>
          <Text style={styles.address}>{item?.pgAddress}</Text>
        </View>
        <View>
          <Text style={styles.rupees}>
            ₹
            <Text style={{fontFamily: MONTSERRAT_BOLD}}>{item?.totalPaid}</Text>
          </Text>
          <Text style={styles.perMonth}>Per Month</Text>
        </View>
      </View>
      <View style={styles.checkInView}>
        <Text style={styles.checkIn}>
          Check In: <Text style={styles.bed}>{item?.checkinDate}</Text>
        </Text>
        <Space height={5} />
        <Text style={styles.checkIn}>
          Bed: <Text style={styles.bed}>{item?.totalBeds}</Text>
        </Text>
      </View>
    </Pressable>
  );
  if (refresh) {
    getBookingList();
  }
  return (
    <>
      {!loading ? (
        <View style={styles.container}>
          <BackIconHeader title="My Bookings" />
          <FlatList
            data={bookingList}
            refreshing={refresh}
            contentContainerStyle={{paddingBottom: 20}}
            onRefresh={() => setRefresh(true)}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <Loader loading={loading} />
      )}
    </>
  );
};

export default Bookings;
