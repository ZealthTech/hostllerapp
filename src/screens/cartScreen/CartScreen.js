import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
import {
  ERROR_TOAST,
  REGISTER_DATA,
  SUCCESS_TOAST,
} from '../../utils/constants/constants';
import {apiPost} from '../../network/axiosInstance';
import {BOOK_ROOM} from '../../utils/constants/apiEndPoints';
import {showToast} from '../../utils/constants/commonFunctions';
import Loader from '../../components/loader/Loader';
import {
  BOOKING_SUCCESS_SCREEN,
  CART_SCREEN,
  CHOOSE_ROOM,
  LOGIN,
} from '../../navigation/routes';
import {setBookingSummary} from '../../redux/reducers/bookingSummary';
import {useDispatch, useSelector} from 'react-redux';

const CartScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {cartData, mealChart, fromLogin, pgId} = route?.params || {};
  const foodInclude = cartData?.option === 'included';
  const [modalVisible, setModalVisible] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const {bookingSummary} = useSelector(state => state.bookingSummary);

  useEffect(() => {
    dispatch(setBookingSummary(cartData)); //storing booking info in redux so that we can get it after coming back from login
    setTimeout(() => {
      //showing loader for 300ms, so that until we get the data from redux, loader will be shown
      setLoading(false);
    }, 300);
  }, [cartData, dispatch]);

  console.log('from login', fromLogin);
  useEffect(() => {
    console.log('userData.... ', userData);
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
    console.log('parsedData 58', parsedData);
    setUserData(parsedData);
  };

  console.log('userData?.token ', userData?.token);
  console.log('userData?.userId ', userData?.userData?.userId);
  const addRoomToCart = async _userData => {
    setLoading(true);
    if (userData != null) {
      const bodyData = {
        userId: userData?.userData?.userId,
        pgId: pgId,
        totalBeds: 2,
        roomType: bookingSummary?.item?.roomType, // 1_Bed | 2_Bed | 3_Bed | 4_Bed | dormitory
        bathroomType: bookingSummary?.item?.bathroomType, // Private | Shared
        ac: bookingSummary?.item?.ac,
        rent: bookingSummary?.item?.rent,
        security: bookingSummary?.item?.security,
        totalPaid:
          bookingSummary?.item?.security +
          bookingSummary?.item?.rent +
          bookingSummary?.item?.foodPrice, // Rent + Security = Total Paid
        foodOption: bookingSummary?.option, //
        foodPrice: bookingSummary?.item?.foodPrice, // Give Price When Optional Else 0
        paymentMode: 'Online', // Online | Cash
        checkinDate: bookingSummary?.checkinDate,
      };
      console.log('bodyData, userData?.token ,', bodyData, userData?.token);
      const response = await apiPost(BOOK_ROOM, bodyData, userData?.token);

      console.log('response ', response);
      if (response?.status) {
        navigation.pop(4);
        navigation.replace(BOOKING_SUCCESS_SCREEN);
      } else {
        showToast(ERROR_TOAST, response?.message);
      }
    } else {
      navigation.navigate(LOGIN, {
        targetRoute: CART_SCREEN,
        cartData: cartData,
        mealChart: mealChart,
        pgId: pgId,
        fromCart: true,
      });
    }

    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <BackIconHeader
        title="Booking Summary"
        // fromCart={true}
        //onPress={() => navigation.navigate(CHOOSE_ROOM)}
      />
      <View style={styles.card}>
        <View style={styles.imageView}>
          <Image
            source={{uri: bookingSummary?.item?.image}}
            style={styles.img}
          />
          <View style={styles.titleView}>
            <Text style={styles.title}>{bookingSummary?.address?.trim()}</Text>
            <View style={styles.calenderView}>
              <CustomSvg SvgComponent={<Calendar />} />
              <Text style={styles.date}>{bookingSummary?.checkinDate}</Text>
            </View>
          </View>
        </View>
        <View style={styles.priceTopView}>
          <View>
            <Text style={styles.bedText}>
              {bookingSummary?.item?.roomType} {bookingSummary?.roomType}
            </Text>
            <Text style={styles.bedText}>
              {foodInclude ? 'With Food ' : 'Without Food'}
            </Text>
          </View>
          <View>
            <Text style={styles.originalPrice}>₹15084</Text>
            <Text style={styles.currentPrice}>
              ₹{bookingSummary?.item?.rent + bookingSummary?.item?.foodPrice}
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
            ₹{bookingSummary?.item?.security}
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
            {bookingSummary?.item?.security +
              bookingSummary?.item?.rent +
              bookingSummary?.item?.foodPrice -
              100}
          </Text>
        </View>
        <Pressable style={styles.buttonView} onPress={addRoomToCart}>
          <Text style={styles.payNow}>Pay Now</Text>
          <Text style={styles.finalRs}>
            ₹
            {bookingSummary?.item?.security +
              bookingSummary?.item?.rent +
              bookingSummary?.item?.foodPrice -
              100}
          </Text>
        </Pressable>
      </View>
      <MealChart
        data={mealChart}
        modalVisible={modalVisible}
        onPressOutside={() => setModalVisible(false)}
      />
      <Loader loading={loading} />
    </View>
  );
};

export default CartScreen;
