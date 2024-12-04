import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {styles} from './styles';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {Calendar, InfoIcon} from '../../assets';
import MealChart from '../../components/mealChart/MealChart';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {LIGHT_GREEN, WHITE} from '../../utils/colors/colors';
import {getDataFromStorage} from '../../utils/storage';
import {REGISTER_DATA} from '../../utils/constants/constants';
import {apiPost} from '../../network/axiosInstance';
import {BOOK_ROOM} from '../../utils/constants/apiEndPoints';

const CartScreen = () => {
  const route = useRoute();
  const {cartData, mealChart, fromLogin, pgId} = route?.params || {};
  console.log('cartData ', cartData);
  const foodInclude = cartData?.option === 'included';
  console.log('foodInclude ', foodInclude);
  console.log(' pgId ', pgId);
  const [modalVisible, setModalVisible] = useState();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (fromLogin && userData != null) {
      addRoomToCart(userData);
    }
  }, [fromLogin, userData]);

  useFocusEffect(
    React.useCallback(() => {
      checkLogin();
    }, []),
  );

  const checkLogin = async () => {
    const _userData = await getDataFromStorage(REGISTER_DATA);
    const parsedData = _userData ? JSON.parse(_userData) : null;
    console.log('parsedData ', parsedData);
    setUserData(parsedData);
  };

  console.log('userData?.token ', userData?.token);
  const addRoomToCart = async _userData => {
    const bodyData = {
      userId: userData?.userId,
      pgId: pgId,
      totalBeds: 2,
      roomType: cartData?.item?.roomType, // 1_Bed | 2_Bed | 3_Bed | 4_Bed | dormitory
      bathroomType: cartData?.item?.bathroomType, // Private | Shared
      ac: cartData?.item?.ac,
      rent: cartData?.item?.rent,
      security: cartData?.item?.security,
      totalPaid:
        cartData?.item?.security +
        cartData?.item?.rent +
        cartData?.item?.foodPrice, // Rent + Secuity = Total Paid
      foodOption: cartData?.option, //
      foodPrice: cartData?.item?.foodPrice, // Give Price When Optional Else 0
      paymentMode: 'Online', // Online | Cash
      checkinDate: cartData?.checkinDate,
    };
    const response = await apiPost(BOOK_ROOM, bodyData, userData?.token);
    console.log('response ', response);
  };
  return (
    <View style={styles.container}>
      <BackIconHeader title="Booking Summary" />
      <View style={styles.card}>
        <View style={styles.imageView}>
          <Image source={{uri: cartData?.item?.image}} style={styles.img} />
          <View style={styles.titleView}>
            <Text style={styles.title}>{cartData?.address.trim()}</Text>
            <View style={styles.calenderView}>
              <CustomSvg SvgComponent={<Calendar />} />
              <Text style={styles.date}>{cartData?.checkinDate}</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceTopView}>
          <View>
            <Text style={styles.bedText}>
              {cartData?.item?.roomType} {cartData?.roomType}
            </Text>
            <Text style={styles.bedText}>
              {foodInclude ? 'With Food ' : 'Without Food'}
            </Text>
          </View>
          <View>
            <Text style={styles.originalPrice}>₹15084</Text>
            <Text style={styles.currentPrice}>
              ₹{cartData?.item?.rent + cartData?.item?.foodPrice}
            </Text>
            <Text style={styles.off}>20% OFF</Text>
          </View>
        </View>
        {foodInclude && (
          <View style={styles.mealView}>
            <Text style={styles.meal}>Breakfast, Lunch, Dinner</Text>
            <CustomSvg
              SvgComponent={<InfoIcon />}
              isClickable={true}
              imgStyle={{marginBottom: 5}}
              onPress={() => setModalVisible(true)}
            />
          </View>
        )}
        <View style={styles.securityView}>
          <Text style={styles.meal}>Security Deposit</Text>
          <Text style={[styles.currentPrice, {fontFamily: MONTSERRAT_MEDIUM}]}>
            ₹{cartData?.item?.security}
          </Text>
        </View>
        <View style={styles.securityView}>
          <Text style={[styles.meal, {color: LIGHT_GREEN}]}>
            Discount Coupon(
            <Text style={{fontFamily: MONTSERRAT_BOLD}}>SUPER30</Text>)
          </Text>
          <Text
            style={[
              styles.meal,
              {color: LIGHT_GREEN, fontFamily: MONTSERRAT_MEDIUM},
            ]}>
            -₹100
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.securityView}>
          <Text style={[styles.meal, {fontFamily: MONTSERRAT_SEMIBOLD}]}>
            Total Payable
          </Text>
          <Text style={[styles.meal, {fontFamily: MONTSERRAT_SEMIBOLD}]}>
            ₹
            {cartData?.item?.security +
              cartData?.item?.rent +
              cartData?.item?.foodPrice -
              100}
          </Text>
        </View>
        <Pressable style={styles.buttonView} onPress={addRoomToCart}>
          <Text style={styles.payNow}>Pay Now</Text>
          <Text style={styles.finalRs}>
            ₹
            {cartData?.item?.security +
              cartData?.item?.rent +
              cartData?.item?.foodPrice -
              100}
          </Text>
        </Pressable>
      </View>
      <MealChart
        data={mealChart}
        modalVisible={modalVisible}
        onPressOutside={() => setModalVisible(false)}
      />
    </View>
  );
};

export default CartScreen;
