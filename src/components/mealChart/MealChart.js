import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomSvg from '../customSvg/CustomSvg';
import {Cancel, CheckGreen} from '../../assets';
import {
  BLACK_COLOR,
  GRAY_92,
  ORANGE_DARK,
  WHITE,
  YELLOW_LIGHT,
} from '../../utils/colors/colors';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
  MONTSERRAT_SEMIBOLD,
} from '../../utils/styles/commonStyles';

const MealChart = props => {
  const {modalVisible = false, onPressOutside, data} = props || {};
  return (
    <Modal visible={modalVisible} transparent={true}>
      <Pressable style={styles.modalOverlay} onPress={onPressOutside}>
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
            {data?.map(day => (
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
  );
};

export default MealChart;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '95%',
    backgroundColor: WHITE,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: MONTSERRAT_BOLD,
    color: BLACK_COLOR,
    backgroundColor: YELLOW_LIGHT,
    paddingVertical: 5,
    width: '100%',
    textAlign: 'center',
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',

    backgroundColor: ORANGE_DARK,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1.2,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: GRAY_92,
    borderBottomWidth: 1,
  },
  iconCell: {
    paddingVertical: 8,
    borderRightWidth: 1,
    borderColor: GRAY_92,
    borderBottomWidth: 1,
    flex: 1,
  },
  tableCellUp: {
    flex: 1,
    paddingVertical: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: GRAY_92,
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: 12,
    paddingLeft: 1,
    color: WHITE,
  },
  days: {
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_REGULAR,
    fontSize: 12,
    marginLeft: 5,
    textAlign: 'center',
  },
});
