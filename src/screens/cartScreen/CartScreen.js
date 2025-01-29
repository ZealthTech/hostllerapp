import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
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
import {ERROR_TOAST, REGISTER_DATA} from '../../utils/constants/constants';
import {apiPost} from '../../network/axiosInstance';
import {BOOK_ROOM} from '../../utils/constants/apiEndPoints';
import {showToast} from '../../utils/constants/commonFunctions';
import Loader from '../../components/loader/Loader';
import {
  AUTH_NAVIGATOR,
  BOOKING_SUCCESS_SCREEN,
  CART_SCREEN,
  COUPONS_SCREEN,
  LOGIN,
} from '../../navigation/routes';
import {setBookingSummary} from '../../redux/reducers/bookingSummary';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/button/Button';

const CartScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.userInfoReducer);
  const {
    cartData,
    mealChart,
    fromLogin,
    pgId,
    couponCode = '',
    key,
  } = route?.params || {};
  console.log('params ', route?.params);
  const foodInclude = cartData?.option === 'included';
  const [modalVisible, setModalVisible] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const [couponData, setCouponData] = useState();
  const {bookingSummary} = useSelector(state => state.bookingSummary);
  console.log('booking summary ', bookingSummary);
  console.log('cart data ', cartData);
  console.log('value value ', key);
  const focus = useIsFocused();

  useEffect(() => {
    console.log('akanksha');
    //storing booking info in redux so that we can get it after coming back from login
    setTimeout(() => {
      //showing loader for 300ms, so that until we get the data from redux, loader will be shown
      setLoading(false);
    }, 300);
  }, [cartData, dispatch]);

  console.log('from login', fromLogin);
  console.log(
    '  const {userInfo} = useSelector(state => state.userInfoReducer); ',
    userInfo,
  );

  const checkLogin = async () => {
    setButtonLoading(true);
    const _userData = await getDataFromStorage(REGISTER_DATA);
    console.log('81 ', _userData);
    if (_userData != null) {
      const parsedData = _userData ? JSON.parse(_userData) : null;
      setUserData(parsedData);
      return true;
    } else {
      return false;
    }
  };

  console.log('userData?.token ', userData?.token);
  const addRoomToCart = async _userData => {
    const isLogin = await checkLogin();
    console.log('is login ', isLogin);
    setButtonLoading(false);
    setLoading(true);
    if (isLogin) {
      const bodyData = {
        userId: userInfo.userId,
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
      const response = await apiPost(BOOK_ROOM, bodyData, userInfo.token);
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

  const goToCouponScreen = () => {
    navigation.navigate(COUPONS_SCREEN, {
      pgId: pgId,
      onGoBack: data => setCouponData(data),
      finalPrice: bookingSummary?.item?.rent,
    });
  };

  console.log('data form coupon ', couponData);
  return (
    <View style={styles.container}>
      <BackIconHeader title="Booking Summary" />
      <View style={styles.card}>
        <View style={styles.imageView}>
          <Image
            source={{uri: bookingSummary?.item?.image}}
            style={styles.img}
          />
          <View style={styles.titleView}>
            <Text style={styles.title}>{bookingSummary?.address?.trim()}</Text>
            <View style={styles.calenderView}>
              <CustomSvg SvgComponent={<Calendar height={15} width={15} />} />
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
              imgStyle={styles.svgImg}
              onPress={() => setModalVisible(true)}
            />
          </View>
        )}
        {/* <View style={styles.securityView}>
          <Text style={styles.meal}>Security Deposit</Text>
          <Text style={[styles.currentPrice, {fontFamily: MONTSERRAT_MEDIUM}]}>
            ₹{bookingSummary?.item?.security}
          </Text>
        </View> */}
        <View style={styles.securityView}>
          <Text style={[styles.meal]}>
            Discount Coupon{' '}
            {couponData && (
              <Text style={{fontFamily: MONTSERRAT_MEDIUM}}>
                ({couponData?.couponCode})
              </Text>
            )}
          </Text>

          {couponData ? (
            <Text
              style={[
                styles.meal,
                {color: LIGHT_GREEN, fontFamily: MONTSERRAT_MEDIUM},
              ]}>
              -₹{couponData?.couponDiscount}
            </Text>
          ) : (
            <Pressable style={styles.applyButton} onPress={goToCouponScreen}>
              <Text style={styles.apply}>Apply Coupon</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.line} />
        <View style={styles.securityView}>
          <Text style={[styles.meal, {fontFamily: MONTSERRAT_SEMIBOLD}]}>
            Total Payable
          </Text>
          <Text style={[styles.meal, {fontFamily: MONTSERRAT_SEMIBOLD}]}>
            ₹{couponData ? couponData?.finalAmount : bookingSummary?.item?.rent}
          </Text>
        </View>
        <Pressable style={styles.buttonView} onPress={addRoomToCart}>
          {buttonLoading ? (
            <ActivityIndicator color={WHITE} style={styles.loader} />
          ) : (
            <>
              <Text style={styles.payNow}>Pay Now</Text>
              <Text style={styles.finalRs}>
                ₹
                {couponData
                  ? couponData?.finalAmount
                  : bookingSummary?.item?.rent}
              </Text>
            </>
          )}
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
