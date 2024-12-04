import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import CustomSvg from '../customSvg/CustomSvg';
import {ArrowDownCircle, ArrowUpCircle, CrossArrows, Star} from '../../assets/';
import {LISTINGS_DETAILS} from '../../navigation/routes';

const Listings = props => {
  const {data, onPressCard} = props || {};
  const getSvgIcon = type => {
    if (type === 'Girls') {
      return <ArrowDownCircle />;
    } else if (type === 'Boys') {
      return <ArrowUpCircle />;
    } else if (type === 'neutral') {
      return <CrossArrows />;
    }
  };

  return (
    <FlatList
      data={data}
      style={{marginBottom: 20}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        console.log('amenities ', item?.allServices);
        const amenities = item?.allServices?.slice(0, 8);
        console.log('amenites ', amenities);
        return (
          <Pressable
            style={styles.tchContainer}
            onPress={() =>
              onPressCard(item?.pgId, item?.type, item?.rent, item?.security)
            }>
            <Image source={{uri: item?.image}} style={styles.imageBnr} />
            <Text style={styles.pgName}>{item?.name}</Text>
            <View style={styles.ratingView}>
              <CustomSvg SvgComponent={<Star />} />
              <Text style={styles.rating}>{item?.rating}</Text>
              <Text style={styles.totalRatings}>({item?.totalRating})</Text>
            </View>
            <View style={styles.genderRow}>
              <CustomSvg SvgComponent={getSvgIcon(item?.type)} />
              <Text style={styles.genderText}>{item?.type}</Text>
            </View>
            <View style={styles.amenitiesView}>
              {amenities.map(_item => (
                <View key={_item?.title}>
                  <Image
                    source={{uri: _item?.image}}
                    style={styles.amenitiesImg}
                  />
                </View>
              ))}
            </View>
            <View style={styles.priceView}>
              <View>
                <Text style={styles.start}>Start From</Text>
                <Text style={styles.rupee}>
                  ₹<Text style={styles.price}>{item?.rent}</Text>
                </Text>
                <Text styles={styles.start}>Per Month</Text>
              </View>
              <View>
                <View style={styles.line} />
              </View>
              <View>
                <Text style={styles.start}>Security Deposit</Text>
                <Text style={styles.deposPrice}>₹ {item?.security}</Text>
              </View>
            </View>
          </Pressable>
        );
      }}
    />
  );
};

export default Listings;
