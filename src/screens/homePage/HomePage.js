import {View, Text, ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {homeDataRequest} from '../../redux/reducers/homeReducer';
import BannerView from '../../components/bannerView/BannerView';
import Categories from '../../components/categories/Categories';
import {categories, genderCategories} from './helper';
import VibeTribeView from '../../components/VibeTribe/VibeTribeView';
import Testimonial from '../../components/testimonial/Testimonial';
import {getDeviceWidth} from '../../utils/constants/commonFunctions';
import {useNavigation} from '@react-navigation/native';
import {
  HOME_NAVIGATOR,
  HOSTEL_LISTINGS,
  LOGIN,
  OTP_VERIFICATION,
} from '../../navigation/routes';
import HomeScreenSkeleton from '../../components/skeletons/homeScreenSkeleton/HomeScreenSkeleton';
import {getDataFromStorage} from '../../utils/storage';
import {REGISTER_DATA, TOKEN} from '../../utils/constants/constants';

const HomePage = () => {
  const dispatch = useDispatch();
  const {homeData, loading} = useSelector(state => state.homeReducer);
  // const {token} = useSelector(state => state.authReducer);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState();
  const [dataGet, setDataGet] = useState(false);
  const navigation = useNavigation();
  const width_dev = getDeviceWidth();
  const handleScroll = useCallback(
    e => {
      const x = e.nativeEvent.contentOffset.x;
      const index = Math.min(
        (x / width_dev).toFixed(0),
        homeData?.testimonialListing?.length - 1,
      );
      setCurrentIndex(index);
    },
    [homeData, width_dev],
  );

  useEffect(() => {
    const initialize = async () => {
      await findToken();
      if (dataGet) {
        fetchHomeData();
      }
    };
    initialize();
  }, [findToken, fetchHomeData, dataGet]);

  const findToken = useCallback(async () => {
    const _userData = await getDataFromStorage(REGISTER_DATA);
    console.log('user data ', _userData);
    const parsedData = await JSON.parse(_userData);
    setUserData(parsedData);
    setDataGet(true);
  }, []);

  const fetchHomeData = useCallback(() => {
    const payload = {
      userId: userData?.userId || '',
      token: userData?.token || '',
    };
    dispatch(homeDataRequest(payload));
  }, [dispatch, userData]);

  const onPressCategory = name => {
    navigation?.navigate(HOSTEL_LISTINGS, {title: name, userData: userData});
  };
  //Gender neutral
  return (
    <View>
      <Header
        onPressProfile={() =>
          navigation?.navigate(LOGIN, {
            userData: userData,
            targetRoute: HOME_NAVIGATOR,
          })
        }
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: 90}}
        showsVerticalScrollIndicator={false}>
        {!loading ? (
          <>
            <BannerView data={homeData?.topBanner} />
            <Categories
              level="Explore for"
              data={genderCategories}
              onPress={name => onPressCategory(name)}
            />
            <Categories
              level="Category"
              data={categories}
              onPress={name => onPressCategory(name)}
            />
            <VibeTribeView />
            <Testimonial
              data={homeData?.testimonialListing}
              handleScroll={handleScroll}
              currentIndex={currentIndex}
            />
          </>
        ) : (
          <HomeScreenSkeleton />
        )}
      </ScrollView>
    </View>
  );
};

export default HomePage;
