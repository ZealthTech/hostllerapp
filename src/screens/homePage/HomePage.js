import {View, ScrollView, RefreshControl} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../../components/header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {homeDataRequest} from '../../redux/reducers/homeReducer';
import BannerView from '../../components/bannerView/BannerView';
import Categories from '../../components/categories/Categories';
import {categories, genderCategories} from './helper';
import VibeTribeView from '../../components/VibeTribe/VibeTribeView';
import Testimonial from '../../components/testimonial/Testimonial';
import {getDeviceWidth} from '../../utils/constants/commonFunctions';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  HOME_NAVIGATOR,
  HOSTEL_LISTINGS,
  LOGIN,
  PROFILE_SCREEN,
  SEARCH_SCREEN,
} from '../../navigation/routes';
import HomeScreenSkeleton from '../../components/skeletons/homeScreenSkeleton/HomeScreenSkeleton';
import {getDataFromStorage} from '../../utils/storage';
import {REGISTER_DATA} from '../../utils/constants/constants';
import {setUserInfo} from '../../redux/reducers/userInfoReducer';

const HomePage = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {fromLogin} = route?.params || {};
  const {homeData, loading} = useSelector(state => state.homeReducer);
  const {data} = useSelector(state => state.loginReducer);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const _navigation = useNavigation();
  const width_dev = getDeviceWidth();
  useFocusEffect(
    React.useCallback(() => {
      const initialize = async () => {
        await findToken();
        // Always call fetchHomeData when the screen is focused
        fetchHomeData();
      };
      initialize();
    }, [findToken, fetchHomeData]),
  );

  const findToken = useCallback(async () => {
    if (fromLogin) {
      //if coming from login screen getting data from redux because getting datar from redux is faster than async storage
      setUserData(data);
      dispatch(setUserInfo(data?.data));
    } else {
      const _userData = await getDataFromStorage(REGISTER_DATA);
      const parsedData = _userData ? JSON.parse(_userData) : null;
      setUserData(parsedData);
      dispatch(setUserInfo(parsedData));
    }
  }, [dispatch, fromLogin, data]);

  const fetchHomeData = useCallback(() => {
    const payload = {
      userId: userData?.userId || '', // Use userData if it exists, otherwise empty string
      token: userData?.token || '',
    };
    dispatch(homeDataRequest(payload));
    if (!loading) {
      setRefreshing(false);
    }
  }, [dispatch, userData, loading]);

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

  const onPressCategory = name => {
    _navigation?.navigate(HOSTEL_LISTINGS, {title: name, userData: userData});
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchHomeData();
  };
  const goToSearchScreen = () => {
    _navigation.navigate(SEARCH_SCREEN);
  };

  const onPressProfile = () => {
    if (userData == null) {
      _navigation?.navigate(LOGIN, {
        userData: userData,
        targetRoute: HOME_NAVIGATOR,
      });
    } else {
      _navigation.navigate(PROFILE_SCREEN);
    }
  };
  return (
    <View>
      <Header onPressProfile={onPressProfile} />
      <ScrollView
        contentContainerStyle={{paddingBottom: 90}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        {!loading ? (
          <>
            <BannerView
              data={homeData?.topBanner}
              onPressSearchInput={goToSearchScreen}
            />
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
            {/* <Scale /> */}
          </>
        ) : (
          <HomeScreenSkeleton />
        )}
      </ScrollView>
    </View>
  );
};

export default HomePage;
