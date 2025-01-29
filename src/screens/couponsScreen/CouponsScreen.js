import {View, Text, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {styles} from './styles';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {apiPost} from '../../network/axiosInstance';
import {
  APPLY_COUPON_URL,
  COUPON_LIST_URL,
} from '../../utils/constants/apiEndPoints';
import Button from '../../components/button/Button';
import {showToast} from '../../utils/constants/commonFunctions';
import {ERROR_TOAST} from '../../utils/constants/constants';
import {useNavigation, useRoute} from '@react-navigation/native';

const CouponsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {params} = route || {};
  const {pgId, finalPrice} = params || {};
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const fetchCoupons = useCallback(async () => {
    const response = await apiPost(COUPON_LIST_URL, {pgId});

    if (response.status) {
      setCoupons(response?.data?.couponList);
    }
  }, [pgId]);

  console.log('couponse ', coupons);

  const applyCoupon = async item => {
    const body = {
      userId: 'USRF32K2X',
      title: item.title,
      value: item.value,
      type: item.type,
      totalAmount: finalPrice,
    };
    console.log('body ', body);
    const response = await apiPost(APPLY_COUPON_URL, body);
    if (response?.status) {
      route?.params?.onGoBack({
        couponDiscount: response?.data?.discount,
        finalAmount: response?.data?.finalPrice,
        couponCode: item?.title,
      });
      navigation.goBack();
    } else {
      showToast(ERROR_TOAST, response?.message);
    }
    console.log('response39 ', response);
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.couponCard}>
        <View>
          <Text style={styles.value}>
            {item.type === 'flat'
              ? `Flat ₹${item.value} Off`
              : `Flat ${item.value}% off`}
          </Text>
          <Text style={styles.coupon}>COUPON CODE</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <Button
          title="Apply"
          onPress={() => applyCoupon(item)}
          containerStyle={styles.button}
          textStyle={styles.textStyle}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <BackIconHeader title="Coupons" />
      <Text style={styles.available}>
        {coupons.length > 0
          ? 'Available Coupons'
          : 'No coupons available for this PG'}
      </Text>
      <FlatList
        data={coupons}
        renderItem={renderItem}
        style={styles.flat}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CouponsScreen;
