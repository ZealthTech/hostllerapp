import {View, Text, Pressable} from 'react-native';
import React, {Suspense, useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {listingDetailsRequest} from '../../redux/reducers/listingDetails';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {styles} from './styles';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CrossArrows,
  CrossIcon,
  MulticolorStar,
} from '../../assets';
import AmenitiesAndRules from '../../components/amenitiesAndRules/AmenitiesAndRules';
import {WHITE} from '../../utils/colors/colors';
import AddressDetails from '../../components/addressDetails/AddressDetails';
import {stripHTMLTags} from '../../utils/constants/commonFunctions';
import Reviews from './reviews/Reviews';
import UserReviews from './userReviews/UserReviews';
import {CHOOSE_ROOM} from '../../navigation/routes';
import {ScrollView} from 'react-native-gesture-handler';
import WriteReviewView from './writeReview/WriteReviewView';
import Loader from '../../components/loader/Loader';
import FastImage from 'react-native-fast-image';
import SelectionChip from '../../components/selectionChip/SelectionChip';
import {imageTypeData} from './helper';
const CustomBottomSheet = React.lazy(() =>
  import('../../components/customBottomSheet/CustomBottomSheet'),
);

const ListingDetails = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {pgId, type, rent, security} = route?.params || {};
  const {details, loading} = useSelector(state => state.listingDetails);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const bottomSheetRef = useRef(null);
  const reviewSheetRef = useRef(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [locationRate, setLocationRate] = useState(0);
  const [foodRate, setFoodRate] = useState(0);
  const [cleanRate, setCleanRate] = useState(0);
  const [staffRate, setStaffRate] = useState(0);
  const [amenitiesRate, setAmenitiesRate] = useState(0);
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);
  const [reviewsPosition, setReviewsPosition] = useState(0);
  useEffect(() => {
    dispatch(listingDetailsRequest({pgId: pgId}));
  }, [pgId, dispatch]);

  useEffect(() => {
    setImages(details?.image);
  }, [details]);

  const getSvgIcon = () => {
    if (type === 'Girls') {
      return <ArrowDownCircle />;
    } else if (type === 'Boys') {
      return <ArrowUpCircle />;
    } else if (type === 'neutral') {
      return <CrossArrows />;
    }
  };

  const amenities = details?.allServices?.filter(
    item => item?.type === 'amenities',
  );
  const houseRules = details?.allServices?.filter(
    item => item?.type === 'houseRules',
  );
  const foodAndKitchen = details?.allServices?.filter(
    item => item?.type === 'foodAndKitchen',
  );

  const renderImages = _type => {
    setSelectedCategory(_type);
    if (_type === 'Exterior') {
      setImages(details?.exteriorImage);
    } else if (_type === 'Interior') {
      setImages(details?.interiorImage);
    } else if (_type === 'Washroom') {
      setImages(details?.bathroomLength);
    } else {
      setImages(details?.image);
    }
  };
  const showAllImages = () => {
    bottomSheetRef.current?.expand(); // Open the bottom sheet
  };

  const openWriteReview = () => {
    reviewSheetRef.current?.expand(); // Open the bottom sheet
  };
  const allPhotosView = () => {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.photos}>All Photos</Text>
          <CustomSvg
            SvgComponent={<CrossIcon fill="black" />}
            isClickable={true}
            onPress={() => bottomSheetRef?.current?.close()}
          />
        </View>
        <View style={styles.line} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {images?.map((item, index) => (
            <FastImage
              source={{uri: item}}
              style={styles.sheetImg}
              key={item}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const handleStarPress = (rating, setRating, selectedRating) => {
    if (selectedRating < rating) {
      setRating(rating);
    } else {
      setRating(rating - 1);
    }
  };

  const handleScroll = e => {
    const scrollPosition = e.nativeEvent.contentOffset.y + 200; // current scroll position
    const reviewTopPosition = reviewsPosition; // The top position of the review view relative to the screen
    if (scrollPosition >= reviewTopPosition) {
      setIsReviewsVisible(true); // Trigger animation when reviews come into view
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: WHITE}}>
      <BackIconHeader title={details?.address} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.flat, {paddingEnd: 20}]}>
          {images?.map((item, index) => {
            return (
              <Pressable
                style={styles.imageView}
                onPress={showAllImages}
                key={item}>
                <FastImage
                  source={{uri: item}}
                  style={styles.imgMain(index, images.length)}
                />
              </Pressable>
            );
          })}
        </ScrollView>
        <SelectionChip
          data={imageTypeData}
          selectedCategory={selectedCategory}
          renderImages={item => {
            setSelectedCategory(item);
            renderImages(item);
          }}
        />
        <View style={styles.contentView}>
          <View style={styles.titleView}>
            <Text style={styles.pgTitle}>{details?.name}</Text>
            {details?.rating > 0 && (
              <View>
                <View style={styles.ratingCountView(details?.rating)}>
                  <CustomSvg SvgComponent={<MulticolorStar fill={WHITE} />} />
                  <Text style={[styles.pgTitle, {marginTop: 2, color: WHITE}]}>
                    {details?.rating}
                  </Text>
                </View>
                <Text style={styles.reviewCount}>
                  {details?.review} reviews
                </Text>
              </View>
            )}
          </View>
          <View style={styles.genderRow}>
            <CustomSvg SvgComponent={getSvgIcon()} />
            <Text style={styles.genderText}>{type}</Text>
          </View>
          <AddressDetails data={details} />
          <View style={styles.pgDetails}>
            <Text style={styles.about}>About Us</Text>
            <Text style={styles.description}>
              {stripHTMLTags(details?.description)}
            </Text>
          </View>
          <AmenitiesAndRules data={amenities} title="Amenities" />
          <AmenitiesAndRules data={houseRules} title="House Rule" />
          <AmenitiesAndRules data={foodAndKitchen} title="House Rule" />
          {details?.rating > 0 && (
            <Reviews
              isVisible={isReviewsVisible}
              data={details?.pgReview}
              rating={details?.rating}
              review={details?.review}
              onPressWriteReview={openWriteReview}
              onLayout={event => {
                const {y} = event.nativeEvent.layout;
                setReviewsPosition(y);
              }}
            />
          )}
          {details?.userReviews?.length > 0 && (
            <UserReviews reviews={details?.userReviews} />
          )}
        </View>
      </ScrollView>
      <View style={styles.footerView}>
        <View style={styles.priceView}>
          <Text style={styles.startFrom}>Start From</Text>
          <Text style={styles.rupee}>
            ₹<Text style={styles.price}>{rent}</Text>
          </Text>
          <Text style={styles.perMonth}>Per Month</Text>
          <Text style={styles.deposit}>Security Deposit ₹{security}</Text>
        </View>
        <Pressable
          style={styles.pressableView}
          onPress={() =>
            navigation?.navigate(CHOOSE_ROOM, {data: details, type: type})
          }>
          <Text style={styles.choose}>Choose Room</Text>
        </Pressable>
      </View>
      <Suspense fallback={null}>
        <CustomBottomSheet
          ref={bottomSheetRef}
          snapPoints={['90%']}
          handleComponent={null}
          scrollable={true}>
          {allPhotosView()}
        </CustomBottomSheet>
        <CustomBottomSheet
          ref={reviewSheetRef}
          snapPoints={['100%']}
          handleComponent={null}>
          <WriteReviewView
            reviewSheetRef={reviewSheetRef}
            scrollable={true}
            handleStarPress={(index, _setReviewsPosition, _reviewsPosition) =>
              handleStarPress(index, _setReviewsPosition, _reviewsPosition)
            }
            setSelectedRating={setSelectedRating}
            setFoodRate={setFoodRate}
            setLocationRate={setLocationRate}
            setAmenitiesRate={setAmenitiesRate}
            setStaffRate={setStaffRate}
            setCleanRate={setCleanRate}
            selectedRating={selectedRating}
            locationRate={locationRate}
            foodRate={foodRate}
            cleanRate={cleanRate}
            pgId={details?.pgId}
            staffRate={staffRate}
            amenitiesRate={amenitiesRate}
          />
        </CustomBottomSheet>
      </Suspense>

      <Loader loading={loading} />
    </View>
  );
};

export default ListingDetails;
