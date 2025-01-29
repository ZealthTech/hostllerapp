import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import CustomSvg from '../customSvg/CustomSvg';
import {DownArrow} from '../../assets';
import Button from '../button/Button';

const DropDownInput = props => {
  const {
    data,
    onPressIcon,
    isErrorMsgRequired,
    error,
    value = '',
    handleCitySelect,
    setModalVisible,
    modalVisible,
    placeholder,
    state = false,
    disabled = false,
  } = props || {};
  const isValue = value !== '';
  console.log('disabled ', disabled);
  return (
    <>
      <Pressable
        style={[styles.container, disabled && styles.disabled]}
        disabled={disabled}
        onPress={onPressIcon}>
        <Text style={styles.city(isValue)}>
          {!isValue ? placeholder : value}
        </Text>
        <CustomSvg SvgComponent={<DownArrow />} />
      </Pressable>
      {isErrorMsgRequired && <Text style={styles.error}>{error}</Text>}
      {modalVisible && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={setModalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.cityItem}
                    onPress={() => handleCitySelect(item)}>
                    <Text style={styles.cityName}>
                      {state ? item?.state_title : item?.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <Button
                title="Close"
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default DropDownInput;
