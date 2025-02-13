import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {apiPost} from '../../network/axiosInstance';
import {USER_BOOKING_DETAILS} from '../../utils/constants/apiEndPoints';
import {styles} from './styles';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import FastImage from 'react-native-fast-image';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import Space from '../../components/space/Space';
import Loader from '../../components/loader/Loader';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {NextArrow} from '../../assets';
import {PURPLE} from '../../utils/colors/colors';

const BookingDetails = navigation => {
  console.log(navigation?.route?.params);
  const {bookingId, userId, token} = navigation?.route?.params || {};
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
  }, [userId, bookingId, token]);

  const openGoogleMaps = () => {
    const latitude = 28.58534820176442;
    const longitude = 77.36198163441654;
    if (!latitude || !longitude) {
      Alert.alert('Error', 'Location coordinates are missing.');
      return;
    }

    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${latitude},${longitude}`,
      android: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
    });

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Could not open map app.');
        }
      })
      .catch(err => console.error('Error opening map:', err));
  };
  console.log('bookingDetails?.bookingDetail ', bookingDetails?.bookingDetail);
  return (
    <>
      <BackIconHeader title="Booking Details" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
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
        <Pressable style={styles.mapButton} onPress={openGoogleMaps}>
          <Text style={styles.mapText}>See Location On Map</Text>
          <Image
            source={require('../../assets/images/direction.png')}
            tintColor={PURPLE}
            style={styles.img_arrow}
          />
        </Pressable>
        <Space height={30} />
        <View style={styles.line} />
        <Text style={[styles.name, styles.bookingDetails]}>
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
        <Text style={[styles.name, styles.paymentDetail]}>Payment Details</Text>
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
          <View style={styles.security_view}>
            <Text style={[styles.idValue, styles.security_txt]}>
              *Security amount of {bookingDetails?.bookingDetail?.security} need
              to pay during checkin
            </Text>
          </View>
        </View>
        <Loader loading={loading} />
      </ScrollView>
    </>
  );
};

export default BookingDetails;
