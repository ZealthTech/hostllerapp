import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Modal, Pressable} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {styles} from './styles';
import Rooms from '../../components/rooms/Rooms';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {Cancel, CheckGreen} from '../../assets';
import Loader from '../../components/loader/Loader';
import CalenderView from '../../components/calenderView/CalenderView';
import FooterButton from '../../components/footerButton/FooterButton';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {getDataFromStorage} from '../../utils/storage';
import {REGISTER_DATA} from '../../utils/constants/constants';
import {CART_SCREEN, CHOOSE_ROOM, LOGIN} from '../../navigation/routes';
import {formatedDateDMY} from '../../utils/constants/commonFunctions';
import MealChart from '../../components/mealChart/MealChart';

const ChooseRoom = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {data, type, fromLogin} = route?.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [checkinDate, setCheckinDate] = useState('');
  const [selectedRoomToCart, setSelectedRoomToCart] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({
    roomType: null,
    index: null,
    option: null, // Tracks whether it's "with food" or "without food"
  });

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  console.log('data ', data);
  console.log('selectedRoomToCart ', selectedRoomToCart);
  const roomData = [
    {key: 'single', data: data?.singleBedRoom, roomType: 'Single Room'},
    {key: 'double', data: data?.doubleBedRoom, roomType: 'Twin Sharing Room'},
    {key: 'triple', data: data?.tripleBedRoom, roomType: 'Triple Sharing Room'},
    {key: 'quad', data: data?.quadBedRoom, roomType: 'Four Sharing Room'},
    {key: 'dormitory', data: data?.dormitoryRoom, roomType: 'Dormitory'},
  ].filter(item => item.data);

  const onChangeDate = (event, date) => {
    setShowCalender(false); // Close the calendar after selecting a date
    if (date) {
      setSelectedDate(date); // Update selected date
    }
  };

  const handleCheckout = () => {
    // setSelectedRoomToCart({
    //   ...selectedRoomToCart,
    //   ,
    // });
    navigation.navigate(CART_SCREEN, {
      cartData: {...selectedRoomToCart, address: data?.address},
      mealChart: data?.mealChart,
      pgId: data?.pgId,
    });
    // setLoading(true);
    // if (userData == null) {
    //   navigation?.navigate(LOGIN, {
    //     userData: userData,
    //     targetRoute: CHOOSE_ROOM,
    //   });
    // } else {
    //   //navigation?.navigate(CART_SCREEN);
    //   addRoomToCart(userData);
    // }
    // setLoading(false);
  };

  return (
    <View style={styles.container}>
      <BackIconHeader title="Choose Room" />
      <CalenderView
        openCalender={() => setShowCalender(true)}
        showDatePicker={showCalender}
        value={selectedDate}
        onChangeDate={onChangeDate}
      />
      <FlatList
        data={roomData}
        keyExtractor={item => item.key}
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
        ListFooterComponent={<View style={{height: 20}} />}
        showsVerticalScrollIndicator={false}
      />
      {selectedRoom?.index !== null && (
        <Animated.View
          entering={FadeInDown.duration(300)} // Adjust duration for smoothness
        >
          <FooterButton
            onPress={handleCheckout}
            price={
              selectedRoomToCart?.item?.rent +
              selectedRoomToCart?.item?.foodPrice +
              selectedRoomToCart?.item?.security
            }
          />
        </Animated.View>
      )}
      <MealChart
        modalVisible={modalVisible}
        data={data?.mealChart}
        onPressOutside={() => setModalVisible(false)}
      />
      <Loader loading={loading} />
    </View>
  );
};

export default ChooseRoom;
