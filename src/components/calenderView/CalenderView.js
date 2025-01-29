import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {BLACK_COLOR, PURPLE, WHITE} from '../../utils/colors/colors';
import CustomSvg from '../customSvg/CustomSvg';
import {Calendar} from '../../assets';
import {MONTSERRAT_MEDIUM} from '../../utils/styles/commonStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CalenderView = props => {
  const {
    showDatePicker,
    onChangeDate,
    value,
    openCalender,
    maximumDate,
    hideDatePicker,
    minimumDate,
  } = props || {};

  return (
    <>
      <TouchableOpacity style={styles.calenderView} onPress={openCalender}>
        <CustomSvg SvgComponent={<Calendar height={20} width={20} />} />
        <Text style={styles.date}>{value || 'Select Date'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={onChangeDate}
        onCancel={hideDatePicker}
        buttonTextColorIOS={PURPLE}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
      />
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
    backgroundColor: WHITE,
  },
  date: {color: BLACK_COLOR, fontFamily: MONTSERRAT_MEDIUM, fontSize: 14},
});
