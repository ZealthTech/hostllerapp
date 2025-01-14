import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import Listings from '../../components/listings/Listings';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {Filters, RightTick, SortFilter} from '../../assets';
import {styles} from './styles';
import {gender, listings, roomTypes, sortOptions, stars} from './helper';
import ListingsSkeleton from '../../components/skeletons/homeScreenSkeleton/ListingsSkeleton';
import {LISTINGS_DETAILS} from '../../navigation/routes';
import CustomBottomSheet from '../../components/customBottomSheet/CustomBottomSheet';
import RangeSlider from '../../components/rangeSlider/RangeSlider';
import BottomSheetHeader from '../../components/bottomSheetHeader/BottomSheetHeader';
import CommonSelectionChip from '../../components/commongSelectionChip/CommonSelectionChip';
import Button from '../../components/button/Button';
import Space from '../../components/space/Space';
import {ScrollView} from 'react-native-gesture-handler';
import {apiPost} from '../../network/axiosInstance';
import {LISTINGS_URL} from '../../utils/constants/apiEndPoints';
import {BLACK_COLOR, GRAY_92} from '../../utils/colors/colors';

const HostelListings = props => {
  const route = useRoute();
  const {
    title,
    searchInput = '',
    _gender = '',
    bedType = '',
  } = route?.params || {};
  const [listingData, setListingData] = useState({});
  const navigation = useNavigation();
  const [sortBy, setSortBy] = useState('Recommended');
  const bottomSheetRef = useRef(null);
  const filterRef = useRef();
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(minValue);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedStar, setSelectedStar] = useState(0);
  const [selectedChips, setSelectedChips] = useState([]);
  const [roomType, setRoomType] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataToSend, setDataToSend] = useState(0);
  const [resetFilter, setResetFilter] = useState(false);

  let min;
  let max;

  useEffect(() => {
    fetchAllListings();
  }, [fetchAllListings, resetFilter]);

  const fetchAllListings = useCallback(async () => {
    console.log('48 called after reset filters', selectedGender, title);
    setLoading(true);
    const data = {
      searchInput: searchInput,
      gender: selectedGender === '' ? _gender : selectedGender?.slug,
      bedType: roomType === '' ? bedType : roomType, // Single rooms || Sharing rooms || Dormitory Else ""
      checkinDate: '',
      minPrice: dataToSend,
      maxPrice: maxValue,
      rating: selectedStar,
      facility: selectedChips,
    };
    const response = await apiPost(LISTINGS_URL, data, null);
    console.log('response ', response);
    if (response?.status) {
      setListingData(response?.data);
      setMinValue(response?.data?.minPrice);
      setMaxValue(response?.data?.maxPrice);
      setCurrentValue(response?.data?.minPrice);
      setResetFilter(false);
    }
    setLoading(false);
  }, [
    title,
    roomType,
    selectedStar,
    selectedChips,
    dataToSend,
    searchInput,
    selectedGender,
    _gender,
    bedType,
    maxValue,
  ]);
  const listingLength = listingData?.finalList?.length;

  const onSelectSortOrder = item => {
    setSortBy(item?.label);
  };
  const closeShortBySheet = () => {
    bottomSheetRef?.current?.close();
    setSortSheetVisible(false);
  };

  const sortView = () => {
    return (
      <View style={styles.sheetContainer}>
        <BottomSheetHeader onClose={closeShortBySheet} title={'Sort Order'} />
        {sortOptions?.map((item, index) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              onPress={() => onSelectSortOrder(item)}
              style={styles.iconView(sortBy === item?.label)}
              key={item?.label}>
              <View style={styles.leftView}>
                <Icon width={24} height={24} />
                <Text style={styles.optionText(sortBy === item?.label)}>
                  {item?.label}
                </Text>
              </View>
              {sortBy === item?.label && (
                <CustomSvg SvgComponent={<RightTick fill={BLACK_COLOR} />} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const navigateToDetail = (pgId, type, rent, security) => {
    navigation?.navigate(LISTINGS_DETAILS, {
      pgId: pgId,
      type: type,
      security: security,
      rent: rent,
    });
  };

  const closeFilterSheet = () => {
    filterRef?.current?.close();
  };
  const setNewFilteredPrice = value => {
    setCurrentValue(value);
    setDataToSend(value);
  };
  min = minValue;
  max = maxValue;
  const handleFacilitySelection = item => {
    setSelectedChips(prev =>
      prev.includes(item)
        ? prev.filter(_title => item?.title !== _title?.title)
        : [...prev, item?.title],
    );
  };
  const clearFilters = () => {
    setSelectedChips([]);
    setSelectedStar(0);
    setSelectedGender('');
    setRoomType('');
    setResetFilter(true);
    closeFilterSheet();
  };
  const applyFilter = useCallback(() => {
    fetchAllListings();
    if (!loading) {
      closeFilterSheet();
    }
  }, [fetchAllListings, loading]);

  const filterView = () => {
    return (
      <View style={{flex: 1}}>
        <BottomSheetHeader onClose={closeFilterSheet} title={'Filters'} />
        <ScrollView showsVerticalScrollIndicator={false} style={{flexGrow: 1}}>
          <View style={styles.containerFilter}>
            <RangeSlider
              minPrice={minValue}
              maxPrice={maxValue}
              currentValue={currentValue}
              onValueChange={setNewFilteredPrice}
              min={min}
              max={max}
            />
            <Text style={styles.gender}>Gender </Text>
            <CommonSelectionChip
              data={gender}
              onPress={item => setSelectedGender(item)}
              selectedCategory={selectedGender?.title}
            />
            <Text style={styles.gender}>Rating </Text>
            <CommonSelectionChip
              data={stars}
              onPress={item => setSelectedStar(item?.title)}
              selectedCategory={selectedStar}
              stars={true}
            />
            <Text style={styles.gender}>Rooms </Text>
            <CommonSelectionChip
              data={roomTypes}
              onPress={item => setRoomType(item?.title)}
              selectedCategory={roomType}
            />
            <Text style={styles.gender}>Facilities </Text>
            <CommonSelectionChip
              data={listingData?.facilities}
              onPress={handleFacilitySelection}
              selectedCategory={selectedChips}
            />
            <Space height={20} />
          </View>
        </ScrollView>
        <View style={styles.buttonView}>
          <Button
            title="Clear All"
            containerStyle={styles.btn1}
            textStyle={styles.txt}
            onPress={clearFilters}
          />
          <Button
            title="Apply"
            onPress={applyFilter}
            containerStyle={styles.btn2}
            textStyle={styles.txt2}
          />
        </View>
      </View>
    );
  };
  const openFilterSheet = () => {
    filterRef?.current?.expand();
  };
  const showPropertyList = !loading && listingData?.finalList?.length > 0;
  return (
    <View style={styles.container}>
      <BackIconHeader title={title} />
      <View style={styles.filters}>
        <Pressable
          style={styles.tch}
          onPress={() => {
            if (sortSheetVisible) {
              bottomSheetRef?.current?.close();
              setSortSheetVisible(false);
            } else {
              bottomSheetRef?.current?.expand();
              setSortSheetVisible(true);
            }
          }}>
          <CustomSvg SvgComponent={<SortFilter />} />
          <Text style={styles.sortText}>Sort</Text>
        </Pressable>
        <TouchableOpacity style={styles.tch} onPress={() => openFilterSheet()}>
          <CustomSvg SvgComponent={<Filters />} />
          <Text style={styles.sortText}>Filters</Text>
        </TouchableOpacity>
      </View>
      {!loading && listingData?.finalList?.length === 0 && (
        <Text style={styles.emptyTxt}>No Property Found</Text>
      )}
      {showPropertyList && (
        <>
          <Text style={styles.lengthTxt}>
            Showing{' '}
            {listingLength > 1
              ? `${listingLength} properties`
              : `${listingLength} property`}
          </Text>
          <Listings
            data={listings(listingData?.finalList, sortBy)}
            navigation={navigation}
            onPressCard={navigateToDetail}
          />
        </>
      )}
      {loading && <ListingsSkeleton />}

      <CustomBottomSheet
        ref={bottomSheetRef}
        snapPoints={['70%']}
        children={sortView()}
        handleComponent={null}
      />
      <CustomBottomSheet
        ref={filterRef}
        handleComponent={null}
        children={filterView()}
        snapPoints={['60%']}
      />
    </View>
  );
};

export default HostelListings;
