import React, {useState} from 'react';
import {View, Text, FlatList, Modal, Pressable} from 'react-native';
import {useRoute} from '@react-navigation/native';
import BackIconHeader from '../../components/backIconHeader/BackIconHeader';
import {styles} from './styles';
import Rooms from '../../components/rooms/Rooms';
import CustomSvg from '../../components/customSvg/CustomSvg';
import {Cancel, CheckGreen} from '../../assets';
import Loader from '../../components/loader/Loader';
import CalenderView from '../../components/calenderView/CalenderView';

const ChooseRoom = () => {
  const route = useRoute();
  const {data, type} = route?.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState({
    roomType: null,
    index: null,
    option: null, // Tracks whether it's "with food" or "without food"
  });

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

  const onChangeDate = (event, date) => {
    setShowCalender(false); // Close the calendar after selecting a date
    if (date) {
      setSelectedDate(date); // Update selected date
    }
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
            setSelectedRoom={setSelectedRoom}
          />
        )}
        ListFooterComponent={<View style={{height: 20}} />} // Add some spacing at the bottom
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={modalVisible} transparent={true}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            {/* Header */}
            <Text style={styles.modalTitle}>MENU SCHEDULE</Text>

            <View style={styles.table}>
              {/* Header Row */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCellUp, {flex: 1.2}]}>Day/Meal</Text>
                <Text style={styles.tableCellUp}>Breakfast</Text>
                <Text style={styles.tableCellUp}>Lunch</Text>
                <Text style={styles.tableCellUp}>Snacks</Text>
                <Text style={styles.tableCellUp}>Dinner</Text>
              </View>
              {data?.mealChart?.map(day => (
                <View style={styles.tableRow} key={day._id}>
                  <View style={styles.tableCell}>
                    <Text style={styles.days}>{day.title}</Text>
                  </View>
                  <View style={styles.iconCell}>
                    <CustomSvg
                      SvgComponent={
                        day?.breakfast === 1 ? <CheckGreen /> : <Cancel />
                      }
                    />
                  </View>
                  <View style={styles.iconCell}>
                    <CustomSvg
                      SvgComponent={
                        day?.lunch === 1 ? <CheckGreen /> : <Cancel />
                      }
                    />
                  </View>
                  <View style={styles.iconCell}>
                    <CustomSvg
                      SvgComponent={
                        day?.snacks === 1 ? <CheckGreen /> : <Cancel />
                      }
                    />
                  </View>
                  <View style={styles.iconCell}>
                    <CustomSvg
                      SvgComponent={
                        day?.dinner === 1 ? <CheckGreen /> : <Cancel />
                      }
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>

      <Loader loading={loading} />
    </View>
  );
};

export default ChooseRoom;
