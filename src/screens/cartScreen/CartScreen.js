import {View, Text, Image, Pressable, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './styles';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {Calendar, InfoIcon} from '../../assets';
import MealChart from '../../components/mealChart/MealChart';
import {
  MONTSERRAT_MEDIUM,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';
import {LIGHT_GREEN, PURPLE, WHITE} from '../../utils/colors/colors';
import {getDataFromStorage} from '../../utils/storage';
import {ERROR_TOAST, REGISTER_DATA} from '../../utils/constants/constants';
import {showToast} from '../../utils/constants/commonFunctions';
import Loader from '../../components/loader/Loader';
import {
  BOOKING_SUCCESS_SCREEN,
  CART_SCREEN,
  COUPONS_SCREEN,
  LOGIN,
  PRIVACY_POLICY,
} from '../../navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import TermsAndConditionTxt from '../../components/termsAndConditionTxt/TermsAndConditionTxt';
import RazorpayCheckout from 'react-native-razorpay';

const CartScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.userInfoReducer);
  const {cartData, mealChart, fromLogin, pgId, key} = route?.params || {};
  const foodInclude = cartData?.option === 'included';
  const [modalVisible, setModalVisible] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const [couponData, setCouponData] = useState();
  const {bookingSummary} = useSelector(state => state.bookingSummary);
  const [agreeTAndC, setAgreeTAndC] = useState(false);

  console.log('booking summary ', bookingSummary);
  useEffect(() => {
    console.log('akanksha');
    //storing booking info in redux so that we can get it after coming back from login
    setTimeout(() => {
      //showing loader for 300ms, so that until we get the data from redux, loader will be shown
      setLoading(false);
    }, 300);
  }, [cartData, dispatch]);

  const checkLogin = async () => {
    setButtonLoading(true);
    const _userData = await getDataFromStorage(REGISTER_DATA);
    if (_userData != null) {
      const parsedData = _userData ? JSON.parse(_userData) : null;
      setUserData(parsedData);
      return true;
    } else {
      return false;
    }
  };

  const openPaymentGateway = async () => {
    let options = {
      description: 'Credits towards consultation',
      image:
        'https://api.hostellers.in/uploads/reviewImage/reviewImage-1732032799305-gg7kw.jpeg',
      currency: 'INR', //In USD - only card option will exist rest(like wallet, UPI, EMI etc) will hide
      key: 'rzp_test_L0erCkhGxzsJET',
      amount: '1',
      name: 'Hostellers',
      order_id: '', //Replace this with an order_id(response.data.orderId) created using Orders API.
      prefill: {
        email: 'hasan@example.com',
        contact: '9191919191',
        name: 'Hasan',
      },
      theme: {color: PURPLE},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        console.log('razorpay response ', data);
        navigation.pop(4);
        navigation.replace(BOOKING_SUCCESS_SCREEN);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const addRoomToCart = async _userData => {
    if (!agreeTAndC) {
      showToast(ERROR_TOAST, 'Please Agree Terms and Conditions');
      return;
    }
    const isLogin = await checkLogin();
    setButtonLoading(false);
    setLoading(true);
    if (isLogin) {
      // showToast(SUCCESS_TOAST, 'You will be redirect to payment page');
      await openPaymentGateway();

      //below data is required in book room api params
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
      // const response = await apiPost(BOOK_ROOM, bodyData, userInfo.token);
      // if (response?.status) {
      //   navigation.pop(4);
      //   navigation.replace(BOOKING_SUCCESS_SCREEN);
      // } else {
      //   showToast(ERROR_TOAST, response?.message);
      // }
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

  const agreeTermsAndCondition = () => {
    setAgreeTAndC(!agreeTAndC);
  };

  const goToPrivacyScreen = () => {
    navigation?.navigate(PRIVACY_POLICY, {
      slug: 'termsandconditions',
      userData: userData,
      title: 'Terms & Conditions',
    });
  };

  const totalPayableAmount =
    bookingSummary?.option === 'no food'
      ? bookingSummary?.item?.rent
      : bookingSummary?.item?.rent + bookingSummary?.item?.foodPrice;

  console.log('couponData?.finalAmount ', couponData?.finalAmount);
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
            {/* <Text style={styles.originalPrice}>₹15084</Text> */}
            <Text style={styles.currentPrice}>₹{totalPayableAmount}</Text>
            {/* <Text style={styles.off}>20% OFF</Text> */}
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
            ₹{couponData ? couponData?.finalAmount : totalPayableAmount}
          </Text>
        </View>
        <Text style={styles.deposit}>
          The security amount must be pay upon check-in.
        </Text>
        <TermsAndConditionTxt
          agreeTermsAndCondition={agreeTermsAndCondition}
          agreeTAndC={agreeTAndC}
          onPressTAndC={goToPrivacyScreen}
          container={styles.tAndCContainer}
        />
        <Pressable style={styles.buttonView} onPress={addRoomToCart}>
          {buttonLoading ? (
            <ActivityIndicator color={WHITE} style={styles.loader} />
          ) : (
            <>
              <Text style={styles.payNow}>Pay Now</Text>
              <Text style={styles.finalRs}>
                ₹{couponData ? couponData?.finalAmount : totalPayableAmount}
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
