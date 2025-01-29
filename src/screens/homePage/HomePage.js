import {View, ScrollView, RefreshControl, Text} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Header from '../../components/header/Header';
import {useDispatch, useSelector} from 'react-redux';
import BannerView from '../../components/bannerView/BannerView';
import Categories from '../../components/categories/Categories';
import {categories, genderCategories} from './helper';
import Testimonial from '../../components/testimonial/Testimonial';
import {getDeviceWidth} from '../../utils/constants/commonFunctions';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {
  AUTH_NAVIGATOR,
  HOME_NAVIGATOR,
  HOSTEL_LISTINGS,
  LEADS_SCREEN,
  LOGIN,
  PROFILE_SCREEN,
  SEARCH_SCREEN,
} from '../../navigation/routes';
import HomeScreenSkeleton from '../../components/skeletons/homeScreenSkeleton/HomeScreenSkeleton';
import {getDataFromStorage} from '../../utils/storage';
import {REGISTER_DATA} from '../../utils/constants/constants';
import {setUserInfo} from '../../redux/reducers/userInfoReducer';
import {apiPost} from '../../network/axiosInstance';
import {HOME_URL} from '../../utils/constants/apiEndPoints';
import ListYourPropertyBanner from './ListYourPropertyBanner';
import {styles} from './styles';
import Button from '../../components/button/Button';
import {MyHocExample} from './file';

const HomePage = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {fromLogin = false} = route?.params || {};
  const {data} = useSelector(state => state.loginReducer);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const _navigation = useNavigation();
  const width_dev = getDeviceWidth();
  const [loading, setLoading] = useState(true);
  const isFocus = useIsFocused();
  const [homeData, setHomeData] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      await findToken(); // Wait for findToken to complete
      fetchHomeData(); // Then call fetchHomeData
    };
    initialize();
  }, [isFocus, fetchHomeData, findToken]);

  const findToken = useCallback(async () => {
    if (fromLogin) {
      // If coming from login screen, get data from redux
      setUserData(data);
      dispatch(setUserInfo(data?.data));
    } else {
      const _userData = await getDataFromStorage(REGISTER_DATA);
      let parsedData;
      if (_userData) {
        parsedData = JSON.parse(_userData);
        setUserData(parsedData);
        dispatch(setUserInfo(parsedData));
      }
    }
    // No need for a callback parameter, as the function itself is async
  }, [dispatch, fromLogin, data]);

  const fetchHomeData = useCallback(async () => {
    const response = await apiPost(
      HOME_URL,
      {userId: userData?.userId},
      userData?.token,
    );
    if (response.status) {
      setHomeData(response?.data);
    }
    if (!loading) {
      setRefreshing(false);
    }
    setLoading(false);
  }, [userData, loading]);

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

  const onPressCategory = (name, bedType) => {
    _navigation?.navigate(HOSTEL_LISTINGS, {
      title: name,
      userData: userData,
      _gender: name,
      bedType: bedType,
    });
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

  const listYourProperty = () => {
    _navigation.navigate(LEADS_SCREEN);
  };

  return (
    <View style={styles.container}>
      <Header onPressProfile={onPressProfile} />
      <ScrollView
        contentContainerStyle={styles.scroll}
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
              onPress={name => onPressCategory(name, '')}
            />
            <Categories
              level="Category"
              data={categories}
              onPress={name => onPressCategory('', name)}
            />
            {/* <VibeTribeView /> */}
            <Testimonial
              data={homeData?.testimonialListing}
              handleScroll={handleScroll}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
            <ListYourPropertyBanner onPress={listYourProperty} />
            {/* <MyHocExample isDeveloper={true} /> */}
          </>
        ) : (
          <HomeScreenSkeleton />
        )}
      </ScrollView>
    </View>
  );
};

export default HomePage;
