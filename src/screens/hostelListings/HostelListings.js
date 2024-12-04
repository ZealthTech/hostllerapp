import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import Listings from '../../components/listings/Listings';
import {useDispatch, useSelector} from 'react-redux';
import {listingsDataRequest} from '../../redux/reducers/listingsReducer';

import CustomSvg from '../../components/customSvg/CustomSvg';
import {CrossIcon, Filters, RightTick, SortFilter} from '../../assets';
import {styles} from './styles';
import {listings, sortOptions} from './helper';
import {WHITE} from '../../utils/colors/colors';
import ListingsSkeleton from '../../components/skeletons/homeScreenSkeleton/ListingsSkeleton';
import {LISTINGS_DETAILS} from '../../navigation/routes';
import CustomBottomSheet from '../../components/customBottomSheet/CustomBottomSheet';

const HostelListings = props => {
  const route = useRoute();
  const {title} = route?.params || {};
  const dispatch = useDispatch();
  const {listingData, loading} = useSelector(state => state.listingsReducer);
  const navigation = useNavigation();
  const [sortBy, setSortBy] = useState('Recommended');
  console.log('1144 ', listingData);
  const bottomSheetRef = useRef(null);
  const [sortSheetVisible, setSortSheetVisible] = useState(false);
  let listingsData = [];
  useEffect(() => {
    fetchAllListings();
  }, [fetchAllListings]);
  const fetchAllListings = useCallback(() => {
    const data = {
      searchInput: '',
      gender: title,
      bedType: '', // Single rooms || Sharing rooms || Dormitory Else ""
      checkinDate: '',
    };
    dispatch(listingsDataRequest(data));
  }, [title, dispatch]);
  const isListingAvl = listingData?.finalList?.length > 0;
  const listingLength = listingData?.finalList?.length;

  console.log('listings ', listingsData);
  const onSelectSortOrder = item => {
    setSortBy(item?.label);
  };
  const sortView = () => {
    return (
      <View style={styles.sheetContainer}>
        <View style={styles.sheetHead}>
          <Text style={styles.title}>Sort Order</Text>
          <TouchableOpacity
            style={styles.crossTch}
            onPress={() => {
              bottomSheetRef?.current?.close();
              setSortSheetVisible(false);
            }}>
            <CustomSvg SvgComponent={<CrossIcon fill="white" />} />
          </TouchableOpacity>
        </View>
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
                  {item.label}
                </Text>
              </View>
              {sortBy === item?.label && (
                <CustomSvg SvgComponent={<RightTick />} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const navigateToDetail = (pgId, type, rent, security) => {
    console.log('touched ');
    navigation?.navigate(LISTINGS_DETAILS, {
      pgId: pgId,
      type: type,
      security: security,
      rent: rent,
    });
  };
  return (
    <View style={styles.container}>
      <BackIconHeader title={title} />
      {!loading ? (
        <>
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
            <TouchableOpacity style={styles.tch}>
              <CustomSvg SvgComponent={<Filters />} />
              <Text style={styles.sortText}>Filters</Text>
            </TouchableOpacity>
          </View>
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
      ) : (
        <ListingsSkeleton />
      )}

      <CustomBottomSheet
        ref={bottomSheetRef}
        snapPoints={['70%']}
        children={sortView()}
        handleComponent={null}
      />
    </View>
  );
};

export default HostelListings;
