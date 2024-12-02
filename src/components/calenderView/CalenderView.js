import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {BLACK_COLOR, PURPLE} from '../../utils/colors/colors';
import CustomSvg from '../customSvg/CustomSvg';
import {Calendar} from '../../assets';
import {MONTSERRAT_MEDIUM} from '../../utils/styles/commonStyles';

const CalenderView = props => {
  const {showDatePicker, onChangeDate, value, openCalender, maximumDate} =
    props || {};

  const getDatePicker = () => {
    if (showDatePicker) {
      return (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || new Date()} // Default to today's date if no value is provided
          mode="date"
          display="compact"
          onChange={onChangeDate}
          style={styles.dateTimePicker}
          minimumDate={new Date()}
          accentColor={PURPLE}
          maximumDate={maximumDate}
        />
      );
    }
    return null;
  };

  const formatDate = date => {
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <TouchableOpacity style={styles.calenderView} onPress={openCalender}>
        <CustomSvg SvgComponent={<Calendar height={20} width={20} />} />
        <Text style={styles.date}>
          {value ? formatDate(value) : 'Select Date'}
        </Text>
      </TouchableOpacity>
      {getDatePicker()}
    </>
  );
};

export default CalenderView;

const styles = StyleSheet.create({
  calenderView: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 20,
    borderWidth: 0.5,
    borderColor: BLACK_COLOR,
    marginTop: 25,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  date: {color: BLACK_COLOR, fontFamily: MONTSERRAT_MEDIUM, fontSize: 14},
});
