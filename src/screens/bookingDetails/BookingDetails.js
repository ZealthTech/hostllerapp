import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {apiPost} from '../../network/axiosInstance';
import {USER_BOOKING_DETAILS} from '../../utils/constants/apiEndPoints';
import {styles} from './styles';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import FastImage from 'react-native-fast-image';
import {MONTSERRAT_BOLD} from '../../utils/styles/commonStyles';
import Space from '../../components/space/Space';
import Loader from '../../components/loader/Loader';

const BookingDetails = navigation => {
  console.log(navigation?.route?.params);
  const {bookingId, userId, token} = navigation?.route?.params || {};
  console.log('bookingId,userId ', bookingId, userId);
  const [bookingDetails, setBookingDetails] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBookingDetails();
  }, [getBookingDetails]);
  const getBookingDetails = useCallback(async () => {
    const data = {userId, bookingId};
    const response = await apiPost(USER_BOOKING_DETAILS, data, token);
    if (response?.status) {
      setBookingDetails(response?.data);
    }
    setLoading(false);
    console.log('response ', response);
  }, [userId, bookingId, token]);
  return (
    <>
      <BackIconHeader title="Booking Details" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40}}>
        <FastImage
          source={{uri: bookingDetails?.pgDetail?.image}}
          style={styles.image}
        />
        <View style={styles.row}>
          <View>
            <Text style={styles.name}>{bookingDetails?.pgDetail?.name}</Text>
            <Text style={styles.address}>
              {bookingDetails?.pgDetail?.address}
            </Text>
          </View>
          <View>
            <Text style={styles.rupees}>
              ₹
              <Text style={{fontFamily: MONTSERRAT_BOLD}}>
                {bookingDetails?.bookingDetail?.totalPaid}
              </Text>
            </Text>
            <Text style={styles.perMonth}>Per Month</Text>
          </View>
        </View>
        <Text style={[styles.perMonth, styles.security]}>
          Security Deposit ₹{bookingDetails?.bookingDetail?.security}
        </Text>
        <Space height={30} />
        <View style={styles.line} />
        <Text
          style={[
            styles.name,
            {fontSize: 16, paddingHorizontal: 20, paddingVertical: 10},
          ]}>
          Booking Details
        </Text>
        <View style={styles.line} />
        <View style={styles.contentRow}>
          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>Booking ID: </Text>
            <Text style={styles.idValue}>
              {bookingDetails?.bookingDetail?.bookingNumber}
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>Room Type: </Text>
            <Text style={styles.idValue}>
              {bookingDetails?.bookingDetail?.roomType}
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>AC: </Text>
            <Text style={styles.idValue}>
              {bookingDetails?.bookingDetail?.ac}
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>Bathroom Type: </Text>
            <Text style={styles.idValue}>
              {bookingDetails?.bookingDetail?.bathroomType}
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>Rent: </Text>
            <Text style={styles.idValue}>
              {bookingDetails?.bookingDetail?.rent}
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>Security: </Text>
            <Text style={styles.idValue}>
              {bookingDetails?.bookingDetail?.security}
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>Check in Date: </Text>
            <Text style={styles.idValue}>
              {bookingDetails?.bookingDetail?.checkinDate}
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>Booking Date: </Text>
            <Text style={styles.idValue}>
              {bookingDetails?.bookingDetail?.bookingDate}
            </Text>
          </View>
        </View>
        <Space height={25} />
        <View style={styles.line} />
        <Text
          style={[
            styles.name,
            {fontSize: 16, paddingHorizontal: 20, paddingVertical: 10},
          ]}>
          Payment Details
        </Text>
        <View style={styles.line} />
        <View style={styles.contentRow}>
          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>Booking ID</Text>
            <Text style={styles.idValue}>
              {bookingDetails?.paymentHistory?.[0]?.newPaymentId}
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>Mode: </Text>
            <Text style={styles.idValue}>
              {bookingDetails?.paymentHistory?.[0]?.paymentMode}
            </Text>
          </View>

          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>Food Price: </Text>
            <Text style={styles.idValue}>
              {bookingDetails?.paymentHistory?.[0]?.foodPrice}
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>Amount: </Text>
            <Text style={styles.idValue}>
              {bookingDetails?.paymentHistory?.[0]?.amount}
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.bookingId}>Date: </Text>
            <Text style={styles.idValue}>
              {bookingDetails?.paymentHistory?.[0]?.paymentDate}
            </Text>
          </View>
        </View>
        <Loader loading={loading} />
      </ScrollView>
    </>
  );
};

export default BookingDetails;
