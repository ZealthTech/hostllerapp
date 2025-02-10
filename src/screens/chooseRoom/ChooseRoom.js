import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {styles} from './styles';
import Rooms from '../../components/rooms/Rooms';
import CalenderView from '../../components/calenderView/CalenderView';
import FooterButton from '../../components/footerButton/FooterButton';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {CART_SCREEN} from '../../navigation/routes';
import MealChart from '../../components/mealChart/MealChart';
import {formatDateInNamedMonth} from '../kycDetails/helper';
import {useDispatch} from 'react-redux';
import {setBookingSummary} from '../../redux/reducers/bookingSummary';

const ChooseRoom = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {data, type} = route?.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedRoomToCart, setSelectedRoomToCart] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({
    roomType: null,
    index: null,
    option: null, // Tracks whether it's "with food" or "without food"
  });
  const dispatch = useDispatch();
  const openBottomSheet = () => {
    setModalVisible(true);
  };

  const roomData = [
    {key: 'single', data: data?.singleBedRoom, roomType: 'Single Room'},
    {key: 'double', data: data?.doubleBedRoom, roomType: 'Twin Sharing Room'},
    {key: 'triple', data: data?.tripleBedRoom, roomType: 'Triple Sharing Room'},
    {key: 'quad', data: data?.quadBedRoom, roomType: 'Four Sharing Room'},
    {key: 'dormitory', data: data?.dormitoryRoom, roomType: 'Dormitory'},
  ].filter(item => item.data);

  const onChangeDate = date => {
    const formattedDate = formatDateInNamedMonth(date);
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const handleCheckout = () => {
    const cartData = {...selectedRoomToCart, address: data?.address};
    dispatch(setBookingSummary(cartData));
    navigation.navigate(CART_SCREEN, {
      mealChart: data?.mealChart,
      pgId: data?.pgId,
    });
  };

  const maximumDate = new Date();
  maximumDate.setMonth(maximumDate.getMonth() + 6);
  const hideDatePicker = () => {
    setShowCalender(false);
  };
  const showCalenderView = () => {
    setShowCalender(true);
  };

  return (
    <View style={styles.container}>
      <BackIconHeader title="Choose Room" />
      <CalenderView
        openCalender={showCalenderView}
        showDatePicker={showCalender}
        value={selectedDate}
        onChangeDate={onChangeDate}
        maximumDate={maximumDate}
        minimumDate={new Date()}
        hideDatePicker={hideDatePicker}
      />

      <FlatList
        data={roomData}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.flatContainer}
        renderItem={({item}) => (
          <Rooms
            data={item.data}
            roomType={item.roomType}
            type={type}
            foodChart={data?.mealChart}
            onPress={openBottomSheet}
            selectedRoom={selectedRoom}
            selectedDate={selectedDate}
            setSelectedRoom={setSelectedRoom}
            setSelectedRoomToCart={setSelectedRoomToCart}
            selectedRoomToCart={selectedRoomToCart}
          />
        )}
        ListFooterComponent={<View style={styles.footerView} />}
        showsVerticalScrollIndicator={false}
      />
      {selectedRoom?.index !== null && (
        <Animated.View entering={FadeInDown.duration(500)}>
          <FooterButton
            onPress={handleCheckout}
            price={
              selectedRoomToCart?.item?.rent +
              selectedRoomToCart?.item?.foodPrice
            }
          />
        </Animated.View>
      )}
      <MealChart
        modalVisible={modalVisible}
        data={data?.mealChart}
        onPressOutside={() => setModalVisible(false)}
      />
    </View>
  );
};

export default ChooseRoom;
