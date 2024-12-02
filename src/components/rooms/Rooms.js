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

const Rooms = props => {
  const {
    data,
    roomType,
    type,
    foodChart,
    onPress,
    selectedRoom,
    setSelectedRoom,
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

  const handleSelection = (roomType, index, option) => {
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
    } else {
      // Select the new option
      setSelectedRoom({
        roomType,
        index,
        option,
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          const acAvl = item?.ac === 'Yes';
          const showNoFood =
            item?.foodOption === 'optional' || item?.foodOption === 'no food';
          const foodOptional = item?.foodOption === 'optional';
          const showWithFood = foodOptional || item?.foodOption === 'included';

          return (
            <View style={styles.mainView}>
              <View style={styles.imgView}>
                <Image source={{uri: item?.image}} style={styles.img} />
                <View>
                  <Text style={styles.room}>{roomType}</Text>
                  <View style={styles.genderRow}>
                    <CustomSvg SvgComponent={getSvgIcon()} />
                    <Text style={styles.genderText}>{type}</Text>
                  </View>
                  <View style={styles.roomType}>
                    {acAvl && <Text style={styles.ac}>AC</Text>}
                    {acAvl && <CustomSvg SvgComponent={<CheckGreen />} />}
                    <Text style={styles.ac}>
                      Washroom ({item?.bathroomType})
                    </Text>
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
                          {foodOptional
                            ? item?.rent + item?.foodPrice
                            : item?.rent}
                        </Text>
                      </Text>
                      <Text style={styles.perMonth}>With Food</Text>
                      <View style={styles.mealView}>
                        <Text style={styles.meal}>
                          Breakfast, Lunch, Dinner
                        </Text>
                        <CustomSvg
                          SvgComponent={<InfoIcon />}
                          isClickable={true}
                          imgStyle={{marginBottom: 5}}
                          onPress={onPress}
                        />
                      </View>
                      <Text style={styles.perMonth}>
                        Security Deposit{' '}
                        <Text
                          style={[styles.rupee, {fontSize: fontsSize.fs14}]}>
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
                        handleSelection(roomType, index, 'included')
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
                        <Text
                          style={[styles.rupee, {fontSize: fontsSize.fs14}]}>
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
                        handleSelection(roomType, index, 'no food')
                      }>
                      <CustomSvg SvgComponent={<Plus />} />
                      <Text style={styles.add}>Add</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Rooms;
