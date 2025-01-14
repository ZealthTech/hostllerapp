import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import CustomSvg from '../customSvg/CustomSvg';
import {DownArrow, RightTick} from '../../assets';
import {BLACK_COLOR, GRAY_92, WHITE} from '../../utils/colors/colors';
import {MONTSERRAT_REGULAR} from '../../utils/styles/commonStyles';

const DropDownForSmallData = props => {
  const {
    data,
    selectedValue,
    onPressIcon,
    dropDownVisible,
    selectOccupation,
    label,
    dropdownButtonStyle,
    labelStyle,
    dropDownStyle,
    labelText,
  } = props || {};

  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TouchableOpacity
        style={[styles.dropdownButton, dropdownButtonStyle]}
        onPress={onPressIcon}
        activeOpacity={0.8}>
        <Text style={styles.dropdownButtonText}>
          {selectedValue || labelText}
        </Text>
        <CustomSvg
          SvgComponent={<DownArrow height={14} width={14} />}
          imgStyle={dropDownVisible && styles.rotateImage}
        />
      </TouchableOpacity>
      {dropDownVisible && (
        <View style={[styles.itemsView, dropDownStyle]}>
          {data.map(item => {
            return (
              <Pressable
                key={item.name}
                style={styles.dropdownItem}
                onPress={() => {
                  selectOccupation(item.name); // Pass selected value
                  onPressIcon(); // Close dropdown
                }}>
                <Text style={styles.name}>{item.name}</Text>
                {selectedValue === item.name && (
                  <CustomSvg
                    SvgComponent={
                      <RightTick height={15} width={15} fill={GRAY_92} />
                    }
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};
export default DropDownForSmallData;
const styles = StyleSheet.create({
  itemsView: {
    position: 'absolute',
    top: '100%', // Position below the dropdown button
    left: 0,
    right: 0,
    borderRadius: 10,
    borderWidth: 0.6,
    marginHorizontal: 20,
    marginTop: 10,
    borderColor: GRAY_92,
    backgroundColor: WHITE,
    zIndex: 100, // Ensure it's above other elements
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  label: {
    fontSize: 15,
    color: BLACK_COLOR,
    marginBottom: 8,
    fontFamily: MONTSERRAT_REGULAR,
    marginTop: 20,
    marginStart: 20,
  },
  name: {fontSize: 14, fontFamily: MONTSERRAT_REGULAR, color: BLACK_COLOR},
  dropdownButton: {
    padding: 12,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: GRAY_92,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: BLACK_COLOR,
    fontFamily: MONTSERRAT_REGULAR,
  },
  rotateImage: {transform: [{rotate: '180deg'}]},
  dropdownItem: {
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
