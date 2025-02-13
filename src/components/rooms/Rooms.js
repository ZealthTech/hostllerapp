import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CheckGreen,
  CrossArrows,
  InfoIcon,
  Plus,
} from '../../assets';
import CustomSvg from '../customSvg/CustomSvg';
import {fontsSize} from '../../utils/styles/commonStyles';
import {showToast} from '../../utils/constants/commonFunctions';
import {ERROR_TOAST} from '../../utils/constants/constants';

const Rooms = props => {
  const {
    data,
    roomType,
    type,
    onPress,
    selectedRoom,
    setSelectedRoom,
    selectedDate,
    setSelectedRoomToCart,
  } = props || {};

  const getSvgIcon = () => {
    if (type === 'Girls') {
      return <ArrowDownCircle />;
    } else if (type === 'Boys') {
      return <ArrowUpCircle />;
    } else if (type === 'neutral') {
      return <CrossArrows />;
    }
  };

  //only one room can be selected at a time, if user select other previous should be deselected
  const handleSelection = (roomType, index, option, item) => {
    console.log(
      'roomType, index, option, item ',
      roomType,
      index,
      option,
      item,
    );
    if (selectedDate !== '') {
      if (
        selectedRoom?.roomType === roomType &&
        selectedRoom?.index === index &&
        selectedRoom?.option === option
      ) {
        // Deselect if already selected
        setSelectedRoom({
          roomType: null,
          index: null,
          option: null,
        });
        // Optionally reset selectedRoomToCart
        setSelectedRoomToCart(null);
      } else {
        // Select the new option
        setSelectedRoom({
          roomType,
          index,
          option,
        });
        setSelectedRoomToCart({
          item,
          checkinDate: selectedDate,
          roomType,
          option,
        });
      }
    } else {
      showToast(ERROR_TOAST, 'Please select a Checkin date', true);
    }
  };

  const renderItem = ({item, index}) => {
    const acAvl = item?.ac === 'Yes';

    //check if to show no food based on below conditions
    const showNoFood =
      item?.foodOption === 'optional' || item?.foodOption === 'no food';

    //check if food is optional
    const foodOptional = item?.foodOption === 'optional';

    //check if food is included
    const showWithFood = foodOptional || item?.foodOption === 'included';

    return (
      <View style={styles.mainView}>
        <View style={styles.imgView}>
          <Image source={{uri: item?.image}} style={styles.img} />
          <View style={styles.titleView}>
            <Text style={styles.room}>{roomType}</Text>
            <View style={styles.genderRow}>
              <CustomSvg SvgComponent={getSvgIcon()} />
              <Text style={styles.genderText}>{type}</Text>
            </View>
            <View style={styles.roomType}>
              {acAvl && <Text style={styles.ac}>AC</Text>}
              {acAvl && <CustomSvg SvgComponent={<CheckGreen />} />}
              <Text style={styles.ac}>Washroom ({item?.bathroomType})</Text>
            </View>
          </View>
        </View>
        <View>
          {showWithFood && (
            <View style={styles.priceView}>
              <View>
                <Text style={styles.perMonth}>Per Month</Text>
                <Text style={styles.rupee}>
                  ₹{' '}
                  <Text style={styles.price}>
                    {foodOptional ? item?.rent + item?.foodPrice : item?.rent}
                  </Text>
                </Text>
                <Text style={styles.perMonth}>With Food</Text>
                <View style={styles.mealView}>
                  <Text style={styles.meal}>Breakfast, Lunch, Dinner</Text>
                  <CustomSvg
                    SvgComponent={<InfoIcon />}
                    isClickable={true}
                    imgStyle={{marginBottom: 5}}
                    onPress={onPress}
                  />
                </View>
                <Text style={styles.perMonth}>
                  Security Deposit{' '}
                  <Text style={[styles.rupee, {fontSize: fontsSize.fs14}]}>
                    ₹<Text style={styles.price}> {item?.security}</Text>
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btn(
                  selectedRoom?.roomType === roomType &&
                    selectedRoom?.index === index &&
                    selectedRoom?.option === 'included',
                )}
                disabled={
                  selectedRoom?.roomType === roomType &&
                  selectedRoom?.index === index &&
                  selectedRoom?.option !== 'included'
                }
                onPress={() =>
                  handleSelection(roomType, index, 'included', item)
                }>
                <CustomSvg SvgComponent={<Plus />} />
                <Text style={styles.add}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
          {showNoFood && (
            <View style={styles.priceView}>
              <View>
                <Text style={styles.perMonth}>Per Month</Text>
                <Text style={styles.rupee}>
                  ₹ <Text style={styles.price}>{item?.rent}</Text>
                </Text>
                <Text style={styles.perMonth}>Without Food</Text>

                <Text style={styles.perMonth}>
                  Security Deposit{' '}
                  <Text style={[styles.rupee, {fontSize: fontsSize.fs14}]}>
                    ₹<Text style={styles.price}>{item?.security}</Text>
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btn(
                  selectedRoom?.roomType === roomType &&
                    selectedRoom?.index === index &&
                    selectedRoom?.option === 'no food',
                )}
                disabled={
                  selectedRoom?.roomType === roomType &&
                  selectedRoom?.index === index &&
                  selectedRoom?.option !== 'no food'
                }
                onPress={() =>
                  handleSelection(roomType, index, 'no food', item)
                }>
                <CustomSvg SvgComponent={<Plus />} />
                <Text style={styles.add}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(_, index) => `id${index}`.toString()}
      />
    </View>
  );
};

export default Rooms;
