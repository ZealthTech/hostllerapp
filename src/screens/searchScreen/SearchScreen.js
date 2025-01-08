import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {styles} from './styles';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {BackArrow, Building, CrossIcon} from '../../assets';
import {BLACK_COLOR, COLOR_GRAY_7F, PURPLE} from '../../utils/colors/colors';
import {useSelector} from 'react-redux';
import {apiPost} from '../../network/axiosInstance';
import {SEARCH_PRODUCTS} from '../../utils/constants/apiEndPoints';
import LocationIcon from '../../assets/svg/location_pin.svg';
import {HOSTEL_LISTINGS} from '../../navigation/routes';
const SearchScreen = navigation => {
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);
  const {userInfo} = useSelector(state => state.userInfoReducer);
  const [loading, setLoading] = useState(false);
  const {userId, token} = userInfo || {};

  useEffect(() => {
    searchProducts();
  }, [searchProducts, searchText]);

  const searchProducts = useCallback(async () => {
    setLoading(true);
    const data = {
      userId: userId,
      searchInput: searchText,
    };
    const response = await apiPost(SEARCH_PRODUCTS, data, token);
    console.log('response ', response);
    setSearchList(response?.data);
    setLoading(false);
  }, [searchText, token, userId]);

  console.log('data  ', searchList);
  const handleSearch = text => {
    setSearchText(text);
  };

  const handlePress = item => {
    navigation?.navigation?.navigate(HOSTEL_LISTINGS, {
      searchInput: item,
      title: 'Search Results',
      fromSearch: true,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <CustomSvg
          SvgComponent={<BackArrow fill={BLACK_COLOR} />}
          isClickable={true}
          onPress={() => navigation.navigation?.goBack()}
        />
        <View style={[styles.leftView, styles.searchView]}>
          <View style={styles.innerView}>
            <CustomSvg isClickable={false} SvgComponent={<LocationIcon />} />
            <TextInput
              placeholder="Destination"
              placeholderTextColor={COLOR_GRAY_7F}
              style={styles.input}
              autoFocus={true}
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
          {searchText?.length > 0 && (
            <TouchableOpacity
              style={styles.cancelTch}
              onPress={() => {
                setSearchText('');
                setSearchList([]);
              }}>
              <CustomSvg
                SvgComponent={
                  <CrossIcon fill={BLACK_COLOR} height={12} width={12} />
                }
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {searchList?.length > 0 && <Text style={styles.location}>Location</Text>}
      <FlatList
        data={searchList}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.searchViews}
            onPress={() => handlePress(item?.searchInput)}>
            <CustomSvg SvgComponent={<Building height={20} width={20} />} />
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.locationTxt}>
              {item?.searchInput.trim()}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.flat}
      />
      {loading && (
        <ActivityIndicator
          size={'large'}
          style={{
            marginTop: 70,
          }}
          color={PURPLE}
        />
      )}
    </View>
  );
};

export default SearchScreen;
